<?php

namespace App\Applications\Occupants;

use Illuminate\Support\Facades\DB;

class OccupantDropdownApplication
{
    public function getAllOccupantNotOccupy()
    {
        $data = DB::table('occupants', 'occupant')
            ->leftJoin('house_occupants AS house_occupant', 'occupant.id', '=', 'house_occupant.occupant_id')
            ->get();
        return $data;
    }
}
