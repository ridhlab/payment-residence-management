<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlyExpense extends BaseModel
{
    use HasFactory;

    protected $casts = [
        'is_paid_monthly' => 'boolean'
    ];

    protected $table = 'monthly_expenses';
}
