<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Ram;
use App\Models\Storage;

class Product_variants extends Model
{
    use HasFactory;

    protected $table = 'product_variants';
    protected $fillable = [
        'product_id', 'sku', 'model_name', 'price', 'quantity',
        'ram_id', 'storage_id', 'stock', 'warranty_months'
    ];

    // Không để Eloquent tự quản lý timestamps vì bảng đã tự động bằng DB
    public $timestamps = false;

    // Relationships
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function ram()
    {
        return $this->belongsTo(Ram::class, 'ram_id');
    }

    public function storage()
    {
        return $this->belongsTo(Storage::class, 'storage_id');
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'product_variants_id');
    }
}
