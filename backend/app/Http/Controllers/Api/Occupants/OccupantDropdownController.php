<?php

namespace App\Http\Controllers\Api\Occupants;

use App\Applications\Occupants\OccupantDropdownApplication;
use App\Http\Controllers\Controller;
use App\Shared\ApiResponser;
use Illuminate\Http\Request;

class OccupantDropdownController extends Controller
{
    protected OccupantDropdownApplication $occupantDropdownApplication;

    public function __construct(OccupantDropdownApplication $occupantDropdownApplication)
    {
        $this->occupantDropdownApplication = $occupantDropdownApplication;
    }

    public function getAllOccupantNotOccupy(Request $request)
    {
        $data = $this->occupantDropdownApplication->getAllOccupantNotOccupy($request->query('search'));
        return ApiResponser::successResponser($data, ApiResponser::generateMessageGetData('occupant'));
    }
}
