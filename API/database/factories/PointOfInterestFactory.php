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
            'reservation_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'opensAt' => $this->faker->time($format = 'H:i:s', $max = 'now'),
            'isOpenRoundTheClock' => $this->faker->boolean,
            'isTakeaway' => $this->faker->boolean,
            'isOnLocation' => $this->faker->boolean,
            'availableSeats' => $this->faker->randomDigit(),
            'reviewCount' => $this->faker->randomDigit(),
        ];
    }
}
