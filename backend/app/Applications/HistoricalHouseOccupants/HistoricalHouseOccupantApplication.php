<?php

namespace App\Applications\HistoricalHouseOccupants;

use App\Models\HistoricalHouseOccupant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class HistoricalHouseOccupantApplication
{
    public function addHistorical($houseOccupantId)
    {
        $historicalHouseOccupant = new HistoricalHouseOccupant();
        $historicalHouseOccupant->house_occupant_id = $houseOccupantId;
        $historicalHouseOccupant->start_date = Carbon::now();
        $historicalHouseOccupant->save();
    }

    public function setHistoricalEndDate($houseOccupantId)
    {
        $historicalHouseOccupant = HistoricalHouseOccupant::where('house_occupant_id', $houseOccupantId)->first();
        $historicalHouseOccupant->end_date = Carbon::now();
        $historicalHouseOccupant->save();
    }

    public function getHistoricalByHouseId($houseId)
    {
        $data = DB::table('historical_house_occupants', 'historical_house_occupant')
            ->leftJoin('house_occupants AS house_occupant', 'house_occupant.id', '=', 'historical_house_occupant.house_occupant_id')
            ->leftJoin('houses AS house', 'house.id', '=', 'house_occupant.house_id')
            ->leftJoin('occupants AS occupant', 'occupant.id', '=', 'house_occupant.occupant_id')
            ->where('house.id', '=', $houseId)
            ->select([
                'historical_house_occupant.id',
                'house.code AS house_code',
                'occupant.fullname AS occupant_name',
                'house_occupant.is_still_occupant',
                'historical_house_occupant.start_date',
                'historical_house_occupant.end_date',
            ])
            ->orderByDesc('house_occupant.is_still_occupant')
            ->get();
        return $data;
    }
}
