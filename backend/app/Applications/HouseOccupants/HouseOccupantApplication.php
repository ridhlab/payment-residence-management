<?php

namespace App\Applications\HouseOccupants;

use App\Http\Requests\HouseOccupants\AddHouseOccupantRequest;
use App\Models\HouseOccupant;

class HouseOccupantApplication
{
    public function addHouseOccupant(AddHouseOccupantRequest $request)
    {
        $houseOccupant = new HouseOccupant();
        $houseOccupant->occupant_status = $request->validated()['occupant_status'];
        $houseOccupant->house_id = $request->validated()['house_id'];
        $houseOccupant->occupant_id = $request->validated()['occupant_id'];
        $houseOccupant->is_still_occupant = true;
        return $houseOccupant;
    }
}
