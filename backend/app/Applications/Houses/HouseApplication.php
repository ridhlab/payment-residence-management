<?php

namespace App\Applications\Houses;

use App\Http\Requests\Houses\StoreHouseRequest;
use App\Http\Requests\Houses\UpdateHouseRequest;
use App\Models\House;
use Illuminate\Support\Facades\DB;

class HouseApplication
{
    public function getHouseOccupied()
    {
        $data = DB::table('houses', 'house')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.house_id', '=', 'house.id')
            ->leftJoin('occupants AS occupant', 'occupant.id', '=', 'house_occupant.occupant_id')
            ->where('is_occupied', '=', true)
            ->where('house_occupant.is_still_occupant', '=', true)
            ->select([
                'house.id',
                'house.code AS house_code',
                'occupant.fullname AS occupant_name',
                'house_occupant.occupant_status'
            ])
            ->get();
        return $data;
    }

    public function store(StoreHouseRequest $request)
    {
        $house = new House();
        $house->code = $request->validated()['code'];
        $house->is_occupied = false;
        $house->save();
        return $house;
    }

    public function update($id, UpdateHouseRequest $request)
    {

        $house = House::findOrFail($id);
        $house->code = $request->validated()['code'];
        $house->save();
        return $house;
    }

    public function setHouseOccupied($id)
    {
        $house = House::findOrFail($id);
        $house->is_occupied = true;
        $house->save();
    }

    public function setHouseNotOccupied($id)
    {
        $house = House::findOrFail($id);
        $house->is_occupied = false;
        $house->save();
    }
}
