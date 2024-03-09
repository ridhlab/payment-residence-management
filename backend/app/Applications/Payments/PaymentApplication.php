<?php

namespace App\Applications\Payments;

use App\Http\Requests\Payments\AddPaymentRequest;
use App\Models\MonthlyFee;
use App\Models\OccupantPayment;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PaymentApplication
{

    public function getLastPaidMonth($houseOccupantId, $monthlyFeeId)
    {
        $listPayments = (DB::table('occupant_payments', 'occupant_payment')
            ->where('occupant_payment.house_occupant_id', '=', $houseOccupantId)
            ->leftJoin('payments AS payment', 'payment.occupant_payment_id', '=', 'occupant_payment.id')
            ->where('payment.monthly_fee_id', '=', $monthlyFeeId)
            ->orderByDesc('payment.date')->get());
        return count($listPayments) > 0 ? Carbon::parse($listPayments[0]->date)->format('Y-m')  : null;
    }

    // Get payments name that is paid in this month
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
        return $paymentPaid->map(function ($paymentFee) use ($houseOccupantId) {
            $paymentFee->lastPaidMonth = $this->getLastPaidMonth($houseOccupantId, $paymentFee->id);
            return $paymentFee;
        });
    }

    // Get payments name that is not paid in this month
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

        return $notPaids->map(function ($payment) use ($houseOccupantId) {
            $payment['lastPaidMonth'] = $this->getLastPaidMonth($houseOccupantId, $payment['id']);
            return $payment;
        });
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
                'monthly_fee.fee AS fee'
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
            $lastPaidMonths = $this->getLastPaidMonth($houseOccupantId, $payment['monthly_fee_id']);
            for ($i = 1; $i <= $payment['number_of_months']; $i++) {
                $newPayment =  new Payment();
                $newPayment->monthly_fee_id = $payment['monthly_fee_id'];
                $date = Carbon::parse($lastPaidMonths)->addMonthNoOverflow($i);
                $newPayment->date = $date;
                $occupantPayment->payments()->save($newPayment);
            }
        }

        DB::commit();

        return true;
    }
}
