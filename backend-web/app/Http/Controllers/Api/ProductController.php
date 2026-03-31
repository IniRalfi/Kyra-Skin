<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::where('is_active', true);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by skin_type (JSON contains)
        if ($request->filled('skin_type')) {
            $query->whereJsonContains('suitable_for', (int) $request->skin_type);
        }

        return response()->json($query->orderBy('name')->paginate(12));
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Product::findOrFail($id));
    }
}
