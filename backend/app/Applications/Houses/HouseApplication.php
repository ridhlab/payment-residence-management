<?php

namespace App\Applications\Houses;

use App\Http\Requests\Houses\StoreHouseRequest;
use App\Http\Requests\Houses\UpdateHouseRequest;
use App\Models\House;
use Illuminate\Support\Facades\DB;

class HouseApplication
{

    public function getIndex()
    {
        $data = DB::table('houses', 'house')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.house_id', '=', 'house.id')
            ->leftJoin('occupants AS occupant', 'occupant.id', '=', 'house_occupant.occupant_id')
            ->orderBy('house.created_at', 'DESC')
            ->select([
                'house.id',
                'house.is_occupied',
                'house.code',
                DB::raw('(CASE WHEN house.is_occupied = true THEN occupant.fullname ELSE null END) AS occupant'),
                'is_still_occupant'
            ])
            ->get()
            ->filter(function ($data) {
                return !($data->occupant && !$data->is_still_occupant);
            })
            ->values();
        return $data;
    }

    public function getDefaultValueForForm($id)
    {
        $data = House::where('id', $id)->select(['id', 'code'])->first();
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
