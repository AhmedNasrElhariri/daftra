<?php

namespace App\Http\Controllers\API;

use App\Events\OrderPlaced;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class OrderController extends Controller
{


    public function index()
    {
        $cacheKey = 'orders_page_' . request('page', 1);

        return Cache::remember($cacheKey, 3600, function () {
            $paginator = Order::with('products')->paginate(10);

            return response()->json([
                'items' => OrderResource::collection($paginator->items()),
                'meta' => [
                    'current_page' => $paginator->currentPage(),
                    'last_page' => $paginator->lastPage(),
                    'per_page' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'prev' => $paginator->previousPageUrl(),
                    'next' => $paginator->nextPageUrl(),
                ],
            ]);
        });
    }


    /**
     * Store a newly created order
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $total = 0;
        $orderProducts = [];

        foreach ($validated['products'] as $item) {
            $product = Product::findOrFail($item['id']);

            // Check if enough stock is available
            if ($product->stock < $item['quantity']) {
                return response()->json([
                    'message' => "Insufficient stock for product: {$product->name}",
                ], 422);
            }

            $itemTotal = $product->price * $item['quantity'];
            $total += $itemTotal;

            $orderProducts[$item['id']] = ['quantity' => $item['quantity']];

            $product->decrement('stock', $item['quantity']);
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'total' => $total,
            'status' => 'pending',
        ]);

        $order->products()->attach($orderProducts);

        event(new OrderPlaced($order));
        return $this->success(new OrderResource($order->load('products')), 'Order created successfully');
    }

    /**
     * Display the specified order
     */
    public function show($id)
    {
        $order = Order::with('products')->findOrFail($id);
        return $this->success(new OrderResource($order));

    }
}
