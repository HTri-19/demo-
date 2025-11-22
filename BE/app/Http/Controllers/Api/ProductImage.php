<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product_images;
class ProductImage extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productImg = Product_images::all();
        return response()->json([
            'success' => true,
            'data' => $productImg,
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
    $request->validate([
        'product_id' => 'required|exists:product,id',
        'image' => 'required|string',
    ]);

    $productImg = Product_images::create([
        'product_id' => $request->product_id,
        'image' => $request->image,
    ]);

    return response()->json([
        'success' => true,
        'data' => $productImg
    ], 201);
}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $productImg = Product_images::find($id);
        return response()->json([
            'success' => true,
            'data' => $productImg
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
        $productImg = Product_images::find($id);
        $productImg->update([
            'product_id' => $request->product_id,
            'image' => $request->image,
        ]);
        return response()->json(['success'=>true,'message'=>'Cập nhật thành công','data'=>$productImg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $productImg = Product_images::find($id);
        $productImg->delete();
        return response()->json([
            'success' => true,
            'message' => 'Xóa thành công',
            'data' => $productImg
        ], 200);
    }
}
