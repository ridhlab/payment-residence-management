<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class HouseOccupant extends BaseModel
{
    use HasFactory;

    protected $table = 'house_occupants';
    protected $casts = [
        'is_still_occupant' => 'boolean'
    ];

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

    public function occupantPayments(): HasMany
    {
        return $this->hasMany(OccupantPayment::class, 'house_occupant_id');
    }
}
