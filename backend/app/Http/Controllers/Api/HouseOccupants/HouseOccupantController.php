<?php

namespace App\Http\Controllers\Api\HouseOccupants;

use App\Applications\HouseOccupants\HouseOccupantApplication;
use App\Http\Requests\HouseOccupants\AddHouseOccupantRequest;
use App\Shared\ApiResponser;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HouseOccupantController
{
    protected HouseOccupantApplication $houseOccupantApplication;
    public function __construct(HouseOccupantApplication $houseOccupantApplication)
    {
        $this->houseOccupantApplication = $houseOccupantApplication;
    }

    public function getDetailHouseOccupant($id)
    {
        $data = $this->houseOccupantApplication->getDetailHouseOccupant($id);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('house occupant'));
    }

    public function getHouseOccupied()
    {
        $data = $this->houseOccupantApplication->getHouseOccupied();
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('house occupant'));
    }

    public function setEndHouseOccupant($id)
    {
        try {
            $this->houseOccupantApplication->setEndHouseOccupant($id);
            return ApiResponser::successResponser(null, 'Success remove house occupant');
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function addHouseOccupant(AddHouseOccupantRequest $request)
    {
        try {
            $data = $this->houseOccupantApplication->addHouseOccupant($request);
            return ApiResponser::successResponser($data, 'Success add data house occupant');
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
