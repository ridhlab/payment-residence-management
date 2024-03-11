<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class HouseOccupantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // seed house
        for ($i = 1; $i <= 20; $i++) {
            DB::table('houses')->insert([
                'code' => $i >= 10 ? 'RUMAH0' . $i : 'RUMAH00' . $i,
                'is_occupied' => false,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }

        // seed occupant
        for ($i = 1; $i <= 20; $i++) {
            DB::table('occupants')->insert([
                'fullname' => $faker->name(),
                'phone' => $faker->phoneNumber(),
                'is_married' => $faker->boolean(80),
                'is_occupy' => false,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }

        // seed house occupants
        for ($i = 1; $i <= 18; $i++) {
            $occupantStatus = $i <= 15 ? 'permanent' : 'contract';
            DB::table('house_occupants')->insert([
                'is_still_occupant' => true,
                'house_id' => $i,
                'occupant_id' => $i,
                'occupant_status' => $occupantStatus,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
            DB::table('houses', 'house')->where('house.id', '=', $i)->update(['is_occupied' => true]);
            DB::table('occupants', 'occupant')->where('occupant.id', '=', $i)->update(['is_occupy' => true]);
        }

        // seed house occupant contract
        for ($i = 16; $i <= 18; $i++) {
            $month = 0;
            if ($i == 16) {
                $month = 12;
            }
            if ($i == 17) {
                $month = 6;
            }
            if ($i == 18) {
                $month = 3;
            }
            DB::table('house_occupant_contracts')->insert([
                'house_occupant_id' => $i,
                'start_date' => Carbon::now()->format('Y-m-d'),
                'end_date' => Carbon::now()->addMonth($month)->format('Y-m-d'),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }
    }
}
