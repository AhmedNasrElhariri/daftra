<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $categories = ['T-Shirt', 'Jeans', 'Jacket', 'Dress', 'Sweater', 'Shorts', 'Hoodie'];
        $names = [
            'Classic White Tee',
            'Slim Fit Jeans',
            'Denim Jacket',
            'Summer Dress',
            'Winter Sweater',
            'Cotton Shorts',
            'Casual Hoodie',
            'Flannel Shirt',
            'Leather Jacket',
            'Athletic Shorts',
            'Graphic Tee',
            'Button-Up Shirt',
            'Polo Shirt',
            'Maxi Dress',
            'Cardigan',
            'Cargo Pants',
            'Track Pants',
            'Sports Bra',
            'Tank Top',
            'Raincoat'
        ];

        foreach ($names as $name) {
            Product::create([
                'name' => $name,
                'category' => $categories[array_rand($categories)],
                'price' => rand(1000, 5000) / 100, // 10.00 – 50.00
                'stock' => rand(5, 50),
                'description' => Str::random(50),
            ]);
        }
    }
}
