<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [
            'user_id'=>$this->faker->numberBetween($min = 1, $max = 69),
            'point_of_interest_id'=>$this->faker->numberBetween($min = 1, $max = 69),
            'reservation_id'=>$this->faker->numberBetween($min = 1, $max = 69),
            'pre_purchase_id'=>null,
            'status'=>$this->faker->randomElement(['accepted', 'canceled', 'failed']),
        ];
    }
}
