<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DealsRequest extends FormRequest
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
            'user_id' => 'required|integer',
            'point_of_interest_id' => 'required|integer',

            // products
            'products' => 'required|array',
            'products.*.id' => 'required|integer',
            'products.*.quantity' => 'required|integer',

            // reservation
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'number_of_people' => 'required|integer',

            'type' => 'required',
            'prices' => 'required',
            'status' => 'required',
        ];
    }
}
