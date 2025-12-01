<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
     protected $table = 'addresses';
    protected $fillable = ['user_id', 'name_recipien', 'phone', 'address'];
    public $timestamps = false; // chỉ có created_at

    // Relationship: một address thuộc một user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
