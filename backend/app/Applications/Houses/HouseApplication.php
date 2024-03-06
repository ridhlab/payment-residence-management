<?php

namespace App\Applications\houses;

use App\Http\Requests\Houses\StoreHouseRequest;
use App\Http\Requests\Houses\UpdateHouseRequest;
use App\Services\Houses\HouseService;

class HouseApplication
{

    protected HouseService $houseService;

    public function __construct(HouseService $houseService)
    {
        $this->houseService = $houseService;
    }

    public function store(StoreHouseRequest $request)
    {
        $data = $this->houseService->store($request->validated()['code']);
        return $data;
    }

    public function updateCode(string $uid, UpdateHouseRequest $request)
    {
        $data = $this->houseService->updateCode($uid, $request->validated()['code'], $request->validated()['is_occupied']);
        return $data;
    }
}
