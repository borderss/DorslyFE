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
        $validated = $request->validate([
            'point_of_interest_id'=>'required|integer',
            'products' => 'required|array',
            'products.*.id' => 'required|integer',
            'products.*.quantity' => 'required|integer',
        ]);

        $user_deal = Deal::where('status', 'active')
            ->where('user_id', auth()->user()->id)
            ->whereHas('reservation', function ($query) use ($validated){
                $query->where('point_of_interest_id', $validated['point_of_interest_id']);
            })->first();

        if (!$user_deal){
            return response()->json([
                'message' => 'You do not have an active deal (reservation) here.'
            ], 400);
        }

        if ($user_deal->pre_purchase_id){
            return response()->json([
                'message' => 'You already have a pre-purchase here.'
            ], 400);
        }

        $valid_products = Product::where('point_of_interest_id', $validated['point_of_interest_id'])->get();
        $total_price = 0.00;

        foreach ($validated['products'] as $product){
            if (!$valid_products->contains($product['id'])){
                return response()->json([
                    'message' => 'Invalid product id'
                ], 400);
            }

            $total_price += $product['quantity'] * $valid_products->find($product['id'])->price;
        }

        $prePurchase = PrePurchase::create([
            'point_of_interest_id' => $validated['point_of_interest_id'],
            'products' => json_encode($validated['products']),
            'total_price' => $total_price,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $user_deal->update([
            'pre_purchase_id' => $prePurchase->id,
        ]);

        return new PrePurchaseResource($prePurchase);
    }

    public function filter(Request $request){
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
