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
        Schema::table('historical_house_occupants', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
        Schema::table('house_occupants', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
        Schema::table('houses', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
        Schema::table('monthly_expenses', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
        Schema::table('monthly_fees', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
        Schema::table('occupant_payments', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
        Schema::table('occupants', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('historical_house_occupants', function (Blueprint $table) {
            $table->uuid('uid');
        });
        Schema::table('house_occupants', function (Blueprint $table) {
            $table->uuid('uid');
        });
        Schema::table('houses', function (Blueprint $table) {
            $table->uuid('uid');
        });
        Schema::table('monthly_expenses', function (Blueprint $table) {
            $table->uuid('uid');
        });
        Schema::table('monthly_fees', function (Blueprint $table) {
            $table->uuid('uid');
        });
        Schema::table('occupant_payments', function (Blueprint $table) {
            $table->uuid('uid');
        });
        Schema::table('occupants', function (Blueprint $table) {
            $table->uuid('uid');
        });
        Schema::table('payments', function (Blueprint $table) {
            $table->uuid('uid');
        });
    }
};
