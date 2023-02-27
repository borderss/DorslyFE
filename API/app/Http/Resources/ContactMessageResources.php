<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactMessageResources extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name'=>$this->last_name,
            'email' => $this->email,
            'text' => $this->text,
            'terms_conditions' => $this->terms_conditions,
            'entities' => $this->entity,
        ];
    }
}
