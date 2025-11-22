<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Orders;
use App\Models\Product_variants;
class OrderDetail extends Model
{
    use HasFactory;
     protected $table = 'order_details';
    protected $fillable = ['order_id', 'product_variants_id', 'quantity', 'price'];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Orders::class, 'order_id');
    }

    public function productVariant()
    {
        return $this->belongsTo(Product_variants::class, 'product_variants_id');
    }
}
