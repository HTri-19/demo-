<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ram;
use App\Http\Requests\RamRequest;

class RamController extends Controller
{
    public function index()
    {
        return response()->json(Ram::all(), 200);
    }

    public function store(RamRequest $request)
    {
        $ram = Ram::create($request->validated());
        return response()->json([
            'message' => 'Thêm RAM thành công',
            'data' => $ram
        ], 201);
    }

    public function show($id)
    {
        $ram = Ram::find($id);
        if (!$ram) {
            return response()->json(['message' => 'Không tìm thấy RAM'], 404);
        }
        return response()->json($ram, 200);
    }

    public function update(RamRequest $request, $id)
    {
        $ram = Ram::find($id);
        if (!$ram) {
            return response()->json(['message' => 'Không tìm thấy RAM'], 404);
        }

        $ram->update($request->validated());
        return response()->json([
            'message' => 'Cập nhật RAM thành công',
            'data' => $ram
        ], 200);
    }

    public function destroy($id)
    {
        $ram = Ram::find($id);
        if (!$ram) {
            return response()->json(['message' => 'Không tìm thấy RAM'], 404);
        }

        $ram->delete();
        return response()->json(['message' => 'Xóa RAM thành công'], 200);
    }
}
