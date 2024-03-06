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

    public function store(StoreMonthlyFeeRequest $request)
    {
        $data = $this->monthlyFeeApplication->store($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageStore('monthly fee'));
    }

    public function update($uid, UpdateMonthlyFeeRequest $request)
    {
        $data = $this->monthlyFeeApplication->update($uid, $request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageUpdate('house'));
    }
}
