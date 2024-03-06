<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class HouseOccupant extends Model
{
    use HasFactory;

    static protected $table = 'house_occupants';

    public function house(): BelongsTo
    {
        return $this->belongsTo(House::class, 'house_id');
    }

    public function occupant(): BelongsTo
    {
        return $this->belongsTo(Occupant::class, 'occupant_id');
    }

    public function historicalHouseOccupant(): HasOne
    {
        return $this->hasOne(HistoricalHouseOccupant::class, 'house_occupant_id');
    }
}
