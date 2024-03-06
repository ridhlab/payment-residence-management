<?php

namespace App\Services\Houses;

use App\Models\House;

class HouseService
{
    public function store(string $code)
    {
        $house = new House();
        $house->code = $code;
        $house->is_occupied = false;
        $house->save();
        return $house;
    }

    public function updateCode(string $uid, string $code, bool $isOccupied)
    {
        $house = House::where('uid', $uid)->first();
        $house->code = $code;
        $house->is_occupied = $isOccupied;
        $house->save();
        return $house;
    }
}
