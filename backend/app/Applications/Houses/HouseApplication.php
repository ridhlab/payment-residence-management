<?php

namespace App\Applications\Houses;

use App\Http\Requests\Houses\StoreHouseRequest;
use App\Http\Requests\Houses\UpdateHouseRequest;
use App\Models\House;
use App\Services\Houses\HouseService;

class HouseApplication
{

    public function store(StoreHouseRequest $request)
    {
        $house = new House();
        $house->code = $request->validated()['code'];
        $house->is_occupied = false;
        $house->save();
        return $house;
    }

    public function update(string $uid, UpdateHouseRequest $request)
    {

        $house = House::where('uid', $uid)->first();
        $house->code = $request->validated()['code'];
        $house->is_occupied = $request->validated()['is_occupied'];
        $house->save();
        return $house;
    }
}
