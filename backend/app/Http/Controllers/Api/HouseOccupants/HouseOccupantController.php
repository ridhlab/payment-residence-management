<?php

namespace App\Http\Controllers\Api\HouseOccupants;

use App\Applications\HouseOccupants\HouseOccupantApplication;
use App\Http\Requests\HouseOccupants\AddHouseOccupantRequest;
use App\Shared\ApiResponser;

class HouseOccupantController
{
    protected HouseOccupantApplication $houseOccupantApplication;
    public function __construct(HouseOccupantApplication $houseOccupantApplication)
    {
        $this->houseOccupantApplication = $houseOccupantApplication;
    }

    public function addHouseOccupant(AddHouseOccupantRequest $request)
    {
        $data = $this->houseOccupantApplication->addHouseOccupant($request);
        return ApiResponser::successResponser($data, 'Success add data occupant');
    }
}
