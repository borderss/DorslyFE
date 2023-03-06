<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'phone_number' => $this->faker->e164PhoneNumber,
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make($this->faker->password),
            'gps_lng' => $this->faker->randomFloat(7, -180, 180),
            'gps_lat' => $this->faker->randomFloat(7, -90, 90),
            'is_admin' => $this->faker->boolean($chanceOfGettingTrue = 0),
            'is_promotion_emails_allowed' => true,
            'is_security_notices_allowed' => true,
            'is_reservation_info_allowed' => true,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
