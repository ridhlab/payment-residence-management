<?php

namespace App\Http\Requests\MonthlyFees;

use App\Http\Requests\BaseRequest;

class StoreMonthlyFeeRequest extends BaseRequest
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
            'name' => 'string|required',
            'fee' => 'numeric|required'
        ];
    }
}
