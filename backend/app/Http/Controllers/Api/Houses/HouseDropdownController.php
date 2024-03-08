<?php

namespace App\Http\Controllers\Api\Houses;

use App\Applications\Houses\HouseDropdownApplication;
use App\Http\Controllers\Controller;
use App\Shared\ApiResponser;
use Illuminate\Http\Request;

class HouseDropdownController extends Controller
{

    protected HouseDropdownApplication $houseDropdownApplication;

    public function __construct(HouseDropdownApplication $houseDropdownApplication)
    {
        $this->houseDropdownApplication = $houseDropdownApplication;
    }

    public function getAllHouseNotOccupied(Request $request)
    {
        $data = $this->houseDropdownApplication->getAllHouseNotOccupied($request->query('search'));
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('house'));
    }
}
