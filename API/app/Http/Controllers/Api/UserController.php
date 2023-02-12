<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Comment;
use App\Models\Deal;
use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profileStatistics(){
        $user = auth()->user();

        $userDeals = Deal::where('user_id', $user->id)->get();

        $dealCount = $userDeals->count();
        $reviewCount = Comment::where('user_id', $user->id)->count();
        $totalSpent = 0;

        forEach($userDeals as $deal) {
            $totalSpent += $deal->prePurchase()->sum('total_price');
        }


        return response()->json([
            'dealCount' => $dealCount,
            'reviewCount' => $reviewCount,
            'totalSpent' => round($totalSpent, 2),
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection(User::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // kipa nevajag es hz
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new UserResource(User::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        User::find($id)->update($request->validate([
            "first_name"=>'required',
            "last_name"=>'required',
            "phone_number"=>'required',
            "email"=>'required',
            "is_admin"=>'required',
        ]));

        return new UserResource(User::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return new UserResource($user);
    }

    public function filter(Request $request)
    {
        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = User::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('first_name', "LIKE", "%{$validated['value']}%")
                ->orWhere('last_name', "LIKE", "%{$validated['value']}%")
                ->orWhere('phone_number', "LIKE", "%{$validated['value']}%")
                ->orWhere('email', "LIKE", "%{$validated['value']}%")
                ->orWhere('is_admin', "LIKE", "%{$validated['value']}%")
                ->orWhere('created_at', "LIKE", "%{$validated['value']}%")
                ->orWhere('updated_at', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = User::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return UserResource::collection($users);
    }
}
