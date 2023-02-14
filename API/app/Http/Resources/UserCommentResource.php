<?php

namespace App\Http\Resources;

use App\Models\PointOfInterest;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $poi = PointOfInterest::find($this->point_of_interest_id);

        return[
            'id' => $this->id,
            'point_of_interest' => [
                'id' => $poi->id,
                'name' => $poi->name,
            ],
            'date' => Carbon::createFromDate($this->created_at)->format('Y-m-d H:i'),
            'text' => $this->text,
        ];
    }
}
