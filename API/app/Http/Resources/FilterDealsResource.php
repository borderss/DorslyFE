<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FilterDealsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $reservation = $this->reservation;
        $pre_purchase = $this->prePurchase;

        if ($pre_purchase){
            $response = [
                'products_count' => count(json_decode($pre_purchase->products)),
                'total_price' => $pre_purchase->total_price,
                'status' => $pre_purchase->status,
                'payment_status' => $pre_purchase->payment_status,
                'payment_id' => $pre_purchase->payment_id,
                'id' => $this->id,
                'user_id' => $this->user_id,
                'point_of_interest_id' => $this->point_of_interest_id,
                'date' => $reservation->date,
                'number_of_people' => $reservation->number_of_people,
            ];
        } else {
            $response = [
                'id' => $this->id,
                'user_id' => $this->user_id,
                'point_of_interest_id' => $this->point_of_interest_id,
                'date' => $reservation->date,
                'number_of_people' => $reservation->number_of_people,
            ];
        }

        return $response;
    }
}
