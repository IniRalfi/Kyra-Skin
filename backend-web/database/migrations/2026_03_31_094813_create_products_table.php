<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('category'); // Toner, Serum, Moisturizer, dll.
            $table->decimal('price', 12, 2);
            $table->integer('stock')->default(0);
            $table->json('ingredients');        // Array kandungan kimia
            $table->json('suitable_for')->nullable(); // Array skin_type yang cocok [1,2,3]
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
