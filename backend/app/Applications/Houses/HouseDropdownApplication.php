<?php

namespace App\Applications\Houses;

use Illuminate\Support\Facades\DB;

class HouseDropdownApplication
{
    public function getAllHouseNotOccupied()
    {
        $data = DB::table('houses', 'house')->where('house.is_occupied', '=', false)->select(['uid', 'code'])->get();
        return $data;
    }
}
