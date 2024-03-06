<?php

namespace App\Http\Controllers\Api\Occupants;

use App\Applications\Occupants\OccupantDropdownApplication;
use App\Http\Controllers\Controller;
use App\Shared\ApiResponser;

class OccupantDropdownController extends Controller
{
    protected OccupantDropdownApplication $occupantDropdownApplication;

    public function __construct(OccupantDropdownApplication $occupantDropdownApplication)
    {
        $this->occupantDropdownApplication = $occupantDropdownApplication;
    }

    public function getAllOccupantNotOccupy()
    {
        $data = $this->occupantDropdownApplication->getAllOccupantNotOccupy();
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('occupant'));
    }
}
