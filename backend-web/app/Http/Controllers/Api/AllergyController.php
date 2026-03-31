<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AllergyController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_id'      => 'required|exists:products,id',
            'reaction_details' => 'required|string|max:1000',
        ]);

        $product = Product::findOrFail($data['product_id']);

        // Otomatis ambil semua ingredients dari produk sebagai kandidat penyebab
        $allergyCase = $request->user()->allergyCases()->create([
            'product_id'             => $product->id,
            'reaction_details'       => $data['reaction_details'],
            'suspected_ingredients'  => $product->ingredients,
            'status'                 => 'pending',
        ]);

        return response()->json([
            'message'      => 'Laporan alergi berhasil dikirim. Tim kami akan menindaklanjuti.',
            'allergy_case' => $allergyCase->load('product'),
        ], 201);
    }
}
