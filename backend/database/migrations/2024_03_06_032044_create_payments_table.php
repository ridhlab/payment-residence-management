<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->nullable(false);
            $table->enum('type', ['fee', 'expense'])->nullable(false);
            $table->unsignedBigInteger('monthly_expense_id')->nullable();
            $table->unsignedBigInteger('monthly_fee_id')->nullable();
            $table->unsignedBigInteger('occupant_payment_id')->nullable(false);

            $table->timestamps();

            $table->foreign('monthly_expense_id')->on('monthly_expenses')->references('id');
            $table->foreign('monthly_fee_id')->on('monthly_fees')->references('id');
            $table->foreign('occupant_payment_id')->on('occupant_payments')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
