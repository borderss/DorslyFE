<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PrePurchaseResource;
use App\Models\Deal;
use App\Models\PointOfInterest;
use App\Models\PrePurchase;
use App\Models\Product;
use Illuminate\Http\Request;

class PrePurchaseController extends Controller
{
    public function createPrePurchase(Request $request){
        $stripe = new \Stripe\StripeClient(config('app.stripe_secret'));
        $validated = $request->validate([
            'point_of_interest_id'=>'required|integer',
            'products' => 'required|array',
            'products.*.id' => 'required|integer',
            'products.*.quantity' => 'required|integer',
        ]);

        $userDeal = Deal::where('status', 'active')
            ->where('user_id', auth()->user()->id)
            ->whereHas('reservation', function ($query) use ($validated){
                $query->where('point_of_interest_id', $validated['point_of_interest_id']);
            })->first();

        if (!$userDeal){
            return response()->json([
                'status' => 'error',
                'message' => 'You do not have an active deal (reservation) here.'
            ]);
        }

        if ($userDeal->pre_purchase_id){
            return response()->json([
                'status' => 'error',
                'message' => 'You already have a pre-purchase here.'
            ]);
        }

        $validProducts = Product::where('point_of_interest_id', $validated['point_of_interest_id'])->get();
        $totalPrice = 0.00;
        $stripeLineItems = [];

        foreach ($validated['products'] as $product){
            if (!$validProducts->contains($product['id'])){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid product id'
                ]);
            }

            $productData = Product::find($product['id']);

            $stripeLineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'unit_amount' => round($productData->price * 100),
                    'product_data' => [
                        'name' => $productData->name,
                        'description' => 'eur',
                        'images' => [
                            $productData->image
                        ],
                    ],
                ],
                'quantity' => $product['quantity'],
            ];

            $totalPrice += $product['quantity'] * $productData->price;
        }

        $rootFrontedUrl = config('app.root_fronted_url');

        $session = $stripe->checkout->sessions->create([
            'line_items' => [
                $stripeLineItems
            ],
            'mode' => 'payment',
            'success_url' => $rootFrontedUrl.'payment'.'?poi='. PointOfInterest::find($validated['point_of_interest_id'])->id.'&session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $rootFrontedUrl.'error',
        ]);

        $prePurchase = PrePurchase::create([
            'point_of_interest_id' => $validated['point_of_interest_id'],
            'products' => json_encode($validated['products']),
            'total_price' => $totalPrice,
            'status' => 'pending',
            'payment_status' => $session->status,
            'payment_id' => $session->id,
        ]);

        $userDeal->update([
            'pre_purchase_id' => $prePurchase->id,
        ]);

        return response()->json([
            'stripe_url' => $session['url'],
            'id' => $prePurchase->id,
            'products' => json_decode($prePurchase->products),
            'total_price' => $prePurchase->total_price,
            'status' => $prePurchase->status,
            'payment_status' => $prePurchase->payment_status,
            'payment_id' => $session->id,
            'created_at' => $prePurchase->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $prePurchase->updated_at->format('Y-m-d H:i:s'),
        ]);
    }

    public function filter(Request $request){
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = PrePurchase::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('point_of_interest_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('products', "LIKE", "%{$validated['value']}%")
                ->orWhere('status', "LIKE", "%{$validated['value']}%")
                ->orWhere('payment_status', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = PrePurchase::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return PrePurchaseResource::collection($users);
    }
}
