<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PointOfInterest>
 */
class PointOfInterestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return[
            'name' => $this->faker->name(),
            'description' => $this->faker->text($maxNbChars = 200),
            'gps_lng' => $this->faker->longitude($min = -180, $max = 180),
            'gps_lat' => $this->faker->latitude($min = -90, $max = 90),
            'country' => $this->faker->country(),
            'images' => $this->faker->imageUrl(1920, 1080, 'food'),
            'opens_at' => $this->faker->time($format = 'H:i:s', $max = 'now'),
            'closes_at' => $this->faker->time($format = 'H:i:s', $max = 'now'),
            'is_open_round_the_clock' => $this->faker->boolean,
            'is_takeaway' => $this->faker->boolean,
            'is_on_location' => $this->faker->boolean,
            'available_seats' => $this->faker->randomDigit(),
            'review_count' => 0,
        ];
    }
}
