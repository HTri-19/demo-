<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product_images extends Model
{
    use HasFactory;
     protected $table = 'product_images';
    protected $fillable = ['product_id', 'image'];
    public $timestamps = false; // chỉ có created_at

    // Relationship: một image thuộc một product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
