<?php

namespace App\Http\Controllers\Api\Occupants;

use App\Applications\Occupants\OccupantApplication;
use App\Http\Controllers\Controller;
use App\Http\Requests\Occupants\StoreOccupantRequest;
use App\Http\Requests\Occupants\UpdateOccupantRequest;
use App\Shared\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OccupantController extends Controller
{
    protected OccupantApplication $occupantApplication;
    public function __construct(OccupantApplication $occupantApplication = null)
    {
        $this->occupantApplication = $occupantApplication;
    }

    public function store(StoreOccupantRequest $request)
    {
        $data = $this->occupantApplication->store($request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageStore('occupant'));
    }

    public function update($uid, UpdateOccupantRequest $request)
    {
        $data = $this->occupantApplication->update($uid, $request);
        return ApiResponser::successResponser($data, ApiResponser::generateMessageUpdate('occupant'));
    }
}
