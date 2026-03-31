<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $orders = $request->user()->orders()->with('items.product')->latest()->get();

        return response()->json($orders);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $order = $request->user()->orders()->with('items.product')->findOrFail($id);

        return response()->json($order);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'items'                  => 'required|array|min:1',
            'items.*.product_id'     => 'required|exists:products,id',
            'items.*.quantity'       => 'required|integer|min:1',
            'shipping_address'       => 'required|string',
        ]);

        $order = DB::transaction(function () use ($request) {
            $total = 0;
            $orderItems = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    abort(422, "Stok {$product->name} tidak cukup.");
                }

                $subtotal = $product->price * $item['quantity'];
                $total   += $subtotal;

                $orderItems[] = [
                    'product_id'        => $product->id,
                    'quantity'          => $item['quantity'],
                    'price_at_purchase' => $product->price,
                ];

                // Kurangi stok
                $product->decrement('stock', $item['quantity']);
            }

            $order = $request->user()->orders()->create([
                'total_price'      => $total,
                'shipping_address' => $request->shipping_address,
            ]);

            $order->items()->createMany($orderItems);

            return $order->load('items.product');
        });

        return response()->json([
            'message' => 'Pesanan berhasil dibuat!',
            'order'   => $order,
        ], 201);
    }
}
