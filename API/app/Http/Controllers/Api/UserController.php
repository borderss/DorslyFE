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
use Illuminate\Support\Facades\Hash;

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

    public function updateUserGeneralSettings(Request $request) {
        $validated = $request->validate([
            'first_name' => 'sometimes|nullable',
            'last_name' => 'sometimes|nullable',
            'email' => 'sometimes|nullable|email|unique:users,email,' . auth()->user()->id,
            'phone_number' => 'sometimes|nullable|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
        ]);

        $updateData = [];

        foreach ($validated as $key => $value) {
            if ($value) {
                $updateData[$key] = $value;
            }
        }

        $user = auth()->user();
        $user->update($updateData);

        return response()->json([
            'data' => new UserResource($user)
        ]);
    }

    public function updateUserPassword(Request $request) {
        $validated = $request->validate([
            'old_password' => 'required',
            'password' => 'required|min:9',
            'password_confirmation' => 'required|same:password',
        ]);

        $user = auth()->user();

        if (!Hash::check($validated['old_password'], $user->password)) {
            return response()->json([
                'message' => 'Old password is incorrect',
            ],403);
        }

        $user->update([
            'password' => Hash::make($validated['password'])
        ]);

        return response()->json([
            'data' => new UserResource($user)
        ]);
    }

    public function updateUserPrivacySettings(Request $request) {
        $validated = $request->validate([
            'is_promotion_emails_allowed' => 'sometimes|nullable|boolean',
            'is_security_notices_allowed' => 'sometimes|nullable|boolean',
            'is_reservation_info_allowed' => 'sometimes|nullable|boolean',
        ]);

        $updateData = [];

        foreach ($validated as $key => $value) {
            if ($value) {
                $updateData[$key] = $value;
            }
        }

        $user = auth()->user();
        $user->update($updateData);

        return response()->json([
            'data' => new UserResource($user)
        ]);
    }

    public function handleUserAccountDelete(Request $request) {
        $validated = $request->validate([
            'password' => 'required',
        ]);

        $user = auth()->user();

        if (!Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Password is incorrect',
            ],403);
        }

        $user->delete();

        return response()->json([
            'message' => 'Account deleted successfully',
        ]);
    }
}
