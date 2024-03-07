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
        $data = House::orderBy('created_at', 'DESC')->get();
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
