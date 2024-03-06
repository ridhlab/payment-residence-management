<?php

namespace App\Http\Requests\Occupants;

use App\Http\Requests\BaseRequest;

class StoreOccupantRequest extends BaseRequest
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
            'fullname' => 'string|required',
            'phone' => 'digits_between:9,14',
            'is_married' => 'required|boolean',
        ];
    }
}
