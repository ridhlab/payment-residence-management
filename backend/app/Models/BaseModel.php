<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uid = Str::uuid()->toString();
        });
    }
}
