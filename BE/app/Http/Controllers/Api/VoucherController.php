<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Voucher;
class VoucherController extends Controller
{
   public function index()
    {
        $vouchers = Voucher::all();
        return response()->json([
            'success' => true,
            'data' => $vouchers
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:vouchers',
            'discount' => 'required|numeric',
            'expires_at' => 'nullable|date',
        ]);

        $voucher = Voucher::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $voucher
        ], 201);
    }

    public function show($id)
    {
        $voucher = Voucher::find($id);
        if (!$voucher) {
            return response()->json(['success' => false, 'message' => 'Voucher not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $voucher], 200);
    }

    public function update(Request $request, $id)
    {
        $voucher = Voucher::find($id);
        if (!$voucher) {
            return response()->json(['success' => false, 'message' => 'Voucher not found'], 404);
        }

        $request->validate([
            'code' => 'sometimes|unique:vouchers,code,' . $id,
            'discount' => 'sometimes|numeric',
            'expires_at' => 'nullable|date',
        ]);

        $voucher->update($request->all());

        return response()->json(['success' => true, 'data' => $voucher], 200);
    }

    public function destroy($id)
    {
        $voucher = Voucher::find($id);
        if (!$voucher) {
            return response()->json(['success' => false, 'message' => 'Voucher not found'], 404);
        }

        $voucher->delete();

        return response()->json(['success' => true, 'message' => 'Voucher deleted'], 200);
    }
}
