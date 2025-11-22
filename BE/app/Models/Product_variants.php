<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Rams;
use App\Models\Storage;
class Product_variants extends Model
{
    use HasFactory;
     protected $table = 'product_variants';
    protected $fillable = ['product_id', 'sku', 'model_name', 'price', 'quantity', 'ram_id', 'storage_id', 'stock', 'warranty_months'];
    public $timestamps = false; // chỉ có created_at

    // Relationships
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function ram()
    {
        return $this->belongsTo(Rams::class, 'ram_id');
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
