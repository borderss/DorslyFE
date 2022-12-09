<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DealsRequest;
use App\Http\Resources\DealsResourse;
use App\Models\Deals;
use Illuminate\Http\Request;

class DealsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return DealsResourse::collection(Deals::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return DealsResourse
     */
    public function store(DealsRequest $request)
    {
        $deal = Deals::create($request->validated());

        return new DealsResourse($deal);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return DealsResourse
     */
    public function show($id)
    {
        return new DealsResourse(Deals::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return DealsResourse
     */
    public function update(DealsRequest $request, $id)
    {
        Deals::find($id)->update($request->validated());

        return new DealsResourse(Deals::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return DealsResourse
     */
    public function destroy($id)
    {
        $deal = Deals::find($id);
        $deal->delete();
        return new DealsResourse($deal);
    }
}
