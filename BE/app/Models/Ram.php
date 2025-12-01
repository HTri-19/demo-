<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product_variants;

class Ram extends Model
{
    use HasFactory;
    protected $table = 'rams';
    protected $fillable = ['name', 'value'];

    public function variants()
    {
        return $this->hasMany(Product_variants::class, 'ram_id');
    }
}
