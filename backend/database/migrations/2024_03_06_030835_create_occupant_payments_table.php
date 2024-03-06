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
        Schema::create('occupant_payments', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->nullable(false);
            $table->unsignedBigInteger('house_occupant_id')->nullable(false);
            $table->dateTime('payment_date')->nullable(false);
            $table->timestamps();

            $table->foreign('house_occupant_id')->on('house_occupants')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('occupant_payments');
    }
};
