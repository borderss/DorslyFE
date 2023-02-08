<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Models\PointOfInterest;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function successPayment (Request $request) {
        $stripe = new StripeClient(config('app.stripe_secret'));
        $session = $stripe->checkout->sessions->retrieve($request->get('session_id'));

        if ($session->status === 'paid') {
            $user_id = auth()->user()->id;
            $user_deal = Deal::where('user_id', $user_id);
            $user_deal->save();
        }

        return response()->json([
            'data' => [
                "paymentSuccess" =>  $session->status,
                "customerDetails" => $session->customer_details,
            ]
        ]);
    }
}
