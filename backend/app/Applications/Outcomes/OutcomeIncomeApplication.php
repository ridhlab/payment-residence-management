<?php

namespace App\Applications\Outcomes;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OutcomeIncomeApplication
{
    public function getTotalIncome(Request $request)
    {
        // $startDate = $request->query('start_date');
        // $endDate = $request->query('end_date');
        // $isFilteredOneDate = $startDate == $endDate;
        $dataPayments = DB::table('payments', 'payment')
            ->leftJoin('monthly_fees AS monthly_fee', 'monthly_fee.id', '=', 'payment.monthly_fee_id')->get();
        // ->leftJoin('occupant_payments AS occupant_payment', 'occupant_payment.id', '=', 'payment.occupant_payment_id');
        // if ($isFilteredOneDate) {
        //     $query->whereBetween('occupant_payment.payment_date', [Carbon::parse($startDate)->startOfMonth(), Carbon::parse($endDate)->endOfMonth()]);
        // }
        // if (!$isFilteredOneDate && $startDate && $endDate) {
        //     $query->whereBetween('occupant_payment.payment_date', [Carbon::parse($startDate)->startOfMonth(), Carbon::parse($endDate)->startOfMonth()]);
        // }

        // $dataPayments = $query->get();
        $total = 0;
        foreach ($dataPayments as $data) {
            $total += $data->fee;
        };
        return $total;
    }

    // public function 
}
