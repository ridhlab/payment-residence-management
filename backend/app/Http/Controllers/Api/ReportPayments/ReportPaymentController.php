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

    public function reportIncomes(Request $request)
    {
        $data = $this->reportPaymentApplication->reportIncomes($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('report incomes'));
    }

    public function reportOutcomes(Request $request)
    {
        $data = $this->reportPaymentApplication->reportOutcomes($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('report outcomes'));
    }
}
