<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class TitlePhotoResouce extends JsonResource
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
            'image' => URL::signedRoute('TitlePhotos.image',['TitlePhoto' => $this->id]),
            'point_of_interest_id' => new PointOfInterestResouce($this->PointOfInterest),
        ];
    }
}
