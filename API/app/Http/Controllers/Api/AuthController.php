<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'phone_number' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:9',
        ]);
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        if ($user){
            return response()->json([
                'data' => $user
            ]);
        }
    }

    public function login(Request $request) {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user && Hash::check($validated['password'], $user->password)) {
            $token = $user->createToken('accessToken')->accessToken;

            return response()->json([
                'user' => new UserResource($user),
                'access_token' => $token,
            ]);
        }

        return response()->json([
            'data' => ['Check your email and password'],
        ],403);
    }

    public function logout() {
        auth()->user()->token()->revoke();

        return response()->json([
            'message' => [
                'type' => 'success',
                'data' => 'successfully logout'
            ]
        ]);
    }

    public function user() {
        return response()->json(new UserResource(auth()->user()));
    }
}
