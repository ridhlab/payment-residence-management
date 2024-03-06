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
        Schema::table('occupants', function (Blueprint $table) {
            $table->renameColumn('identity_card_url', 'identity_card_filename');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('occupants', function (Blueprint $table) {

            $table->renameColumn('identity_card_filename', 'identity_card_url');
        });
    }
};
