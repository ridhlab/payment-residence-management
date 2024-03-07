<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Payment extends BaseModel
{
    use HasFactory;

    protected $table = 'payments';

    public function monthlyExpense(): BelongsTo
    {
        return $this->belongsTo(MonthlyExpense::class, 'monthly_expense_id');
    }

    public function monthlyFee(): BelongsTo
    {
        return $this->belongsTo(MonthlyFee::class, 'monthly_fee_id');
    }
}
