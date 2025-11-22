<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('address_id');
    $table->string('name', 100);
    $table->decimal('amount_paid', 10, 2);
    $table->string('payment_status')->nullable();
    $table->unsignedBigInteger('payment_method_id')->nullable();
    $table->enum('order_status', ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])->default('pending');
    $table->string('voucher', 50)->nullable();
    $table->timestamps();

    // Foreign keys
    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    $table->foreign('address_id')->references('id')->on('addresses')->onDelete('cascade');
    $table->foreign('payment_method_id')->references('id')->on('payments')->onDelete('set null');

    // Indexes (tùy chọn - để tăng tốc độ query)
    $table->index('user_id');
    $table->index('address_id');
    $table->index('order_status');
});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
