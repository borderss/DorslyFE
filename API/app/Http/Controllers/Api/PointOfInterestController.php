<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PointOfInterestRequest;
use App\Http\Resources\CommentResourse;
use App\Http\Resources\PointOfInterestResouce;
use App\Http\Resources\ProductResourse;
use App\Http\Resources\RatingResourse;
use App\Models\Comment;
use App\Models\PointOfInterest;
use App\Models\Product;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use mysql_xdevapi\Collection;

class PointOfInterestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        if ($request->page) {
            $points_of_interest = PointOfInterest::filter($request->all())->paginate(10);
        } else {
            $points_of_interest = PointOfInterest::filter($request->all())->get();
        }

        return PointOfInterestResouce::collection($points_of_interest);
    }

    public function getTodaysSelection()
    {
        $pointsOfInterest = PointOfInterest::inRandomOrder()->limit(8)->get()
            ->map(function ($point) {
                $pointAverageRatings = Rating::where('point_of_interest_id', $point->id)->get();
                $point['avgRating'] = $pointAverageRatings->pluck('rating')->avg();
                return $point;
            });
        return PointOfInterestResouce::collection($pointsOfInterest);
    }

    public function getPopularSelection()
    {
        $pointsOfInterests = PointOfInterest::all()
            ->map(function ($point) {
                $pointAverageRatings = Rating::where('point_of_interest_id', $point->id)->get();
                $point['avgRating'] = $pointAverageRatings->pluck('rating')->avg();
                return $point;
            })
            ->sortByDesc('avgRating')
            ->take(8);
        return PointOfInterestResouce::collection($pointsOfInterests);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return PointOfInterestResouce
     */
    public function store(PointOfInterestRequest $request)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $validated = $request->validated();
        $image = $validated['images'];
        $validated['images'] = $image->hashName();
        $image->store('public/point_of_interest_photo/');

        return new PointOfInterestResouce(PointOfInterest::create($validated));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return PointOfInterestResouce
     */
    public function show($id)
    {
        $point = PointOfInterest::find($id);

        $pointAverageRatings = Rating::where('point_of_interest_id', $point->id)->get();
        $point['avgRating'] = $pointAverageRatings->pluck('rating')->avg();

        return new PointOfInterestResouce($point);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return PointOfInterestResouce
     */
    public function update(PointOfInterestRequest $request, $id)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $Point = PointOfInterest::find($id);
        $validated = $request->validated();
        if($request->hasFile('images')){
            $Point->images= Storage::disk('local')->delete('public/point_of_interest_photo/'.$Point->images);
            $image = $validated['images'];
            $validated['images'] = $image->hashName();
            $image->store('public/point_of_interest_photo/');
        }

        $Point->update($validated);
        return new PointOfInterestResouce($Point);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return PointOfInterestResouce
     */
    public function destroy($id)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $Point = PointOfInterest::find($id);
        $Point->images= Storage::disk('local')->delete('public/point_of_interest_photo/'.$Point->images);
        $Point->delete();
        return new PointOfInterestResouce($Point);
    }

    public function getFile(Request $request, $pointPhoto){
        if(!$request->hasValidSignature()) return abort(401);
        $pointPhoto = PointOfInterest::find($pointPhoto);
        $pointPhoto->images= Storage::disk('local')->path('public/point_of_interest_photo/'.$pointPhoto->images);
        return response()->file($pointPhoto->images);
    }

    public function filter(Request $request)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = PointOfInterest::where('id', 'LIKE', "%{$validated['value']}%")
                ->orWhere('name', 'LIKE', "%{$validated['value']}%")
                ->orWhere('description', 'LIKE', "%{$validated['value']}%")
                ->orWhere('gps_lng', 'LIKE', "%{$validated['value']}%")
                ->orWhere('gps_lat', 'LIKE', "%{$validated['value']}%")
                ->orWhere('country', 'LIKE', "%{$validated['value']}%")
                ->orWhere('opens_at', 'LIKE', "%{$validated['value']}%")
                ->orWhere('closes_at', 'LIKE', "%{$validated['value']}%")
                ->orWhere('is_open_round_the_clock', 'LIKE', "%{$validated['value']}%")
                ->orWhere('is_takeaway', 'LIKE', "%{$validated['value']}%")
                ->orWhere('is_on_location', 'LIKE', "%{$validated['value']}%")
                ->orWhere('available_seats', 'LIKE', "%{$validated['value']}%")
                ->orWhere('review_count', 'LIKE', "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        }  else {
            $users = PointOfInterest::where($validated['by'], 'LIKE', "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return PointOfInterestResouce::collection($users);
    }

    public function getComments($id) {
        $comments = Comment::where('point_of_interest_id', $id)->orderBy('created_at', 'desc');

        return CommentResourse::collection($comments->get());
    }

    public function getProducts($id) {
        $comments = Product::where('point_of_interest_id', $id);

        return ProductResourse::collection($comments->get());
    }
}
