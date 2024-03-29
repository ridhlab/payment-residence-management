<?php

namespace App\Http\Controllers\Api\MonthlyFees;

use App\Applications\MonthlyFees\MonthlyFeeApplication;
use App\Http\Controllers\Controller;
use App\Http\Requests\MonthlyFees\StoreMonthlyFeeRequest;
use App\Http\Requests\MonthlyFees\UpdateMonthlyFeeRequest;
use App\Shared\ApiResponser;

class MonthlyFeeController extends Controller
{
    protected MonthlyFeeApplication $monthlyFeeApplication;

    public function __construct(MonthlyFeeApplication $monthlyFeeApplication)
    {
        $this->monthlyFeeApplication = $monthlyFeeApplication;
    }

    public function index()
    {
        $data = $this->monthlyFeeApplication->getIndex();
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetIndex('monthly fee'));
    }

    public function getDefaultValueForForm($id)
    {
        $data = $this->monthlyFeeApplication->getDefaultValueForForm($id);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('monthly fee'));
    }

    public function getAll()
    {
        $data = $this->monthlyFeeApplication->getAll();
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('monthly fee'));
    }

    public function store(StoreMonthlyFeeRequest $request)
    {
        $data = $this->monthlyFeeApplication->store($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageStore('monthly fee'));
    }

    public function update($id, UpdateMonthlyFeeRequest $request)
    {
        $data = $this->monthlyFeeApplication->update($id, $request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageUpdate('house'));
    }
}
