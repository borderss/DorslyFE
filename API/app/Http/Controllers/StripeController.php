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
            'products.*.product_id' => 'required|numeric',
            'products.*.amount' => 'required|numeric',
        ]);

        $stripeLineItems = [];

        foreach ($validated['products'] as $productRow) {
            $product = Product::find($productRow['product_id']);

            $stripeLineItem = [
                'price_data' => [
                    'currency' => 'eur',
                    'unit_amount' => round($product->price * 100),
                    'product_data' => [
                        'name' => $product->name,
                        'description' => 'eur',
                        'images' => [
                            $product->image
                        ],
                    ],
                ],
                'quantity' => $productRow['amount'],
            ];

            $stripeLineItems[] = $stripeLineItem;
        }

        $session = $stripe->checkout->sessions->create([
            'line_items' => [
                $stripeLineItems
            ],
            'mode' => 'payment',
            'success_url' => 'https://dorsly.com/payment'.'?poi='.$pointOfInterest->id.'&session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => 'https://dorsly.com/error',
        ]);

        return response()->json([
            'url' => $session['url'],
        ]);
    }

    public function successPayment (Request $request) {
        $stripe = new StripeClient(config('app.stripe_secret'));
        $session = $stripe->checkout->sessions->retrieve($request->get('session_id'));

        return response()->json([
            'data' => [
                "paymentSuccess" =>  $session->status,
                "customerDetails" => $session->customer_details,
            ]
        ]);
    }
}
