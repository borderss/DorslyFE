<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserRatingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $poi = new PointOfInterestResouce($this->PointOfInterest);

        return[
            'id' => $this->id,
            'point_of_interest' => [
                'id' => $poi->id,
                'name' => $poi->name,
            ],
            'rating' => $this->rating,
        ];
    }
}
