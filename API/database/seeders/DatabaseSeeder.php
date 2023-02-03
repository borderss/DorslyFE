<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Comment;
use App\Models\Deal;
use App\Models\PointOfInterest;
use App\Models\PrePurchase;
use App\Models\Product;
use App\Models\Rating;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use mysql_xdevapi\Warning;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'user1',
            'last_name' => 'surname1',
            'phone_number' => '+371 22022479',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('password1'),
            'gps_lng' => 34.1976253,
            'gps_lat' => 21.7612640,
            'is_admin' => true,
            'is_cookies_allowed' => true,
            'is_email_allowed' => true,
        ]);

        User::create([
            'first_name' => 'user2',
            'last_name' => 'surname2',
            'phone_number' => '+371 22022480',
            'email' => 'user2@gmail.com',
            'password' => Hash::make('password2'),
            'gps_lng' => 122.87652482,
            'gps_lat' => 84.17625489,
            'is_admin' => false,
            'is_cookies_allowed' => true,
            'is_email_allowed' => true,
        ]);

         User::factory(33)->create();
         PointOfInterest::factory(70)->create();
         Product::factory(550)->create();
         Rating::factory(1450)->create();
         Comment::factory(120)->create();

         Reservation::factory(69)->create();
         PrePurchase::factory(69)->create();
         Deal::factory(69)->create();

        PointOfInterest::all()->map(function ($point){
            $count = Comment::where('point_of_interest_id', $point->id)->count();

            $point->update(['review_count' => $count]);

            return $point;
        });
    }
}
