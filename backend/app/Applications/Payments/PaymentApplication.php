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
    public function addPayments(AddPaymentRequest $request)
    {
        $houseOccupantId = $request->validated()['house_occupant_id'];
        DB::beginTransaction();
        $occupantPayment = new OccupantPayment();
        $occupantPayment->house_occupant_id = $houseOccupantId;
        $occupantPayment->payment_date = Carbon::now();
        $occupantPayment->save();

        foreach ($request->validated()['payments'] as $payment) {
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
            $newPayment->number_of_months =  $payment['number_of_months'];
            $occupantPayment->payments()->save($newPayment);
        }

        DB::commit();

        return true;
    }
}
