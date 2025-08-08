<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Sale>
     */
    protected $model = Sale::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 5, 100);
        $tax = $subtotal * 0.1;
        $total = $subtotal + $tax;

        return [
            'customer_name' => fake()->boolean(60) ? fake()->name() : null,
            'payment_method' => fake()->randomElement(['cash', 'debit_card', 'credit_card']),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'user_id' => User::factory(),
            'notes' => fake()->boolean(30) ? fake()->sentence() : null,
        ];
    }

    /**
     * Indicate that the sale was paid with cash.
     */
    public function cash(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => 'cash',
        ]);
    }

    /**
     * Indicate that the sale was paid with card.
     */
    public function card(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => fake()->randomElement(['debit_card', 'credit_card']),
        ]);
    }

    /**
     * Indicate that the sale is for today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}