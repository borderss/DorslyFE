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
        Schema::create('pre_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('point_of_interest_id')->constrained();
            $table->json('products');
            $table->decimal('total_price', 8, 2)->default(0.00);
            $table->string('status')->default("inactive");
            $table->string('payment_status')->default("inactive");
            $table->string('payment_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pre_purchases');
    }
};
