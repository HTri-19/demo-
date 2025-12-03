<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;

use function PHPSTORM_META\map;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pmt = Payment::all();
        return response()->json([
            'success' => true,
            'message' => 'Lấy thông tin thanh toán thành công',
            'data' => $pmt
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
        $pmt = Payment::create([
            'name' => $request->name
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Thêm thông tin thanh toán thành công',
            'data' => $pmt
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
        $pmt = Payment::find($id);
        if(!$pmt){
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
                'data' => $pmt
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Lấy id payment thành công' . $id,
            'data' => $pmt
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
