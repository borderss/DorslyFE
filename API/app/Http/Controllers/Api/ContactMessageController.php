<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactMessageRequest;
use App\Http\Resources\ContactMessageResources;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use function GuzzleHttp\Promise\all;

class ContactMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ContactMessageResources::collection(ContactMessage::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return ContactMessageResources
     */
    public function store(ContactMessageRequest $request)
    {
        $validated = $request->validated();

        if (strlen($validated['text']) < 10) {
            return response()->json([
                'status' => 'error',
                'message' => 'Your message must be at least 10 characters long.'
            ],400);
        } else if (strlen($validated['text']) > 255) {
            return response()->json([
                'status' => 'error',
                'message' => 'Your message must be at most 255 characters long.'
            ],400);
        }

        $message = ContactMessage::create($validated);
        return new ContactMessageResources($message);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return ContactMessageResources
     */
    public function show($id)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        return new ContactMessageResources(ContactMessage::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return ContactMessageResources
     */
    public function update(ContactMessageRequest $request, $id)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        ContactMessage::find($id)->update($request->validated());

        return new ContactMessageResources(ContactMessage::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return ContactMessageResources
     */
    public function destroy($id)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $message = ContactMessage::find($id);
        $message->delete();
        return new ContactMessageResources($message);
    }
}
