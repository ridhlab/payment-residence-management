<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OccupantPayment extends Model
{
    use HasFactory;

    static protected $table = 'occupant_payments';

    public function houseOccupant(): BelongsTo
    {
        return $this->belongsTo(HouseOccupant::class, 'house_occupant_id');
    }
}
