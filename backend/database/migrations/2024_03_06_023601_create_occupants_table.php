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
        Schema::create('occupants', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->nullable(false);
            $table->string('fullname')->nullable(false);
            $table->string('identity_card_url')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('is_married')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('occupants');
    }
};
