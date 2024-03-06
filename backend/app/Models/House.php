<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class House extends BaseModel
{
    use HasFactory;

    protected $table = 'houses';

    public function houseOccupants(): HasMany
    {
        return $this->hasMany(HouseOccupant::class, 'house_id');
    }
}
