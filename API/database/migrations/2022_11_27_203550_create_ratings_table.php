<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade')->constrained();
            $table->foreignId('point_of_interest_id')->constrained();
            $table->integer('rating');
            $table->timestamps();
        });

        DB::statement('
            ALTER TABLE ratings
            ADD CONSTRAINT ratings_rating_check CHECK (rating >= 1 AND rating <= 10)
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ratings');
    }
};
