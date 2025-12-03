<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $now = Carbon::now();
DB::table('product')->insert([
    [
        'category_id' => 2, // Asus
        'created_at'  => $now,
        'description' => 'Laptop Dell XPS 13, cấu hình mạnh, mỏng nhẹ, pin lâu.',
        'name'        => 'Laptop Dell XPS 13',
        'status'      => 'active',
        'updated_at'  => $now,
    ],
    [
        'category_id' => 3, // MacBook
        'created_at'  => $now,
        'description' => 'MacBook Air M2, siêu mỏng, hiệu năng tốt, pin trâu.',
        'name'        => 'MacBook Air M2',
        'status'      => 'active',
        'updated_at'  => $now,
    ],
]);
    }
}
