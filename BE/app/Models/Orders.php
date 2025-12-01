<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Payment;
class Orders extends Model
{
    use HasFactory;
     protected $table = 'orders';
    protected $fillable = ['user_id', 'address_id', 'name', 'amount_paid', 'payment_status', 'payment_method_id', 'order_status', 'voucher'];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(Payment::class, 'payment_method_id');
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }
}
