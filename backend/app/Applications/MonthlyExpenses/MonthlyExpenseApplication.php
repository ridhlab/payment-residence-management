<?php

namespace App\Applications\MonthlyExpenses;

use App\Http\Requests\MonthlyExpenses\StoreMonthlyExpensesRequest;
use App\Http\Requests\MonthlyExpenses\UpdateMonthlyExpensesRequest;
use App\Models\MonthlyExpense;
use Illuminate\Support\Facades\DB;

class MonthlyExpenseApplication
{

    // public function getIndex()
    // {
    //     $data = MonthlyExpense::orderBy('created_at', 'DESC')->get();
    //     return $data;
    // }

    // public function getDefaultValueForForm($id)
    // {
    //     $data = MonthlyExpense::where('id', $id)->select([
    //         'id', 'name', 'fee', 'is_paid_monthly'
    //     ])->first();
    //     return $data;
    // }

    // public function getAllFilteredByIsPaidMonthly($isPaidMonthly)
    // {
    //     $data = DB::table('monthly_expenses')
    //         ->where('is_paid_monthly', '=', $isPaidMonthly)
    //         ->select(['id', 'name', 'fee', 'is_paid_monthly'])
    //         ->get();
    //     return $data->map(function ($item) {
    //         $item->is_paid_monthly  = $item->is_paid_monthly ? true : false;
    //         return $item;
    //     });
    // }

    // public function store(StoreMonthlyExpensesRequest $request)
    // {
    //     $monthlyExpense = new MonthlyExpense();
    //     $monthlyExpense->name = $request->validated()['name'];
    //     $monthlyExpense->fee = $request->validated()['fee'];
    //     $monthlyExpense->is_paid_monthly = $request->validated()['is_paid_monthly'];
    //     $monthlyExpense->save();

    //     return $monthlyExpense;
    // }

    // public function update($id, UpdateMonthlyExpensesRequest $request)
    // {
    //     $monthlyExpense = MonthlyExpense::findOrFail($id);
    //     $monthlyExpense->name = $request->validated()['name'];
    //     $monthlyExpense->fee = $request->validated()['fee'];
    //     $monthlyExpense->is_paid_monthly = $request->validated()['is_paid_monthly'];
    //     $monthlyExpense->save();

    //     return $monthlyExpense;
    // }
}
