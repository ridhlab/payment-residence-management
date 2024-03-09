<?php

namespace App\Http\Controllers\Api\Payments;

use App\Applications\Payments\PaymentApplication;
use App\Http\Controllers\Controller;
use App\Http\Requests\Payments\AddPaymentRequest;
use App\Shared\ApiResponser;
use Illuminate\Http\Request;
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

    public function getByOccupantHouseId($houseOccupantId, Request $request)
    {
        $data = $this->paymentApplication->getPaymentByHouseOccupant($houseOccupantId);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('payments'));
    }

    public function getNotPaidByHouseOccupant($houseOccupantId)
    {
        $data = $this->paymentApplication->getNotPaidByHouseOccupant($houseOccupantId);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('payments'));
    }

    public function getPaidByHouseOccupant($houseOccupantId)
    {
        $data = $this->paymentApplication->getPaidByHouseOccupant($houseOccupantId);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('payments'));
    }

    public function getTotalIncome(Request $request)
    {
        $data = $this->paymentApplication->getTotalIncome($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('payments'));
    }
}
