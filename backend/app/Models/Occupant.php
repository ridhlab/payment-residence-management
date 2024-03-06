<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Occupant extends BaseModel
{
    use HasFactory;

    static protected $table = 'occupants';

    public function houseOccupants(): HasMany
    {
        return $this->hasMany(HouseOccupant::class, 'occupant_id');
    }
}
