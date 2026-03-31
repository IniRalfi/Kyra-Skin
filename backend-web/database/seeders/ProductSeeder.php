<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'        => 'Somethinc Niacinamide + Moisture Beet Toner',
                'description' => 'Toner niacinamide yang membantu mengecilkan pori dan mencerahkan kulit berminyak secara bertahap.',
                'category'    => 'Toner',
                'price'       => 89000,
                'stock'       => 100,
                'ingredients' => ['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid', 'Betaine', 'Panthenol'],
                'suitable_for' => [2, 4], // Berminyak, Kombinasi
            ],
            [
                'name'        => 'COSRX Low pH Good Morning Cleanser',
                'description' => 'Facial wash pH rendah dengan salicylic acid yang membersihkan pori tanpa mengiritasi kulit.',
                'category'    => 'Cleanser',
                'price'       => 135000,
                'stock'       => 80,
                'ingredients' => ['Salicylic Acid', 'Betaine', 'Glycerin', 'Cocamidopropyl Betaine', 'Tea Tree Oil'],
                'suitable_for' => [2, 3, 4], // Berminyak, Sensitif, Kombinasi
            ],
            [
                'name'        => 'Skintific 5x Ceramide Barrier Serum',
                'description' => 'Serum ceramide yang memperkuat skin barrier dan cocok untuk kulit kering dan sensitif.',
                'category'    => 'Serum',
                'price'       => 149000,
                'stock'       => 75,
                'ingredients' => ['Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Cholesterol', 'Hyaluronic Acid', 'Panthenol'],
                'suitable_for' => [1, 3], // Kering, Sensitif
            ],
            [
                'name'        => 'Wardah Hydrating Aloe Vera Serum',
                'description' => 'Serum berbasis aloe vera yang memberikan kelembapan intensif untuk kulit normal dan kering.',
                'category'    => 'Serum',
                'price'       => 65000,
                'stock'       => 120,
                'ingredients' => ['Aloe Barbadensis Leaf Juice', 'Glycerin', 'Hyaluronic Acid', 'Vitamin E', 'Allantoin'],
                'suitable_for' => [1, 5], // Kering, Normal
            ],
            [
                'name'        => 'Biore UV Aqua Rich Watery Essence SPF50+',
                'description' => 'Sunscreen ringan bertekstur air dengan SPF50+ PA++++. Tidak lengket dan cocok untuk semua jenis kulit.',
                'category'    => 'Sunscreen',
                'price'       => 125000,
                'stock'       => 150,
                'ingredients' => ['Uvinul A Plus', 'Uvinul T 150', 'Tinosorb S', 'Glycerin', 'Hyaluronic Acid'],
                'suitable_for' => [1, 2, 4, 5], // Kering, Berminyak, Kombinasi, Normal
            ],
            [
                'name'        => 'Azarine Hydrasoothe Sunscreen Gel SPF45',
                'description' => 'Sunscreen gel yang sangat ramah untuk kulit sensitif, bebas parfum, dan tidak menyumbat pori.',
                'category'    => 'Sunscreen',
                'price'       => 55000,
                'stock'       => 130,
                'ingredients' => ['Zinc Oxide', 'Centella Asiatica', 'Allantoin', 'Glycerin', 'Niacinamide'],
                'suitable_for' => [3, 4, 5], // Sensitif, Kombinasi, Normal
            ],
            [
                'name'        => 'Emina Bright Stuff Moisturizing Cream',
                'description' => 'Pelembap ringan dengan kandungan vitamin C dan niacinamide yang mencerahkan kulit secara alami.',
                'category'    => 'Moisturizer',
                'price'       => 42000,
                'stock'       => 200,
                'ingredients' => ['Niacinamide', 'Vitamin C', 'Glycerin', 'Shea Butter', 'Allantoin'],
                'suitable_for' => [5, 1, 4], // Normal, Kering, Kombinasi
            ],
            [
                'name'        => 'Avoskin Miraculous Retinol Ampoule',
                'description' => 'Serum retinol yang membantu mempercepat regenerasi kulit dan memudarkan tanda-tanda penuaan.',
                'category'    => 'Serum',
                'price'       => 178000,
                'stock'       => 60,
                'ingredients' => ['Retinol', 'Bakuchiol', 'Squalane', 'Vitamin E', 'Hyaluronic Acid'],
                'suitable_for' => [5, 4], // Normal, Kombinasi
            ],
            [
                'name'        => 'Dear Me Beauty Mugwort Pore Clay Mask',
                'description' => 'Clay mask dengan ekstrak mugwort yang efektif membersihkan pori dan mengontrol minyak berlebih.',
                'category'    => 'Mask',
                'price'       => 98000,
                'stock'       => 90,
                'ingredients' => ['Kaolin', 'Bentonite', 'Artemisia Vulgaris Extract', 'Salicylic Acid', 'Tea Tree Oil'],
                'suitable_for' => [2, 4], // Berminyak, Kombinasi
            ],
            [
                'name'        => 'The Ordinary Natural Moisturizing Factors + HA',
                'description' => 'Pelembap dasar yang memulihkan kelembapan alami kulit dengan formula minimalis dan harga terjangkau.',
                'category'    => 'Moisturizer',
                'price'       => 210000,
                'stock'       => 85,
                'ingredients' => ['Hyaluronic Acid', 'Amino Acids', 'Ceramide 2', 'Glycerin', 'Urea'],
                'suitable_for' => [1, 3, 5], // Kering, Sensitif, Normal
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        $this->command->info('✅ 10 produk skincare berhasil di-seed!');
    }
}
