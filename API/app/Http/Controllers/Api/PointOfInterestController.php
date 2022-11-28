<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PointOfInterestRequest;
use App\Http\Resources\PointOfInterestResouce;
use App\Models\PointOfInterest;
use Illuminate\Http\Request;

class PointOfInterestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return PointOfInterestResouce::collection(PointOfInterest::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return PointOfInterestResouce
     */
    public function store(PointOfInterestRequest $request)
    {
        $Point = PointOfInterest::create($request->validated());

        return new PointOfInterestResouce($Point);
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
        PointOfInterest::find($id)->update($request->validated());
        return new PointOfInterestResouce(PointOfInterest::find($id));
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
        $Point->delete();
        return new PointOfInterestResouce($Point);
    }
}
