<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PointOfInterestRequest;
use App\Http\Resources\PointOfInterestResouce;
use App\Models\PointOfInterest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PointOfInterestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return PointOfInterestResouce::collection(PointOfInterest::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return PointOfInterestResouce
     */
    public function store(PointOfInterestRequest $request)
    {

        $validated = $request->validated();
        $image = $validated['images'];
        $validated['images'] = $image->hashName();
        $image->store('public/PointOfInterestPhoto/');

        return new PointOfInterestResouce(PointOfInterest::create($validated));
//        $Point = PointOfInterest::create($request->validated());
//
//        return new PointOfInterestResouce($Point);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return PointOfInterestResouce
     */
    public function show($id)
    {
//        $Find = PointOfInterest::find($Point);
//        dd($Find);
//        return new PointOfInterestResouce($Point);
        return new PointOfInterestResouce(PointOfInterest::find($id));
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
        $Point = PointOfInterest::find($id);
        $validated = $request->validated();
        if($request->hasFile('images')){
            $Point->images= Storage::disk('local')->delete('public/PointOfInterestPhoto/'.$Point->images);
            $image = $validated['images'];
            $validated['images'] = $image->hashName();
            $image->store('public/PointOfInterestPhoto/');
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
        $Point = PointOfInterest::find($id);
        $Point->images= Storage::disk('local')->delete('public/PointOfInterestPhoto/'.$Point->images);
        $Point->delete();
        return new PointOfInterestResouce($Point);
    }

    public function getFile(Request $request, $pointPhoto){
        if(!$request->hasValidSignature()) return abort(401);
        $pointPhoto = PointOfInterest::find($pointPhoto);
        $pointPhoto->images= Storage::disk('local')->path('public/PointOfInterestPhoto/'.$pointPhoto->images);
        return response()->file($pointPhoto->images);
    }

    public function filter(Request $request)
    {
        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = PointOfInterest::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('name', "LIKE", "%{$validated['value']}%")
                ->orWhere('description', "LIKE", "%{$validated['value']}%")
                ->orWhere('gps_lng', "LIKE", "%{$validated['value']}%")
                ->orWhere('gps_lat', "LIKE", "%{$validated['value']}%")
                ->orWhere('country', "LIKE", "%{$validated['value']}%")
                ->orWhere('reservation_date', "LIKE", "%{$validated['value']}%")
                ->orWhere('opensAt', "LIKE", "%{$validated['value']}%")
                ->orWhere('isOpenRoundTheClock', "LIKE", "%{$validated['value']}%")
                ->orWhere('isTakeaway', "LIKE", "%{$validated['value']}%")
                ->orWhere('isOnLocation', "LIKE", "%{$validated['value']}%")
                ->orWhere('availableSeats', "LIKE", "%{$validated['value']}%")
                ->orWhere('reviewCount', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = PointOfInterest::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return PointOfInterestResouce::collection($users);
    }
}
