<?php

namespace App\Http\Resources;

use App\Models\Deal;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class DealsResourse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $poi = $this->pointOfInterest;
        $reservation = $this->reservation;
        $pre_purchase = $this->prePurchase;

        $response = [
            'id' => $this->id,
            'point_of_interest' => [
                'id' => $this->point_of_interest_id,
                'name' => $poi->name,
                'description' => $poi->description,
                'images' => $poi->images,
            ],
            'reservation' => [
                'id' => $this->pointOfInterest,
                'date' => $reservation->date,
                'number_of_people' => $reservation->number_of_people,
            ],
            'user_id'=> $this->user->id,
            'status' => $this->status,
        ];

        if ($pre_purchase){
            $productArray = [];

            foreach (json_decode($pre_purchase->products) as $productRow) {
                $product = Product::find($productRow->id);
                $productArray[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'image' => $product->image,
                    'price' => $product->price,
                    'quantity' => $productRow->quantity,
                ];
            }

            $response['pre_purchase'] = [
                'id' => $pre_purchase->id,
                'products' => $productArray,
                'total_price' => $pre_purchase->total_price,
                'status' => $pre_purchase->status,
                'payment_status' => $pre_purchase->payment_status,
                'payment_id' => $pre_purchase->payment_id,
            ];
        }

        return $response;
    }
}
