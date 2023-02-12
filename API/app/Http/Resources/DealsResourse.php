<?php

namespace App\Http\Resources;

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
        $response = [
            'id' => $this->id,
            'point_of_interest' => [
                'id' => $this->pointOfInterest->id,
                'name' => $this->pointOfInterest->name,
                'description' => $this->pointOfInterest->description,
                'images' => $this->pointOfInterest->images,
            ],
            'reservation' => [
                'id' => $this->reservation->id,
                'date' => $this->reservation->date,
                'number_of_people' => $this->reservation->number_of_people,
            ],
            'user_id'=> $this->user->id,
            'status' => $this->status,
        ];

        if ($this->prePurchase){
            $productArray = [];

            foreach (json_decode($this->prePurchase->products) as $productRow) {
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
                'id' => $this->prePurchase->id,
                'products' => $productArray,
                'total_price' => $this->prePurchase->total_price,
                'status' => $this->prePurchase->status,
                'payment_status' => $this->prePurchase->payment_status,
                'payment_id' => $this->prePurchase->payment_id,
            ];
        }

        return $response;
    }
}
