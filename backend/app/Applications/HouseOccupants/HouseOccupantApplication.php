<?php

namespace App\Applications\HouseOccupants;

use App\Applications\HistoricalHouseOccupants\HistoricalHouseOccupantApplication;
use App\Applications\Houses\HouseApplication;
use App\Applications\Occupants\OccupantApplication;
use App\Http\Requests\HouseOccupants\AddHouseOccupantRequest;
use App\Models\HouseOccupant;
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

    public function addHouseOccupant(AddHouseOccupantRequest $request)
    {
        $houseId = $request->validated()['house_id'];
        $occupantId = $request->validated()['occupant_id'];
        DB::beginTransaction();

        $house = DB::table('houses', 'house')->where('house.id', '=', $houseId)->first();
        if ($house->is_occupied) {
            throw new HttpException(400, 'House is occupied');
        }
        $occupant = DB::table('occupants', 'occupant')->where('occupant.id', '=', $occupantId)->first();
        if ($occupant->is_occupy) {
            throw new HttpException(400, 'Occupant is occupy');
        }

        $houseOccupant = new HouseOccupant();
        $houseOccupant->occupant_status = $request->validated()['occupant_status'];
        $houseOccupant->house_id = $houseId;
        $houseOccupant->occupant_id = $occupantId;
        $houseOccupant->is_still_occupant = true;

        $houseOccupant->save();

        $this->houseApplication->setHouseOccupied($houseId);
        $this->historicalHouseOccupantApplication->addHistorical($houseOccupant->id);
        $this->occupantApplication->setOccupy($occupantId);

        DB::commit();
        return $houseOccupant;
    }
}
