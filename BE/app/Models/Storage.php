<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product_variants;
class Storage extends Model
{
    use HasFactory;
     protected $table = 'storages';
    protected $fillable = ['name', 'value'];

    public function variants()
    {
        return $this->hasMany(Product_variants::class, 'storage_id');
    }
}
