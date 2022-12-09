<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommmentRequest;
use App\Http\Resources\CommentResourse;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return CommentResourse::collection(Comment::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return CommentResourse
     */
    public function store(CommmentRequest $request)
    {
        $comment = Comment::create($request->validated());

        return new CommentResourse($comment);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return CommentResourse
     */
    public function show($id)
    {
        return new CommentResourse(Comment::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return CommentResourse
     */
    public function update(CommmentRequest $request, $id)
    {
        Comment::find($id)->update($request->validated());

        return new CommentResourse(Comment::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return CommentResourse
     */
    public function destroy($id)
    {
        $comment = Comment::find($id);
        $comment->delete();
        return new CommentResourse($comment);
    }
}
