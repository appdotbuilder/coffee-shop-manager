<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;

class CoffeeShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create users with different roles
        User::create([
            'name' => 'John Owner',
            'email' => 'owner@coffeeshop.com',
            'password' => bcrypt('password'),
            'role' => 'owner',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Sarah Manager',
            'email' => 'manager@coffeeshop.com',
            'password' => bcrypt('password'),
            'role' => 'cafe_manager',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Mike Cashier',
            'email' => 'cashier@coffeeshop.com',
            'password' => bcrypt('password'),
            'role' => 'cashier',
            'email_verified_at' => now(),
        ]);

        // Create suppliers
        Supplier::create([
            'name' => 'Premium Coffee Beans Co.',
            'contact_person' => 'Alice Johnson',
            'phone' => '555-0123',
            'email' => 'orders@premiumcoffee.com',
            'address' => '123 Coffee Street, Bean City, BC 12345',
        ]);

        Supplier::create([
            'name' => 'Fresh Dairy Supplies',
            'contact_person' => 'Bob Wilson',
            'phone' => '555-0456',
            'email' => 'sales@freshdairy.com',
            'address' => '456 Milk Avenue, Dairy Town, DT 67890',
        ]);

        Supplier::create([
            'name' => 'Sweet Treats Bakery',
            'contact_person' => 'Carol Smith',
            'phone' => '555-0789',
            'email' => 'wholesale@sweettreats.com',
            'address' => '789 Pastry Lane, Bakery City, BK 54321',
        ]);

        // Create products
        $products = [
            // Coffee Drinks
            [
                'name' => 'Espresso',
                'description' => 'Rich, strong coffee shot',
                'category' => 'Coffee',
                'price' => 2.50,
                'stock_quantity' => 100,
                'unit' => 'cup',
            ],
            [
                'name' => 'Americano',
                'description' => 'Espresso with hot water',
                'category' => 'Coffee',
                'price' => 3.00,
                'stock_quantity' => 100,
                'unit' => 'cup',
            ],
            [
                'name' => 'Cappuccino',
                'description' => 'Espresso with steamed milk and foam',
                'category' => 'Coffee',
                'price' => 4.50,
                'stock_quantity' => 75,
                'unit' => 'cup',
            ],
            [
                'name' => 'Latte',
                'description' => 'Espresso with steamed milk',
                'category' => 'Coffee',
                'price' => 5.00,
                'stock_quantity' => 80,
                'unit' => 'cup',
            ],
            [
                'name' => 'Mocha',
                'description' => 'Chocolate coffee with steamed milk',
                'category' => 'Coffee',
                'price' => 5.50,
                'stock_quantity' => 60,
                'unit' => 'cup',
            ],
            [
                'name' => 'Macchiato',
                'description' => 'Espresso with a dollop of foamed milk',
                'category' => 'Coffee',
                'price' => 4.75,
                'stock_quantity' => 50,
                'unit' => 'cup',
            ],

            // Cold Drinks
            [
                'name' => 'Iced Coffee',
                'description' => 'Cold brew coffee over ice',
                'category' => 'Cold Drinks',
                'price' => 3.50,
                'stock_quantity' => 90,
                'unit' => 'cup',
            ],
            [
                'name' => 'Iced Latte',
                'description' => 'Espresso with cold milk over ice',
                'category' => 'Cold Drinks',
                'price' => 5.25,
                'stock_quantity' => 70,
                'unit' => 'cup',
            ],
            [
                'name' => 'Frappuccino',
                'description' => 'Blended coffee with ice and milk',
                'category' => 'Cold Drinks',
                'price' => 6.00,
                'stock_quantity' => 45,
                'unit' => 'cup',
            ],

            // Tea & Other Drinks
            [
                'name' => 'Green Tea',
                'description' => 'Premium green tea',
                'category' => 'Tea',
                'price' => 2.75,
                'stock_quantity' => 40,
                'unit' => 'cup',
            ],
            [
                'name' => 'Chai Latte',
                'description' => 'Spiced tea with steamed milk',
                'category' => 'Tea',
                'price' => 4.25,
                'stock_quantity' => 35,
                'unit' => 'cup',
            ],
            [
                'name' => 'Hot Chocolate',
                'description' => 'Rich chocolate drink with whipped cream',
                'category' => 'Hot Drinks',
                'price' => 3.75,
                'stock_quantity' => 55,
                'unit' => 'cup',
            ],

            // Food Items
            [
                'name' => 'Croissant',
                'description' => 'Buttery, flaky pastry',
                'category' => 'Pastry',
                'price' => 3.25,
                'stock_quantity' => 25,
                'unit' => 'piece',
            ],
            [
                'name' => 'Blueberry Muffin',
                'description' => 'Fresh baked muffin with blueberries',
                'category' => 'Pastry',
                'price' => 2.75,
                'stock_quantity' => 20,
                'unit' => 'piece',
            ],
            [
                'name' => 'Chocolate Chip Cookie',
                'description' => 'Homemade chocolate chip cookie',
                'category' => 'Pastry',
                'price' => 2.25,
                'stock_quantity' => 30,
                'unit' => 'piece',
            ],
            [
                'name' => 'Bagel with Cream Cheese',
                'description' => 'Fresh bagel served with cream cheese',
                'category' => 'Food',
                'price' => 4.50,
                'stock_quantity' => 15,
                'unit' => 'piece',
            ],
            [
                'name' => 'Avocado Toast',
                'description' => 'Toasted bread with fresh avocado',
                'category' => 'Food',
                'price' => 7.50,
                'stock_quantity' => 12,
                'unit' => 'piece',
            ],
            [
                'name' => 'Breakfast Sandwich',
                'description' => 'Egg, cheese, and bacon on English muffin',
                'category' => 'Food',
                'price' => 6.75,
                'stock_quantity' => 8,
                'unit' => 'piece',
            ],

            // Low stock items for demonstration
            [
                'name' => 'Premium Dark Roast',
                'description' => 'Artisan dark roast coffee beans',
                'category' => 'Coffee',
                'price' => 5.75,
                'stock_quantity' => 3,
                'unit' => 'cup',
            ],
            [
                'name' => 'Organic Matcha Latte',
                'description' => 'Organic matcha powder with steamed milk',
                'category' => 'Tea',
                'price' => 5.50,
                'stock_quantity' => 5,
                'unit' => 'cup',
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}