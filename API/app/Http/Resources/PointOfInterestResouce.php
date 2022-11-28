<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'images' => $this->images,
            'reservation_date' => $this->reservation_date,
        ];
    }
}
