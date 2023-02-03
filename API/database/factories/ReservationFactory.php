<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'point_of_interest_id'=>$this->faker->numberBetween($min = 1, $max = 69),
            'date'=>$this->faker->dateTime(),
            'number_of_people'=>$this->faker->numberBetween($min = 1, $max = 15),
        ];
    }
}
