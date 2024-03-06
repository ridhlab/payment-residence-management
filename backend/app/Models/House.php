<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class House extends Model
{
    use HasFactory;

    static protected $table = 'houses';

    public function houseOccupants(): HasMany
    {
        return $this->hasMany(HouseOccupant::class, 'house_id');
    }
}
