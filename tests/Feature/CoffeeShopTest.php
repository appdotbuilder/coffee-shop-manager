<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CoffeeShopTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('welcome'));
    }

    public function test_authenticated_user_can_view_dashboard(): void
    {
        $user = User::factory()->create(['role' => 'owner']);

        $response = $this->actingAs($user)->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('todayStats')
                ->has('monthlyStats')
        );
    }

    public function test_user_can_view_products(): void
    {
        $user = User::factory()->create();
        Product::factory()->count(5)->create();

        $response = $this->actingAs($user)->get('/products');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('products/index')
                ->has('products.data', 5)
        );
    }

    public function test_user_can_view_sales(): void
    {
        $user = User::factory()->create();
        Sale::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/sales');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('sales/index')
                ->has('sales.data', 3)
        );
    }

    public function test_user_can_create_sale(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create([
            'price' => 5.00,
            'stock_quantity' => 100
        ]);

        $saleData = [
            'customer_name' => 'John Doe',
            'payment_method' => 'cash',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 2,
                    'unit_price' => 5.00
                ]
            ],
            'notes' => 'Test sale'
        ];

        $response = $this->actingAs($user)->post('/sales', $saleData);

        $response->assertRedirect('/sales');
        $this->assertDatabaseHas('sales', [
            'customer_name' => 'John Doe',
            'payment_method' => 'cash',
            'user_id' => $user->id
        ]);
    }

    public function test_product_stock_decreases_after_sale(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create([
            'price' => 5.00,
            'stock_quantity' => 100
        ]);

        $saleData = [
            'customer_name' => '',
            'payment_method' => 'cash',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 3,
                    'unit_price' => 5.00
                ]
            ],
            'notes' => ''
        ];

        $this->actingAs($user)->post('/sales', $saleData);

        $product->refresh();
        $this->assertEquals(97, $product->stock_quantity);
    }

    public function test_role_based_access(): void
    {
        $owner = User::factory()->create(['role' => 'owner']);
        $manager = User::factory()->create(['role' => 'cafe_manager']);
        $cashier = User::factory()->create(['role' => 'cashier']);

        $this->assertTrue($owner->isOwner());
        $this->assertTrue($manager->isManager());
        $this->assertTrue($cashier->isCashier());

        $this->assertTrue($owner->hasManagerAccess());
        $this->assertTrue($manager->hasManagerAccess());
        $this->assertFalse($cashier->hasManagerAccess());
    }
}