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
        Schema::create('historical_house_occupants', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->nullable(false);
            $table->dateTime('start_date')->nullable(false);
            $table->dateTime('end_date')->nullable();
            $table->unsignedBigInteger('house_occupant_id')->nullable(false);
            $table->timestamps();

            $table->foreign('house_occupant_id')->on('house_occupants')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historical_house_occupants');
    }
};
