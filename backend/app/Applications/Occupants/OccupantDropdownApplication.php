<?php

namespace App\Applications\Occupants;

use Illuminate\Support\Facades\DB;

class OccupantDropdownApplication
{
    public function getAllOccupantNotOccupy()
    {
        $data = DB::table('occupants', 'occupant')
            ->where('occupant.is_occupy', '=', false)
            ->get();
        return $data;
    }
}
