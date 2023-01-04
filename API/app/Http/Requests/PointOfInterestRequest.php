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
            'opens_at' =>'required',
            'closes_at' =>'required',
            'is_open_round_the_clock' =>'required',
            'is_takeaway' =>'required',
            'is_on_location' =>'required',
            'available_seats' =>'required',
            'review_count' =>'required',
        ];
    }
}
