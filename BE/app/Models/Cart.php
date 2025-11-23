<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    
    // ✅ THÊM session_id vào fillable
    protected $fillable = [
        'session_id',  // ← QUAN TRỌNG: Thiếu cái này sẽ lỗi Mass Assignment
        'variant_id',
        'quantity',
    ];

    public function variant()
    {
        return $this->belongsTo(Product_variants::class, 'variant_id', 'id');
    }
}