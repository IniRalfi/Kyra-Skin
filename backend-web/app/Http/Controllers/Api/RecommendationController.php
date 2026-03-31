<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RecommendationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user    = $request->user()->load('profile', 'allergyCases');
        $profile = $user->profile;

        if (! $profile) {
            return response()->json([
                'message' => 'Lengkapi profil kulitmu dulu untuk mendapat rekomendasi.',
            ], 422);
        }

        // Kumpulkan ingredients yang sudah terbukti bikin alergi user ini
        $blacklistedIngredients = $user->allergyCases
            ->pluck('suspected_ingredients')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        try {
            // Panggil FastAPI AI Engine
            $aiResponse = Http::timeout(10)->post(
                config('services.ai.url') . '/recommend',
                [
                    'user_id'   => $user->id,
                    'age'       => $profile->age,
                    'gender'    => $profile->gender,
                    'skin_type' => $profile->skin_type,
                ]
            );

            $recommendedIds = $aiResponse->json('recommended_product_ids', []);

            $products = Product::whereIn('id', $recommendedIds)
                ->where('is_active', true)
                ->get();
        } catch (\Exception $e) {
            // Fallback: kalau FastAPI mati, pakai filter skin_type biasa
            $products = Product::where('is_active', true)
                ->whereJsonContains('suitable_for', $profile->skin_type)
                ->get();
        }

        // Filter produk yang mengandung ingredients penyebab alergi
        if (! empty($blacklistedIngredients)) {
            $products = $products->filter(function ($product) use ($blacklistedIngredients) {
                return empty(array_intersect($product->ingredients, $blacklistedIngredients));
            })->values();
        }

        return response()->json([
            'profile'  => $profile,
            'products' => $products,
        ]);
    }
}
