<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PrePurchase>
 */
class PrePurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $product_count = $this->faker->numberBetween($min = 1, $max = 8);

        $random_point_of_interest_id = $this->faker->numberBetween($min = 1, $max = 69);

        $productData = Product::where('point_of_interest_id', $random_point_of_interest_id)->get();

        $products = [];

        for ($i = 0; $i < $product_count; $i++) {
            $random_product = $productData->random();
            if (in_array($random_product->id, array_column($products, 'id'))) {
                continue;
            }
            $products[] = [
                'id' => $random_product->id,
                'quantity' => $this->faker->numberBetween($min = 1, $max = 10),
            ];
        }


        $status = $this->faker->randomElement(['pending', 'accepted', 'rejected']);

        if ($status === 'rejected') {
            $payment_status = 'payment_failed';
        } else if ($status === 'accepted') {
            $payment_status = 'succeeded';
            $payment_id = $this->faker->uuid;
        } else {
            $payment_status = $this->faker->randomElement(['processing', 'amount_capturable_updated']);
        }

        return [
            'point_of_interest_id'=>$this->faker->numberBetween($min = 1, $max = 69),
            'products'=> json_encode($products),
            'status'=>$status,
            'payment_status'=> $payment_status,
            'payment_id'=> $payment_id ?? null,
        ];
    }
}
