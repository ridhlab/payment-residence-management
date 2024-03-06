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
}
