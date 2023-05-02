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
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use mysql_xdevapi\Warning;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'access admin panel',
            'administrate users',
            'administrate responses',
            'administrate deals',
            'administrate points_of_interest',
            'administrate products',
            'administrate title_photos',
            'administrate deals',
            'manage business staff',
            'manage business deals',
            'manage business points_of_interest',
            'manage business products',
            'manage business title_photos',
            'manage business deals',
            'get business statistics',
            'manage own responses',
            'manage own deals',
            'update own settings',
            'delete own account',
            'view responses',
            'check reservation availability',
            'get todays deals',
            'get popular choices',
            'get ip',
            'send mail',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $business_manager = Role::create(['name' => 'business_manager']);
        $business_staff = Role::create(['name' => 'business_staff']);
        $administrator = Role::create(['name' => 'administrator']);
        $user = Role::create(['name' => 'user']);

        $administrator->givePermissionTo(Permission::all());
        $user->givePermissionTo([
            'manage own responses',
            'manage own deals',
            'update own settings',
            'delete own account',
            'get own statistics',
            'view responses',
            'check reservation availability',
            'get todays deals',
            'get popular choices',
            'get ip',
        ]);
        $business_manager->givePermissionTo([
            'manage business staff',
            'manage business deals',
            'manage business points_of_interest',
            'manage business products',
            'manage business title_photos',
            'manage business deals',
            'get business statistics',
            'manage own responses',
            'manage own deals',
            'update own settings',
            'delete own account',
            'get own statistics',
            'view responses',
            'check reservation availability',
            'get todays deals',
            'get popular choices',
            'get ip',
            'send mail',
        ]);
        $business_staff->givePermissionTo([
            'manage business deals',
        ]);

        User::create([
            'first_name' => 'admin1',
            'last_name' => 'surname1',
            'phone_number' => '+371 22022479',
            'email' => 'admin1@gmail.com',
            'password' => Hash::make(Config::get('app.admin_password')),
            'gps_lng' => 34.1976253,
            'gps_lat' => 21.7612640,
            'is_admin' => true,
            'is_promotion_emails_allowed' => true,
            'is_security_notices_allowed' => true,
            'is_reservation_info_allowed' => true,
        ])->assignRole('administrator');
        User::create([
            'first_name' => 'user1',
            'last_name' => 'surname1',
            'phone_number' => '+371 22022480',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('password1'),
            'gps_lng' => 122.87652482,
            'gps_lat' => 84.17625489,
            'is_admin' => false,
            'is_promotion_emails_allowed' => true,
            'is_security_notices_allowed' => true,
            'is_reservation_info_allowed' => true,
        ])->assignRole('user');
        User::create([
            'first_name' => 'manager1',
            'last_name' => 'surname2',
            'phone_number' => '+371 22022480',
            'email' => 'manager1@gmail.com',
            'password' => Hash::make('password1'),
            'gps_lng' => 122.87652482,
            'gps_lat' => 84.17625489,
            'is_admin' => false,
            'is_promotion_emails_allowed' => true,
            'is_security_notices_allowed' => true,
            'is_reservation_info_allowed' => true,
        ])->assignRole('business_manager');
        User::create([
            'first_name' => 'staff1',
            'last_name' => 'surname2',
            'phone_number' => '+371 22022480',
            'email' => 'staff1@gmail.com',
            'password' => Hash::make('password1'),
            'gps_lng' => 122.87652482,
            'gps_lat' => 84.17625489,
            'is_admin' => false,
            'is_promotion_emails_allowed' => true,
            'is_security_notices_allowed' => true,
            'is_reservation_info_allowed' => true,
        ])->assignRole('business_staff');


        User::factory(133)->create();
        PointOfInterest::factory(150)->create();
        Product::factory(550)->create();
        Rating::factory(1450)->create();
        Comment::factory(120)->create();
        Reservation::factory(69)->create();
        Deal::factory(69)->create();

        PointOfInterest::all()->map(function ($point){
            $count = Comment::where('point_of_interest_id', $point->id)->count();

            $point->update(['review_count' => $count]);

            return $point;
        });
    }
}
