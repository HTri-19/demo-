<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orders')->insert([
            'user_id' => 1,
            'address_id' => 1,
            'name' => 'Macbook pro ',
            'amount_paid' => 12000,
            'payment_status' => 'Đã thanh toán',
            // 'payment_method_id' => 1,
            'order_status' => 'pending',
            'voucher' => '123abc'
        ]);
    }
}
