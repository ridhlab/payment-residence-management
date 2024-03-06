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
        Schema::create('house_occupants', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->nullable(false);
            $table->enum('occupant_status', ['contract', 'permanent'])->nullable(false);
            $table->boolean('is_still_occupant')->nullable(false);
            $table->unsignedBigInteger('house_id')->nullable(false);
            $table->unsignedBigInteger('occupant_id')->nullable(false);
            $table->timestamps();


            $table->foreign('house_id')->on('houses')->references('id');
            $table->foreign('occupant_id')->on('occupants')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('house_occupants');
    }
};
