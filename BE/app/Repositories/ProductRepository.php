<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository
{
   public function search(array $filters)
{
    $query = Product::query()->with('variants');

    if (!empty($filters['keyword'])) {
        $query->where('name', 'like', "%{$filters['keyword']}%");
    }

    if (!empty($filters['category_id'])) {
        $query->where('category_id', $filters['category_id']);
    }

    if (!empty($filters['status'])) {
        $query->where('status', $filters['status']);
    }

    // Filter by price range
    if (!empty($filters['min_price']) || !empty($filters['max_price'])) {
        $query->whereHas('variants', function($q) use ($filters) {
            if (!empty($filters['min_price'])) {
                $q->where('price', '>=', $filters['min_price']);
            }
            if (!empty($filters['max_price'])) {
                $q->where('price', '<=', $filters['max_price']);
            }
        });
    }

    $limit = $filters['limit'] ?? 20;
    return $query->paginate($limit);
}
}
