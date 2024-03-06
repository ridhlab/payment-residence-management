<?php

namespace App\Http\Controllers\Api\MonthlyExpenses;

use App\Applications\MonthlyExpenses\MonthlyExpenseApplication;
use App\Http\Controllers\Controller;
use App\Http\Requests\MonthlyExpenses\StoreMonthlyExpensesRequest;
use App\Http\Requests\MonthlyExpenses\UpdateMonthlyExpensesRequest;
use App\Shared\ApiResponser;

class MonthlyExpenseController extends Controller
{
    protected MonthlyExpenseApplication $monthlyExpenseApplication;

    public function __construct(MonthlyExpenseApplication $monthlyExpenseApplication)
    {
        $this->monthlyExpenseApplication = $monthlyExpenseApplication;
    }

    public function store(StoreMonthlyExpensesRequest $request)
    {
        $data = $this->monthlyExpenseApplication->store($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageStore('monthly expense'));
    }

    public function update($uid, UpdateMonthlyExpensesRequest $request)
    {
        $data = $this->monthlyExpenseApplication->update($uid, $request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageUpdate('monthly expense'));
    }
}