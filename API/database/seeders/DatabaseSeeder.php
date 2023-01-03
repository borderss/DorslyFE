<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Comment;
use App\Models\PointOfInterest;
use App\Models\Product;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(33)->create();
         PointOfInterest::factory(70)->create();
         Product::factory(50)->create();
         Rating::factory(20)->create();
         Comment::factory(30)->create();

         User::create([
             'first_name' => 'user1',
             'last_name' => 'surname1',
             'phone_number' => '+371 22022479',
             'email' => 'user1@gmail.com',
             'password' => Hash::make('password1'),
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
            'is_admin' => false,
            'is_cookies_allowed' => true,
            'is_email_allowed' => true,
        ]);
    }
}
