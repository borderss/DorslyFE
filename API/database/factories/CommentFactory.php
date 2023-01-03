<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id'=> $this->faker->numberBetween($min = 1, $max = 17),
            'point_of_interest_id' => $this->faker->numberBetween($min = 1, $max = 69),
            'text' => $this->faker->text($maxNbChars = 200),
        ];
    }
}
