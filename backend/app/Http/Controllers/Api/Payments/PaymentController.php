<?php

namespace App\Http\Controllers\Api\Payments;

use App\Applications\Payments\PaymentApplication;
use App\Http\Controllers\Controller;
use App\Http\Requests\Payments\AddPaymentRequest;
use App\Shared\ApiResponser;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PaymentController extends Controller
{
    protected PaymentApplication $paymentApplication;


    public function __construct(PaymentApplication $paymentApplication)
    {
        $this->paymentApplication = $paymentApplication;
    }

    public function addPayments(AddPaymentRequest $request)
    {
        try {
            $this->paymentApplication->addPayments($request);
            return ApiResponser::successResponser(null, 'Add payments successfully');
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
