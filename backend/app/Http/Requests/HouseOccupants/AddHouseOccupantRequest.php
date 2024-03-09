<?php

namespace App\Http\Requests\HouseOccupants;

use Illuminate\Foundation\Http\FormRequest;

class AddHouseOccupantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'occupant_status' => 'required|in:contract,permanent',
            'house_id' => 'required|integer',
            'occupant_id' => 'required|integer',
            'start_date' => 'date_format:Y-m-d|required_if:occupant_status,contract',
            'end_date' => 'date_format:Y-m-d|required_if:occupant_status,contract'
        ];
    }
}
