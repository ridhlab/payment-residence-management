<?php

namespace App\Applications\Payments;

use App\Http\Requests\Payments\AddPaymentRequest;
use App\Models\MonthlyFee;
use App\Models\OccupantPayment;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentApplication
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

    public function getPaidByHouseOccupant($houseOccupantId)
    {
        $paymentPaid = DB::table('payments', 'payment')
            ->leftJoin('occupant_payments AS occupant_payment', 'occupant_payment.id', 'payment.occupant_payment_id')
            ->leftJoin('house_occupants AS house_occupant', 'occupant_payment.house_occupant_id', '=', 'house_occupant.id')
            ->leftJoin('monthly_fees AS monthly_fee', 'monthly_fee.id', '=', 'payment.monthly_fee_id')
            ->where('house_occupant.id', '=', $houseOccupantId)
            ->whereYear('payment.date', '=', Carbon::now())
            ->whereMonth('payment.date', '=', Carbon::now())
            ->select([
                'monthly_fee.id',
                'monthly_fee.name',
                'monthly_fee.fee',
                'occupant_payment.payment_date'
            ])
            ->get();
        return $paymentPaid;
    }

    public function getNotPaidByHouseOccupant($houseOccupantId)
    {
        $paymentPaid = $this->getPaidByHouseOccupant($houseOccupantId);
        $listPaymentAvailable = [...MonthlyFee::all()->map(function ($fee) {
            return [
                'id' => $fee['id'],
                'name' => $fee['name'],
                'fee' => $fee['fee'],
            ];
        })];
        $notPaids = collect($listPaymentAvailable)->filter(function ($paymentAvail) use ($paymentPaid) {
            $isPaid = false;
            foreach ($paymentPaid as $payment) {
                if ($paymentAvail['id'] == $payment->id) {
                    $isPaid = true;
                }
            }
            return $isPaid ? false : true;
        })->values();

        return $notPaids;
    }

    public function getPaymentByHouseOccupant($houseOccupantId)
    {
        $data = DB::table('payments', 'payment')
            ->leftJoin('occupant_payments AS occupant_payment', 'occupant_payment.id', '=', 'payment.occupant_payment_id')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.id', '=', 'occupant_payment.house_occupant_id')
            ->leftJoin('monthly_fees AS monthly_fee', 'monthly_fee.id', '=', 'payment.monthly_fee_id')
            ->where('house_occupant.id', '=', $houseOccupantId)
            ->select([
                'payment.id',
                'occupant_payment.payment_date',
                'payment.date AS payment_for_date',
            ])
            ->get();
        $data->map(function ($data) {
            $data->payment_for_date = Carbon::parse($data->payment_for_date)->format('m') . '-' . Carbon::parse($data->payment_for_date)->format('Y');
            return $data;
        });
        return $data;
    }

    public function addPayments(AddPaymentRequest $request)
    {
        $houseOccupantId = $request->validated()['house_occupant_id'];
        DB::beginTransaction();
        $occupantPayment = new OccupantPayment();
        $occupantPayment->house_occupant_id = $houseOccupantId;
        $occupantPayment->payment_date = Carbon::now();
        $occupantPayment->save();

        foreach ($request->validated()['payments'] as $payment) {
            for ($i = 1; $i <= $payment['number_of_months']; $i++) {
                $newPayment =  new Payment();
                $newPayment->monthly_fee_id = $payment['monthly_fee_id'];
                $date = Carbon::now()->addMonthNoOverflow($i - 1);
                $newPayment->date = $date;
                $occupantPayment->payments()->save($newPayment);
            }
        }

        DB::commit();

        return true;
    }
}
