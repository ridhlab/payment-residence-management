<?php

namespace App\Applications\Occupants;


use App\Helpers\StorageHelper;
use App\Http\Requests\Occupants\StoreOccupantRequest;
use App\Http\Requests\Occupants\UpdateOccupantRequest;
use App\Models\Occupant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;


class OccupantApplication
{
    public function store(StoreOccupantRequest $request)
    {
        $occupant = new Occupant();
        $occupant->fullname = $request->validated()['fullname'];
        $occupant->phone = $request->validated()['phone'] ?? null;
        $occupant->is_married = $request->validated()['is_married'];
        $occupant->save();
        return $occupant;
    }

    public function update(string $uid, UpdateOccupantRequest $request)
    {
        $occupant = Occupant::where('uid', $uid)->first();
        $occupant->fullname = $request->validated()['fullname'];
        $occupant->phone = $request->validated()['phone'] ?? null;
        $occupant->is_married = $request->validated()['is_married'];
        $occupant->save();
        return $occupant;
    }
}
