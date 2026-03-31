<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'stock',
        'ingredients',
        'suitable_for',
        'image_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'ingredients'  => 'array',
            'suitable_for' => 'array',
            'is_active'    => 'boolean',
            'price'        => 'decimal:2',
        ];
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function allergyCases(): HasMany
    {
        return $this->hasMany(AllergyCase::class);
    }
}
