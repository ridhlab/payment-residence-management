<?php

namespace App\Applications\MonthlyExpenses;

use App\Http\Requests\MonthlyExpenses\StoreMonthlyExpensesRequest;
use App\Http\Requests\MonthlyExpenses\UpdateMonthlyExpensesRequest;
use App\Models\MonthlyExpense;

class MonthlyExpenseApplication
{
    public function store(StoreMonthlyExpensesRequest $request)
    {
        $monthlyExpense = new MonthlyExpense();
        $monthlyExpense->name = $request->validated()['name'];
        $monthlyExpense->fee = $request->validated()['fee'];
        $monthlyExpense->is_paid_monthly = $request->validated()['is_paid_monthly'];
        $monthlyExpense->save();

        return $monthlyExpense;
    }

    public function update($uid, UpdateMonthlyExpensesRequest $request)
    {
        $monthlyExpense = MonthlyExpense::where('uid', $uid)->first();
        $monthlyExpense->name = $request->validated()['name'];
        $monthlyExpense->fee = $request->validated()['fee'];
        $monthlyExpense->is_paid_monthly = $request->validated()['is_paid_monthly'];
        $monthlyExpense->save();

        return $monthlyExpense;
    }
}
