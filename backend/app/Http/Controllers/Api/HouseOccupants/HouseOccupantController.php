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

    public function addHouseOccupant(AddHouseOccupantRequest $request)
    {
        try {
            $data = $this->houseOccupantApplication->addHouseOccupant($request);
            return ApiResponser::successResponser($data, 'Success add data house occupant');
        } catch (\Throwable $e) {
            DB::rollBack();
            if ($e instanceof HttpException) {
                return ApiResponser::errorResponse($e->getMessage());
            }
        }
    }
}
