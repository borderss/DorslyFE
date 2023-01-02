<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PointOfInterestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' =>'required',
            'description' =>'required',
            'gps_lng' =>'required',
            'gps_lat' =>'required',
            'country' =>'required',
            'images' =>'required',
            'reservation_date' =>'required',
            'opensAt' =>'required',
            'isOpenRoundTheClock' =>'required',
            'isTakeaway' =>'required',
            'isOnLocation' =>'required',
            'availableSeats' =>'required',
            'reviewCount' =>'required',
        ];
    }
}
