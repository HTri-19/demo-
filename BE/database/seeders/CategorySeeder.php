<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $now = Carbon::now();

        // Category cha Laptop
        DB::table('categories')->insert([
            [
                'name' => 'Laptop',
                'parent_id' => null,
                'image' => 'laptop.jpg',
                'description' => 'Các loại laptop',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ]);

        // Lấy id của Laptop để tạo category con
        $laptopId = DB::table('categories')->where('name', 'Laptop')->first()->id;

        // Category con: Asus và MacBook
        DB::table('categories')->insert([
            [
                'name' => 'Asus',
                'parent_id' => $laptopId,
                'image' => 'asus.jpg',
                'description' => 'Laptop thương hiệu Asus',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'MacBook',
                'parent_id' => $laptopId,
                'image' => 'macbook.jpg',
                'description' => 'Laptop thương hiệu MacBook',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ]);
    }
}
