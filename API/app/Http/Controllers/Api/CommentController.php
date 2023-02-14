<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommmentRequest;
use App\Http\Resources\CommentResourse;
use App\Http\Resources\FilterCommentResourse;
use App\Http\Resources\UserCommentResource;
use App\Models\Comment;
use App\Models\PointOfInterest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function getUserComments(){
        $user = auth()->user();
        $comments = Comment::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        return UserCommentResource::collection($comments);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return CommentResourse::collection(Comment::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CommmentRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        if (strlen($validated['text']) < 10) {
            return response()->json([
                'status' => 'error',
                'message' => 'Comment must be at least 10 characters long.'
            ],400);
        } else if (strlen($validated['text']) > 255) {
            return response()->json([
                'status' => 'error',
                'message' => 'Comment must be at most 255 characters long.'
            ],400);
        }

        if (!PointOfInterest::find($validated['point_of_interest_id'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Point of interest does not exist, something went wrong...'
            ],400);
        }

//        if (Comment::where('user_id', $validated['user_id'])->where('point_of_interest_id', $validated['point_of_interest_id'])->exists()) {
//            return response()->json([
//                'status' => 'error',
//                'message' => 'You have already reviewed this point of interest. Delete your previous review to add a new one.'
//            ],400);
//        }

        $comment = Comment::create($validated);

        // update POI review count
        $count = Comment::where('point_of_interest_id', $request->point_of_interest_id)->count();
        PointOfInterest::find($request->point_of_interest_id)->update(['review_count' => $count]);

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

        if ($comment->user_id != Auth::user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to delete this comment.'
            ],400);
        }

        $comment->delete();
        return new CommentResourse($comment);
    }

    public function filter(Request $request)
    {
        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = Comment::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('user_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('point_of_interest_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('text', "LIKE", "%{$validated['value']}%")
                ->orWhere('created_at', "LIKE", "%{$validated['value']}%")
                ->orWhere('updated_at', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = Comment::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return FilterCommentResourse::collection($users);
    }
}
