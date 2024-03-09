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
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['monthly_expense_id']);
            $table->dropColumn('monthly_expense_id');
        });
        Schema::dropIfExists('monthly_expenses');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('monthly_expenses', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->nullable(false);
            $table->string('name')->nullable(false);
            $table->integer('fee')->nullable(false);
            $table->boolean('is_paid_monthly')->nullable(false);
            $table->timestamps();
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->unsignedBigInteger('monthly_expense_id');
            $table->foreign('monthly_expense_id')->on('monthly_expenses')->references('id');
        });
    }
};
