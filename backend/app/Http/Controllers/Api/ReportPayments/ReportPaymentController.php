<?php

namespace App\Http\Controllers\Api\ReportPayments;

use App\Applications\ReportPayments\ReportPaymentApplication;
use App\Shared\ApiResponser;
use Illuminate\Http\Request;

class ReportPaymentController
{

    protected ReportPaymentApplication $reportPaymentApplication;

    public function __construct(ReportPaymentApplication $reportPaymentApplication)
    {
        $this->reportPaymentApplication = $reportPaymentApplication;
    }

    public function getBalanceAllTime()
    {
        $data = $this->reportPaymentApplication->getBalance();
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('balances'));
    }

    public function reportIncomes(Request $request)
    {
        $data = $this->reportPaymentApplication->reportIncomes($request->query('date'), $request->query('payment_for_date'));
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('report incomes'));
    }

    public function reportOutcomes(Request $request)
    {
        $data = $this->reportPaymentApplication->reportOutcomes($request->query('date'));
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('report outcomes'));
    }

    public function reportForyear($year)
    {
        $data = $this->reportPaymentApplication->reportForYear($year);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('report for year'));
    }
}
