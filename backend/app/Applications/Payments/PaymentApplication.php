<?php

namespace App\Applications\Payments;

use App\Http\Requests\Payments\AddPaymentRequest;
use App\Models\OccupantPayment;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PaymentApplication
{

    public function getPaymentByHouseOccupant($houseOccupantId)
    {
        $data = DB::table('payments', 'payment')
            ->leftJoin('occupant_payments AS occupant_payment', 'occupant_payment.id', '=', 'payment.occupant_payment_id')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.id', '=', 'occupant_payment.house_occupant_id')
            ->leftJoin('monthly_fees AS monthly_fee', 'monthly_fee.id', '=', 'payment.monthly_fee_id')
            ->leftJoin('monthly_expenses AS monthly_expense', 'monthly_expense.id', '=', 'payment.monthly_expense_id')
            ->where('house_occupant.id', '=', $houseOccupantId)
            ->select([
                'payment.id',
                'occupant_payment.payment_date',
                'payment.type AS payment_type',
                DB::raw('(CASE WHEN payment.type = "fee" THEN monthly_fee.name ELSE monthly_expense.name END) AS payment_name'),
                'payment.date AS payment_for_date'
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
                $isTypeFee = $payment['type'] == 'fee';
                if ($isTypeFee && !array_key_exists('monthly_fee_id', $payment)  || !$isTypeFee && !array_key_exists('monthly_expense_id', $payment)) {
                    throw new HttpException(400, 'Type and id relation not match');
                }
                $newPayment =  new Payment();
                if ($isTypeFee) {
                    $newPayment->monthly_fee_id = $payment['monthly_fee_id'];
                } else {
                    $newPayment->monthly_expense_id = $payment['monthly_expense_id'];
                }
                $date = Carbon::now()->addMonthNoOverflow($i - 1);
                $newPayment->date = $date;
                $newPayment->type = $payment['type'];
                $occupantPayment->payments()->save($newPayment);
            }
        }

        DB::commit();

        return true;
    }
}
