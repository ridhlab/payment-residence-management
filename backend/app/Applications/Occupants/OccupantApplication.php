<?php

namespace App\Applications\Occupants;


use App\Helpers\StorageHelper;
use App\Http\Requests\Occupants\StoreOccupantRequest;
use App\Http\Requests\Occupants\UpdateOccupantRequest;
use App\Models\Occupant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class OccupantApplication
{
    public function getDefaultValueForForm($id)
    {
        $data = DB::table('occupants', 'occupant')->where('id', $id)->select([
            'id',
            'fullname', 'is_married', 'phone', 'identity_card_filename'
        ])->first();
        $data->identityCardUrl = $data->identity_card_filename ? StorageHelper::getUrlSorage('/identity-card/' . $data->identity_card_filename) : null;

        unset($data->identity_card_filename);
        return $data;
    }

    public function getIndex()
    {
        $data = DB::table('occupants', 'occupant')
            ->orderBy('occupant.created_at', 'DESC')->get();
        return $data;
    }

    public function setOccupy($id)
    {
        $occupant = Occupant::findOrFail($id);
        $occupant->is_occupy = true;
        $occupant->save();
    }

    public function setNotOccupy($id)
    {
        $occupant = Occupant::findOrFail($id);
        $occupant->is_occupy = false;
        $occupant->save();
    }

    public function store(StoreOccupantRequest $request)
    {
        $occupant = new Occupant();
        $occupant->fullname = $request->validated()['fullname'];
        $occupant->phone = $request->validated()['phone'] ?? null;
        $occupant->is_married = $request->validated()['is_married'];
        $occupant->is_occupy = false;
        $occupant->save();
        return $occupant;
    }

    public function update($id, UpdateOccupantRequest $request)
    {
        $occupant = Occupant::findOrFail($id);
        $occupant->fullname = $request->validated()['fullname'];
        $occupant->phone = $request->validated()['phone'] ?? null;
        $occupant->is_married = $request->validated()['is_married'];
        $occupant->save();
        return $occupant;
    }

    public function uploadIdentityCard($id, Request $request)
    {
        $identityCardFile = $request->file('identity_card');
        if ($identityCardFile) {
            $occupant = Occupant::findOrFail($id);
            $fileExist = !!$occupant->identity_card_filename;
            if ($fileExist) {
                $fileExistInPublic = (file_exists(public_path('storage/identity-card/' . $occupant->identity_card_filename)));
                if (!$fileExistInPublic) {
                    throw new HttpException(500, 'Internal server error');
                }
                File::delete(public_path('storage/identity-card/' . $occupant->identity_card_filename));
            }
            $filename  = StorageHelper::generateNewFileName($identityCardFile->getClientOriginalName());
            Storage::disk('public')->put('identity-card/' . $filename, file_get_contents($identityCardFile));
            $occupant->identity_card_filename =  $filename;

            $occupant->save();
            return true;
        }
    }
}
