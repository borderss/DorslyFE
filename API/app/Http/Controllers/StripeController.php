<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function getSession() {
        $stripe = new \Stripe\StripeClient(config('app.stripe_secret'));

        $session = $stripe->checkout->sessions->create([
            'success_url' => 'https://dorsly.com/',
            'cancel_url' => 'https://lossesly.com/#home',
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'unit_amount' => 500,
                        'product_data' => [
                            'name' => "Product",
                        ],
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
        ]);

        dd($session);
    }

}
