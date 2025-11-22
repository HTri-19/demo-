<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Storage;
use App\Http\Requests\StorageRequest;

class StorageController extends Controller
{
    public function index()
    {
        return response()->json(Storage::all(), 200);
    }

    public function store(StorageRequest $request)
    {
        $storage = Storage::create($request->validated());
        return response()->json([
            'message' => 'Thêm bộ nhớ thành công',
            'data' => $storage
        ], 201);
    }

    public function show($id)
    {
        $storage = Storage::find($id);
        if (!$storage) {
            return response()->json(['message' => 'Không tìm thấy bộ nhớ'], 404);
        }
        return response()->json($storage, 200);
    }

    public function update(StorageRequest $request, $id)
    {
        $storage = Storage::find($id);
        if (!$storage) {
            return response()->json(['message' => 'Không tìm thấy bộ nhớ'], 404);
        }

        $storage->update($request->validated());
        return response()->json([
            'message' => 'Cập nhật bộ nhớ thành công',
            'data' => $storage
        ], 200);
    }

    public function destroy($id)
    {
        $storage = Storage::find($id);
        if (!$storage) {
            return response()->json(['message' => 'Không tìm thấy bộ nhớ'], 404);
        }

        $storage->delete();
        return response()->json(['message' => 'Xóa bộ nhớ thành công'], 200);
    }
}
