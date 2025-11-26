<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Config\Repository;
use App\Repositories\ProductRepository;

class ProductService
{
    protected $productRepo;
    public function __construct(ProductRepository $productRepo){
        $this->productRepo = $productRepo;
    }
    public function getAll()
    {
        return Product::with([
        'category',
        'images',
        'variants.ram',
        'variants.storage'
    ])->get();
    }

    public function getById($id)
    {
        return Product::with([
        'category',
        'images',
        'variants.ram',
        'variants.storage'
    ])->find($id);
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update($id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        return $product->delete();
    }
    public function search(array $filters){
        return $this->productRepo->search($filters);
    }

}
