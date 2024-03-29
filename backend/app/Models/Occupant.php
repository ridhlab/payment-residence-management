<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Occupant extends BaseModel
{
    use HasFactory;

    protected $table = 'occupants';

    protected $hidden = ['identity_card_filename'];

    protected $casts = [
        'is_married' => 'boolean',
        'is_occupy' => 'boolean'
    ];

    public function houseOccupants(): HasMany
    {
        return $this->hasMany(HouseOccupant::class, 'occupant_id');
    }
}
