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
        Schema::create('point_of_interests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->float('gps_lng');
            $table->float('gps_lat');
            $table->string('country');
            $table->string('images');
            $table->time('opens_at')->nullable();
            $table->time('closes_at')->nullable();
            $table->boolean('is_open_round_the_clock');
            $table->boolean('is_takeaway');
            $table->boolean('is_on_location');
            $table->integer('available_seats');
            $table->integer('review_count');
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
        Schema::dropIfExists('point_of_interests');
    }
};
