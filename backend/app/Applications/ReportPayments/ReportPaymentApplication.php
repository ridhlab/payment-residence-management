<?php

namespace App\Applications\ReportPayments;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportPaymentApplication
{
    // REPORT
    // Tab report list
    // - Berisi 2 tab, yaitu incomes dan outcomes 
    // Tab graph
    // - Berisi grafik line 3 parameter
    //   - Pemasukan pada bulan
    //   - Pengeluaran pada bulan
    //   - Sisa pada bulan
    // - Tampilkan juga total pengeluaran dan pemasukan serta sisa all time.

    public function reportIncomes(Request $request)
    {
        $dateSelected = $request->query('date');
        $query = DB::table('payments', 'payment')
            ->leftJoin('occupant_payments AS occupant_payment', 'occupant_payment.id', '=', 'payment.occupant_payment_id')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.id', '=', 'occupant_payment.house_occupant_id')
            ->leftJoin('houses AS house', 'house.id', '=', 'house_occupant.house_id')
            ->leftJoin('occupants AS occupant', 'occupant.id', '=', 'house_occupant.occupant_id')
            ->select([
                'payment.id', 'house.code AS houseCode',
                'occupant.fullname AS occupant', 'occupant_payment.payment_date'
            ]);
        if ($dateSelected) {
            $query->whereBetween(
                'occupant_payment.payment_date',
                [Carbon::parse($dateSelected)->startOfMonth(), Carbon::parse($dateSelected)->endOfMonth()]
            );
        }
        return $query->get();
    }

    public function reportOutcomes(Request $request)
    {
        $dateSelected = $request->query('date');
        $query = DB::table('outcomes', 'outcome')
            ->select(['outcome.id', 'outcome.name', 'outcome.created_at AS date']);
        if ($dateSelected) {
            $query->whereBetween(
                'outcome.created_at',
                [Carbon::parse($dateSelected)->startOfMonth(), Carbon::parse($dateSelected)->endOfMonth()]
            );
        }
        return $query->get();
    }
}
