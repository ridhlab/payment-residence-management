<?php

namespace App\Applications\Occupants;

use Illuminate\Support\Facades\DB;

class OccupantDropdownApplication
{
    public function getAllOccupantNotOccupy($search)
    {
        $data = DB::table('occupants', 'occupant')
            ->where('occupant.is_occupy', '=', false)
            ->where('fullname', 'like', '%' . $search . '%')
            ->select(['id AS value', 'fullname AS label'])
            ->get();
        return $data;
    }
}
