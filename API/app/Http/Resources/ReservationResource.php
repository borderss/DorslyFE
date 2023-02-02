<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'point_of_interest_id' => $this->point_of_interest_id,
            'date' => $this->date,
            'time' => $this->time,
            'number_of_people' => $this->number_of_people,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
