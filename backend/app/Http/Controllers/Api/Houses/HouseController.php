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

    // TODO : Define index controller
    // public function index()
    // {
    //     $data = $this->houseApplication->getIndex();
    //     return ApiResponser::successResponser($data, ApiResponser::generateMessageGetIndex('house'));
    // }

    public function show($uid)
    {
    }

    public function store(StoreHouseRequest $request)
    {
        $data = $this->houseApplication->store($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageStore('house'));
    }

    public function update($uid, UpdateHouseRequest $request)
    {
        $data = $this->houseApplication->updateCode($uid, $request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageUpdate('house'));
    }
}
