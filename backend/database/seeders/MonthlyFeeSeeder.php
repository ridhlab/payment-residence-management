<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MonthlyFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('monthly_fees')->insert([
            [
                'name' => 'Satpam',
                'fee' => 100000
            ], [
                'name' => 'Kebersihan',
                'fee' => 15000
            ]
        ]);
    }
}
