<?php

namespace App\Http\Controllers;

use App\Models\PointOfInterest;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function getSession(Request $request, PointOfInterest $pointOfInterest) {
        $stripe = new \Stripe\StripeClient(config('app.stripe_secret'));
        $validated = $request->validate([
            'products' => 'required|array',
        ]);
        $total = 0;

        foreach ($validated['products'] as $productId) {
            $product = Product::find($productId);
            error_log($pointOfInterest);
            if ($product['point_of_interest_id'] !== $pointOfInterest['id']) {
                return response()->json([
                    'data' => 'Product is not from same point of interest',
                ], 403);
            }
            $total += $product['price'];
        }

        $session = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'unit_amount' => round($total * 100),
                        'product_data' => [
                            'name' => $pointOfInterest['name'],
                        ],
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => 'https://dorsly.com/page'.'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => 'https://lossesly.com/#home',
        ]);
        return response()->json([
            'url' => $session['url'],
        ]);
    }

    public function successPayment (Request $request) {
        $stripe = new StripeClient(config('app.stripe_secret'));
        $stripe->checkout->sessions->retrieve($request->get('session_id'));

        return response()->json([
            'data' => 'success payment'
        ]);
    }
}
