<?php

namespace App\Http\Resources;

use App\Models\PointOfInterest;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResourse extends JsonResource
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
            'name'=>$this->name,
            'description' => $this->description,
            'point_of_interest_id' => new PointOfInterestResouce($this->PointOfInterest),
            'ingredients' => $this->ingredients,
            'image' => $this->image,
            'price' => $this->price,
        ];
    }
}
