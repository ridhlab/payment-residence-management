<?php

namespace App\Http\Controllers\Api\Houses;

use App\Applications\Houses\HouseDropdownApplication;
use App\Http\Controllers\Controller;
use App\Shared\ApiResponser;

class HouseDropdownController extends Controller
{

    protected HouseDropdownApplication $houseDropdownApplication;

    public function __construct(HouseDropdownApplication $houseDropdownApplication)
    {
        $this->houseDropdownApplication = $houseDropdownApplication;
    }

    public function getAllHouseNotOccupied()
    {
        $data = $this->houseDropdownApplication->getAllHouseNotOccupied();
        return ApiResponser::successResponser($data, 'Success get data');
    }
}
