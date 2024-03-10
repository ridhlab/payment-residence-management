<?php

namespace App\Applications\ReportPayments;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportPaymentApplication
{
    public function reportForYear($year)
    {
        $data = [];
        for ($month = 1; $month <= 12; $month++) {
            $date = $year . '-' . $month;
            $incomesYear =  $this->reportIncomes($date);
            $outcomesYear =  $this->reportOutcomes($date);
            $totalIncomes = 0;
            foreach ($incomesYear as $income) {
                $totalIncomes += $income->fee;
            }
            $totalOutcomes = 0;
            foreach ($outcomesYear as $outcome) {
                $totalOutcomes += $outcome->fee;
            }
            $dataPerMonth = [
                'year' => intval($year),
                'month' => $month,
                'total_incomes' => $totalIncomes,
                'total_outcomes' => $totalOutcomes,
                'balance' => $totalIncomes - $totalOutcomes,
            ];
            array_push($data, $dataPerMonth);
        }
        return $data;
    }

    public function reportIncomes($date)
    {
        $dateSelected = $date;
        $query = DB::table('payments', 'payment')
            ->leftJoin('occupant_payments AS occupant_payment', 'occupant_payment.id', '=', 'payment.occupant_payment_id')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.id', '=', 'occupant_payment.house_occupant_id')
            ->leftJoin('houses AS house', 'house.id', '=', 'house_occupant.house_id')
            ->leftJoin('occupants AS occupant', 'occupant.id', '=', 'house_occupant.occupant_id')
            ->leftJoin('monthly_fees AS monthly_fee', 'monthly_fee.id', '=', 'payment.monthly_fee_id')
            ->select([
                'payment.id', 'house.code AS houseCode',
                'occupant.fullname AS occupant', 'occupant_payment.payment_date',
                'payment.date AS payment_for_date', 'monthly_fee.name AS payment_name',
                'monthly_fee.fee AS fee'
            ]);
        if ($dateSelected) {
            $query->whereBetween(
                'occupant_payment.payment_date',
                [Carbon::parse($dateSelected)->startOfMonth(), Carbon::parse($dateSelected)->endOfMonth()]
            );
        }
        return $query->get()->map(function ($item) {
            $item->payment_for_date = Carbon::parse($item->payment_for_date)->format('Y-m');
            return $item;
        });
    }

    public function reportOutcomes($date)
    {
        $dateSelected = $date;
        $query = DB::table('outcomes', 'outcome')
            ->select(['outcome.id', 'outcome.name', 'outcome.created_at AS date', 'outcome.fee']);
        if ($dateSelected) {
            $query->whereBetween(
                'outcome.created_at',
                [Carbon::parse($dateSelected)->startOfMonth(), Carbon::parse($dateSelected)->endOfMonth()]
            );
        }
        return $query->get();
    }

    public function getTotalIncomesAllTimes()
    {
        $dataPayments = DB::table('payments', 'payment')
            ->leftJoin('monthly_fees AS monthly_fee', 'monthly_fee.id', '=', 'payment.monthly_fee_id')
            ->get();
        $total = 0;
        foreach ($dataPayments as $data) {
            $total += $data->fee;
        };
        return $total;
    }

    public function getTotalOutcomesAllTimes()
    {
        $dataOutcomes = DB::table('outcomes', 'outcome')
            ->get();
        $total = 0;
        foreach ($dataOutcomes as $data) {
            $total += $data->fee;
        };
        return $total;
    }


    public function getBalance()
    {
        return [
            'balance' => $this->getTotalIncomesAllTimes() - $this->getTotalOutcomesAllTimes(),
            'total_incomes' => $this->getTotalIncomesAllTimes(),
            'total_outcomes' => $this->getTotalOutcomesAllTimes()
        ];
    }
}
