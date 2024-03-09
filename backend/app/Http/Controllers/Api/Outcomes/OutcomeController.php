<?php

namespace App\Http\Controllers\Api\Outcomes;

use App\Applications\Outcomes\OutcomeApplication;
use App\Http\Controllers\Controller;
use App\Http\Requests\Outcomes\AddOutcomeRequest;
use App\Shared\ApiResponser;

class OutcomeController extends Controller
{
    protected OutcomeApplication $outcomeApplication;

    public function __construct(OutcomeApplication $outcomeApplication)
    {
        $this->outcomeApplication = $outcomeApplication;
    }

    public function getIndex()
    {
        $data = $this->outcomeApplication->getIndex();
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('outcome'));
    }

    public function addOutcome(AddOutcomeRequest $request)
    {
        $data = $this->outcomeApplication->addOutcome($request);
        return ApiResponser::successResponser($data, 'Add outcome successfully');
    }
}
