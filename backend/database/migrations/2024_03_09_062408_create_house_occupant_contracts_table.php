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
        Schema::create('house_occupant_contracts', function (Blueprint $table) {
            $table->id();
            $table->date('start_date')->nullable(false);
            $table->date('end_date')->nullable(false);
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
        Schema::dropIfExists('house_occupant_contracts');
    }
};
