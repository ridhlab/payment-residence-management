<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class HistoricalHouseOccupant extends Model
{
    use HasFactory;

    static protected $table = 'historical_house_occupants';

    public function houseOccupant(): BelongsTo
    {
        return $this->belongsTo(HouseOccupant::class, 'house_occupant_id');
    }
}
