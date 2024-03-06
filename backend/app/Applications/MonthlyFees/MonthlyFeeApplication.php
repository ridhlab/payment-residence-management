<?php

namespace App\Applications\MonthlyFees;

use App\Http\Requests\MonthlyFees\StoreMonthlyFeeRequest;
use App\Http\Requests\MonthlyFees\UpdateMonthlyFeeRequest;
use App\Models\MonthlyFee;

class MonthlyFeeApplication
{
    public function store(StoreMonthlyFeeRequest $request)
    {
        $monthlyFee = new MonthlyFee();
        $monthlyFee->name = $request->validated()['name'];
        $monthlyFee->fee = $request->validated()['fee'];

        $monthlyFee->save();
        return $monthlyFee;
    }

    public function update($id, UpdateMonthlyFeeRequest $request)
    {
        $monthlyFee = MonthlyFee::findOrFail($id);
        $monthlyFee->name = $request->validated()['name'];
        $monthlyFee->fee = $request->validated()['fee'];

        $monthlyFee->save();
        return $monthlyFee;
    }
}
