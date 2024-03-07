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

    public function getFilteredIsPaidMonthly()
    {
        $data = $this->monthlyExpenseApplication->getAllFilteredByIsPaidMonthly(true);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('monthly expense'));
    }

    public function getFilteredIsNotPaidMonthly()
    {
        $data = $this->monthlyExpenseApplication->getAllFilteredByIsPaidMonthly(false);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('monthly expense'));
    }


    public function store(StoreMonthlyExpensesRequest $request)
    {
        $data = $this->monthlyExpenseApplication->store($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageStore('monthly expense'));
    }

    public function update($id, UpdateMonthlyExpensesRequest $request)
    {
        $data = $this->monthlyExpenseApplication->update($id, $request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageUpdate('monthly expense'));
    }
}
