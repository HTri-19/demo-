<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use App\Models\Orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Orders::all();
        if(!$orders){
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
                'data' => $orders
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Show sản phẩm thành công',
            'data' => $orders
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    try {
        // 1️⃣ Validate dữ liệu
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'address_id' => 'required',
            'name' => 'required|string',
            'amount_paid' => 'required|numeric',
            'payment_status' => 'required|string',
            'payment_method_id' => 'nullable|integer',
            'order_status' => 'required|string',
            'voucher' => 'nullable|string',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:product,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validation lỗi',
            'errors' => $e->errors()
        ], 422);
    }

    // 2️⃣ Tạo đơn hàng chính
    $order = Orders::create([
        'user_id' => $request->user_id,
        'address_id' => $request->address_id,
        'name' => $request->name,
        'amount_paid' => $request->amount_paid,
        'payment_status' => $request->payment_status,
        'payment_method_id' => $request->payment_method_id,
        'order_status' => $request->order_status,
        'voucher' => $request->voucher
    ]);

    // 3️⃣ Tạo chi tiết đơn hàng
    $orderDetails = [];
    $products = $request->products ?? []; // đảm bảo không null

    foreach ($products as $item) {
        $orderDetails[] = OrderDetail::create([
            'order_id' => $order->id,
            'product_id' => $item['product_id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
            'product_variants_id' => $item['product_variants_id'] ?? null, // nếu có
        ]);
    }

    // 4️⃣ Trả kết quả
    return response()->json([
        'success' => true,
        'message' => 'Tạo đơn hàng và chi tiết đơn hàng thành công',
        'data' => [
            'order' => $order,
            'order_details' => $orderDetails
        ]
    ], 200);
}



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Orders::find($id);
        if(!$order){
            return response()->json([
                'success' => false,
                'data' => $order,
                'message' => 'Order not found'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Lấy id sản phẩm thành công',
            'data' => $order
        ],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $order = Orders::find($id);
        if(!$order){
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
                'data' => $order
            ], 404);
        }
        $order->update([
            'name' => $request->name,
            'amount_paid' => $request->amount_paid,
            'payment_status' => $request->payment_status,
            'order_status' => $request->order_status,
            'voucher' => $request->voucher,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Cập nhật đơn hàng thành công',
            'data' => $order,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Orders::find($id);
        $order->delete();
        return response()->json(['success' => true, 'message' => 'Xóa đơn hàng thành công', 'data' => $order]);
    }
}
