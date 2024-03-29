<?php

namespace App\Http\Controllers\Api\Houses;

use App\Applications\Houses\HouseApplication;
use App\Http\Controllers\Controller;
use App\Http\Requests\Houses\StoreHouseRequest;
use App\Http\Requests\Houses\UpdateHouseRequest;
use App\Shared\ApiResponser;

class HouseController extends Controller
{

    protected HouseApplication $houseApplication;

    public function __construct(HouseApplication $houseApplication)
    {
        $this->houseApplication = $houseApplication;
    }


    public function index()
    {
        $data = $this->houseApplication->getIndex();
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetIndex('house'));
    }

    public function getDefaultValueForForm($id)
    {
        $data = $this->houseApplication->getDefaultValueForForm($id);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('house'));
    }

    public function store(StoreHouseRequest $request)
    {
        $data = $this->houseApplication->store($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageStore('house'));
    }

    public function update($id, UpdateHouseRequest $request)
    {
        $data = $this->houseApplication->update($id, $request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageUpdate('house'));
    }
}
