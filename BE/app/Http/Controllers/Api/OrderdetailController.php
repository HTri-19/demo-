<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderDetail;
use Symfony\Component\Mime\Message;

class OrderdetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $order_detail = OrderDetail::all();
        return response()->json([
            'success' => true,
            'message' => 'Show sản phẩm thành công',
            'data' => $order_detail
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

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order_detail = OrderDetail::find($id);
        if(!$order_detail){
            return response()->json([
                'success' => true,
                'message' => 'order_detail not found',
                'data' => $order_detail,
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Đơn hàng có id = ' . $id,
            'data' => $order_detail
        ], 200);
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
        $order_detail = OrderDetail::find($id);
        $order_detail->update([
            'order_id' => $request->order_id,
            'product_variants_id' => $request->product_variants_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Cập nhật đơn hàng thành công',
            'data' => $order_detail,
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
        $order_detail = OrderDetail::find($id);
        if(!$order_detail){
            return response()->json([
                'success' => false,
                'message' => 'Orderdetail not found',
                'data' => $order_detail
            ], 404);
        }
        $order_detail->delete();
        return response()->json([
        'success' => true,
         'message' => 'Đơn hàng đã được xóa khỏi giỏ hàng',
         'data' => $order_detail], 200);
    }
}
