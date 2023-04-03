<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RatingRequest;
use App\Http\Resources\RatingResourse;
use App\Http\Resources\UserRatingResource;
use App\Models\Deal;
use App\Models\PointOfInterest;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function getUserRatings(){
        $ratings = Rating::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();
        return UserRatingResource::collection($ratings);
    }

    public function getUsersPointOfInterestRating($id){
        if (!PointOfInterest::find($id)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Point of interest does not exist.'
            ], 404);
        }

        if (Rating::where('user_id', auth()->user()->id)->where('point_of_interest_id', $id)->doesntExist()) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has not rated this point of interest.'
            ], 404);
        }

        $rating = Rating::where('user_id', auth()->user()->id)->where('point_of_interest_id', $id)->first();
        return response()->json([
            'status' => 'success',
            'rating' => $rating->rating,
            'message' => 'Rating fetched successfully!'
        ], 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return RatingResourse::collection(Rating::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return RatingResourse
     */
    public function store(RatingRequest $request)
    {
        $validated = $request->validated();
        $user_id = auth()->user()->id;
        $validated['user_id'] = $user_id;


        if (!PointOfInterest::find($validated['point_of_interest_id'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Point of interest does not exist.'
            ], 404);
        }

        if ($validated['rating'] > 10 || $validated['rating'] < 1) {
            return response()->json([
                'status' => 'error',
                'message' => 'Rating must be between 1 and 10.'
            ], 404);
        }

        if (!Deal::where('user_id', $user_id)->where('point_of_interest_id', $validated['point_of_interest_id'])->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You must have either an active or past deal with this point of interest to rate it.'
            ], 404);
        }


        if (Rating::where('user_id', $user_id)->where('point_of_interest_id', $validated['point_of_interest_id'])->exists()) {
            Rating::where('user_id', $user_id)
                ->where('point_of_interest_id', $validated['point_of_interest_id'])
                ->update(['rating' => $validated['rating']]);

            return response()->json([
                'status' => 'success',
                'rating' => Rating::where('user_id', $user_id)
                    ->where('point_of_interest_id', $validated['point_of_interest_id'])->first()->rating,
                'message' => 'Rating updated successfully!'
            ], 200);
        } else {
            Rating::create($validated);

            return response()->json([
                'status' => 'success',
                'rating' => Rating::where('user_id', $user_id)
                    ->where('point_of_interest_id', $validated['point_of_interest_id'])->first()->rating,
                'message' => 'Rating created successfully!'
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return RatingResourse
     */
    public function show($id)
    {
        return new RatingResourse(Rating::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return RatingResourse
     */
    public function update(RatingRequest $request, $id)
    {
        if (auth()->user()->is_admin === false || Rating::find($id)->user_id === auth()->user()->id) {
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        Rating::find($id)->update($request->validated());

        return new RatingResourse(Rating::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return RatingResourse
     */
    public function destroy($id)
    {
        if (auth()->user()->is_admin === false || Rating::find($id)->user_id === auth()->user()->id) {
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $rating = Rating::find($id);
        $rating->delete();
        return new RatingResourse($rating);
    }
}
