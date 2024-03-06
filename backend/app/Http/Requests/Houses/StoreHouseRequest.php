<?php

namespace App\Http\Requests\Houses;

use App\Http\Requests\BaseRequest;

class StoreHouseRequest extends BaseRequest
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
            'code' => 'string|required|min:4|unique:houses,code'
        ];
    }
}
