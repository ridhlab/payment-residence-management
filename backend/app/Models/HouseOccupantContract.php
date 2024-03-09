<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HouseOccupantContract extends BaseModel
{
    use HasFactory;

    protected $table = 'house_occupant_contracts';

    public function houseOccupant(): BelongsTo
    {
        return $this->belongsTo(HouseOccupant::class, 'house_occupant_id');
    }
}
