<?php

namespace App\Http\Requests\Payments;

use App\Http\Requests\BaseRequest;

class AddPaymentRequest extends BaseRequest
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
            'house_occupant_id' => 'required|integer',
            'payments' => 'present|array',
            'payments.*.monthly_fee_id' =>  'integer',
            'payments.*.number_of_months' =>  'integer|required',
        ];
    }
}
