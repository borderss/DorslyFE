<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return voidgit
     */
    public function up()
    {
        Schema::table('interest_points', function (Blueprint $table) {
            $table->foreignId('point_interest_image_id')->constrained('point_interest_image');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('interest_points', function (Blueprint $table) {
            $table->dropColumn('point_interest_image_id');
        });
    }
};
