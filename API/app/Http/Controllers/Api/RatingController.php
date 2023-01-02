<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RatingRequest;
use App\Http\Resources\RatingResourse;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
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
        $rating = Rating::create($request->validated());

        return new RatingResourse($rating);
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
        $rating = Rating::find($id);
        $rating->delete();
        return new RatingResourse($rating);
    }
}
