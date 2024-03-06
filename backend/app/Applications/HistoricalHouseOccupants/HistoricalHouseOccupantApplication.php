<?php

namespace App\Applications\HistoricalHouseOccupants;

use App\Models\HistoricalHouseOccupant;
use Carbon\Carbon;

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
}
