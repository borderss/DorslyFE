<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'is_admin' => $this->is_admin,
            'created_at' => \Carbon\Carbon::parse($this->created_at)->format('d/m/Y H:i:s'),
            'updated_at' => \Carbon\Carbon::parse($this->updated_at)->format('d/m/Y H:i:s'),
        ];
    }
}
