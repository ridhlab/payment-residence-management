<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlyExpense extends BaseModel
{
    use HasFactory;

    static protected $table = 'monthly_expenses';
}
