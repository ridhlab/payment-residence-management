<?php

namespace App\Http\Controllers\Api\HistoricalHouseOccupants;

use App\Applications\HistoricalHouseOccupants\HistoricalHouseOccupantApplication;
use App\Http\Controllers\Controller;
use App\Shared\ApiResponser;

class HistoricalHouseOccupantController extends Controller
{

    protected HistoricalHouseOccupantApplication $historicalHouseOccupantApplication;

    public function __construct(HistoricalHouseOccupantApplication $historicalHouseOccupantApplication)
    {
        $this->historicalHouseOccupantApplication = $historicalHouseOccupantApplication;
    }

    public function getHistoricalByHouseId($houseId)
    {
        $data = $this->historicalHouseOccupantApplication->getHistoricalByHouseId($houseId);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('historical house occupant'));
    }
}
