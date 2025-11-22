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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->string('sku', 100)->unique();
            $table->string('model_name', 100);
            $table->decimal('price', 10, 2);
            $table->integer('quantity');
            $table->unsignedBigInteger('ram_id')->nullable();
            $table->unsignedBigInteger('storage_id')->nullable();
            $table->integer('stock')->nullable();
            $table->integer('warranty_months')->nullable();
            $table->timestamp('created_at')->useCurrent();

            // Foreign keys
            $table->foreign('product_id')->references('id')->on('product')->onDelete('cascade');
            $table->foreign('ram_id')->references('id')->on('rams')->onDelete('set null');
            $table->foreign('storage_id')->references('id')->on('storages')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_variants');
    }
};
