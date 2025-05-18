<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $filters = [
            'name' => $request->get('name'),
            'min_price' => $request->get('min_price'),
            'max_price' => $request->get('max_price'),
            'category' => $request->get('category'),
            'page' => $request->get('page', 1),
        ];

        $cacheKey = 'products_' . md5(json_encode($filters));

        return Cache::remember($cacheKey, 3600, function () use ($query) {
            $paginator = $query->paginate(10);
            return $this->success([
                'items' => ProductResource::collection($paginator->items()),
                'meta' => [
                    'current_page' => $paginator->currentPage(),
                    'last_page' => $paginator->lastPage(),
                    'per_page' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'prev' => $paginator->previousPageUrl(),
                    'next' => $paginator->nextPageUrl(),
                ]
            ]);
        });
    }


    /**
     * Store a newly created product
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric',
            'category'    => 'nullable|string',
            'stock'       => 'required|integer',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'price', 'category', 'stock']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public'); // saves to storage/app/public/products
        }

        $product = Product::create($data);


        Cache::forget('products_*');

        return $this->success(new ProductResource($product), 'Product created successfully');

    }

    /**
     * Display the specified product
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return $this->success(new ProductResource($product));

    }

    /**
     * Update the specified product
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name'        => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price'       => 'sometimes|numeric',
            'category'    => 'sometimes|string',
            'stock'       => 'sometimes|integer',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'price', 'category', 'stock']);

        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);



        // Clear cache when product is updated
        Cache::forget('products_*');
        return $this->success(new ProductResource($product), 'Product updated successfully');
    }

    /**
     * Remove the specified product
     */
    public function destroy($id)
    {

        Product::destroy($id);
        Cache::forget('products_*');
        return $this->success(null, 'Product deleted successfully');

    }
}
