<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
class AddressController extends Controller
{
     // Lấy tất cả địa chỉ theo user_id
    public function show($user_id)
    {
        $addresses = Address::where('user_id', $user_id)->get();
        return response()->json($addresses);
    }
    public function index(){
        $addresses = Address::all();
        return response()->json([
            'success' => $addresses,
        ], 200);
    }

    // Thêm địa chỉ mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name_recipient' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
        ]);

        $address = Address::create($validated);
        return response()->json(['message' => 'Địa chỉ đã được thêm thành công', 'data' => $address], 201);
    }
      // Cập nhật địa chỉ
    public function update(Request $request, $id)
    {
        $address = Address::findOrFail($id);

        $validated = $request->validate([
            'name_recipient' => 'sometimes|string|max:100',
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string',
        ]);

        $address->update($validated);
        return response()->json(['message' => 'Cập nhật địa chỉ thành công', 'data' => $address]);
    }
     // Xóa địa chỉ
    public function destroy($id)
    {
        $address = Address::findOrFail($id);
        $address->delete();
        return response()->json(['message' => 'Đã xóa địa chỉ thành công']);
    }
}
