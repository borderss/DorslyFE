<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
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
            'point_of_interest_id' => $this->faker->numberBetween($min = 1, $max = 69),
            'ingredients'=> $this->faker->text($maxNbChars = 100),
            'image' => $this->faker->imageUrl(1920, 1080, 'food'),
            'price' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 20),
        ];
    }
}
