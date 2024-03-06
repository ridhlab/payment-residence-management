<?php

namespace App\Http\Requests\Houses;

use App\Http\Requests\BaseRequest;
use App\Models\House;
use Illuminate\Http\Request;

class UpdateHouseRequest extends BaseRequest
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
    public function rules(Request $request): array
    {
        $id = $request->route('id');
        $house = House::findOrFail($id);
        return [
            'code' => 'string|required|min:4|unique:houses,code,' . $house->id,
        ];
    }
}
