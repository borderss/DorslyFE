<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TitlePhotoRequest;
use App\Http\Resources\TitlePhotoResouce;
use App\Models\TitlePhotos;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use phpseclib3\System\SSH\Agent\Identity;
use function GuzzleHttp\Promise\all;

class TitlePhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return TitlePhotoResouce::collection(TitlePhotos::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return TitlePhotoResouce
     */
    public function store(TitlePhotoRequest $request)
    {
        $validated = $request->validated();
        $image = $validated['image'];
        $validated['image'] = $image->hashName();
        $image->store('public/PointOfInterestPhoto/');

        return new TitlePhotoResouce(TitlePhotos::create($validated));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return TitlePhotoResouce
     */
    public function show($id)
    {
        return new TitlePhotoResouce(TitlePhotos::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return TitlePhotoResouce
     */
    public function update(TitlePhotoRequest $request, $id)
    {
        $TitlePhoto = TitlePhotos::find($id);
        $validated = $request->validated();
        $TitlePhoto->image= Storage::disk('local')->delete('public/PointOfInterestPhoto/'.$TitlePhoto->image);
        $image = $validated['image'];
        $validated['image'] = $image->hashName();
        $image->store('public/PointOfInterestPhoto/');
        $TitlePhoto->update($validated);
        return new TitlePhotoResouce($TitlePhoto);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return TitlePhotoResouce
     */
    public function destroy($id)
    {
        $TitlePhoto = TitlePhotos::find($id);
        $TitlePhoto->image= Storage::disk('local')->delete('public/PointOfInterestPhoto/'.$TitlePhoto->image);
        $TitlePhoto->delete();
        return new TitlePhotoResouce($TitlePhoto);
    }

    public function getFile(Request $request, $photo){
        if(!$request->hasValidSignature()) return abort(401);
        $photo = TitlePhotos::find($photo);
        $photo->image = Storage::disk('local')->path('public/PointOfInterestPhoto/'.$photo->image);
        return response()->file($photo->image);
    }

}
