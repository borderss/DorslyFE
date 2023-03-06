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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone_number');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->float('gps_lng',10, 7)->nullable();
            $table->float('gps_lat',10, 7)->nullable();
            $table->boolean('is_admin')->default(false);
            $table->boolean('is_promotion_emails_allowed')->default(false);
            $table->boolean('is_security_notices_allowed')->default(true);
            $table->boolean('is_reservation_info_allowed')->default(true);
            $table->boolean('is_cookies_allowed')->default(false);
            $table->softDeletes();
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
        Schema::dropIfExists('users');
    }
};
