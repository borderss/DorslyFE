<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class PointOfInterestResouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return[
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'gps_lng' => $this->gps_lng,
            'gps_lat' => $this->gps_lat,
            'country' => $this->country,
            'images' => URL::signedRoute('PointOfInterest.images',['PointOfInterest' => $this->id]),
            'reservation_date' => $this->reservation_date,
            'opensAt' => $this->opensAt,
            'isOpenRoundTheClock' => $this->isOpenRoundTheClock,
            'isTakeaway' => $this->isTakeaway,
            'isOnLocation' => $this->isOnLocation,
            'availableSeats' => $this->availableSeats,
            'reviewCount' => $this->reviewCount,
        ];
    }
}
