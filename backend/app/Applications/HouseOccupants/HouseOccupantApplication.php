<?php

namespace App\Applications\HouseOccupants;

use App\Applications\HistoricalHouseOccupants\HistoricalHouseOccupantApplication;
use App\Applications\Houses\HouseApplication;
use App\Applications\Occupants\OccupantApplication;
use App\Http\Requests\HouseOccupants\AddHouseOccupantRequest;
use App\Http\Resources\HouseOccupantResource;
use App\Models\House;
use App\Models\HouseOccupant;
use App\Models\HouseOccupantContract;
use App\Models\Occupant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HouseOccupantApplication
{

    protected HouseApplication $houseApplication;
    protected HistoricalHouseOccupantApplication $historicalHouseOccupantApplication;
    protected OccupantApplication $occupantApplication;

    public function __construct(
        HouseApplication $houseApplication,
        HistoricalHouseOccupantApplication $historicalHouseOccupantApplication,
        OccupantApplication $occupantApplication
    ) {
        $this->houseApplication = $houseApplication;
        $this->historicalHouseOccupantApplication = $historicalHouseOccupantApplication;
        $this->occupantApplication = $occupantApplication;
    }

    public function getDetailHouseOccupant($id)
    {
        $data = HouseOccupant::findOrFail($id);
        return new HouseOccupantResource($data);
    }

    public function getHouseOccupied()
    {
        $data = DB::table('houses', 'house')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.house_id', '=', 'house.id')
            ->leftJoin('occupants AS occupant', 'occupant.id', '=', 'house_occupant.occupant_id')
            ->where('house.is_occupied', '=', true)
            ->where('house_occupant.is_still_occupant', '=', true)
            ->select([
                'house_occupant.id',
                'house.code AS house_code',
                'occupant.fullname AS occupant_name',
                'house_occupant.occupant_status'
            ])
            ->orderBy('house_occupant.created_at', 'DESC')
            ->get();
        return $data;
    }

    public function setEndHouseOccupant($houseOccupantId)
    {
        DB::beginTransaction();
        $houseOccupant = HouseOccupant::findOrFail($houseOccupantId);
        $houseOccupant->is_still_occupant = false;
        $houseOccupant->save();
        $this->houseApplication->setHouseNotOccupied($houseOccupant->house_id);
        $this->occupantApplication->setNotOccupy($houseOccupant->occupant_id);
        $this->historicalHouseOccupantApplication->setHistoricalEndDate($houseOccupantId);
        DB::commit();
        return true;
    }

    public function addHouseOccupant(AddHouseOccupantRequest $request)
    {
        $houseId = $request->validated()['house_id'];
        $occupantId = $request->validated()['occupant_id'];
        DB::beginTransaction();

        $house = House::findOrFail($houseId);
        if ($house->is_occupied) {
            throw new HttpException(400, 'House is occupied');
        }
        $occupant = Occupant::findOrFail($occupantId);
        if ($occupant->is_occupy) {
            throw new HttpException(400, 'Occupant is occupy');
        }

        $isContract = $request->validated()['occupant_status'] === 'contract';
        $houseOccupant = new HouseOccupant();
        $houseOccupant->occupant_status = $request->validated()['occupant_status'];
        $houseOccupant->house_id = $houseId;
        $houseOccupant->occupant_id = $occupantId;
        $houseOccupant->is_still_occupant = true;

        $houseOccupant->save();

        if ($isContract) {
            $houseOccupantContract = new HouseOccupantContract();
            $houseOccupantContract->start_date = Carbon::parse($request->validated()['start_date']);
            $houseOccupantContract->end_date = Carbon::parse($request->validated()['end_date']);
            $houseOccupant->houseOccupantContract()->save($houseOccupantContract);
        }


        $this->houseApplication->setHouseOccupied($houseId);
        $this->historicalHouseOccupantApplication->addHistorical($houseOccupant->id);
        $this->occupantApplication->setOccupy($occupantId);

        DB::commit();
        return $houseOccupant;
    }
}
