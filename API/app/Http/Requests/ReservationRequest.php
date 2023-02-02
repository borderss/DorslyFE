<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
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
            'point_of_interest_id' => 'required|integer',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'number_of_people' => 'required|integer',
        ];
    }
}
