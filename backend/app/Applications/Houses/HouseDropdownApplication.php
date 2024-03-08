<?php

namespace App\Applications\Houses;

use Illuminate\Support\Facades\DB;

class HouseDropdownApplication
{
    public function getAllHouseNotOccupied($search)
    {
        $data = DB::table('houses', 'house')
            ->where('house.is_occupied', '=', false)
            ->where('house.code', 'like', '%' . $search . '%')
            ->select(['id AS value', 'code AS label'])->get();
        return $data;
    }
}
