<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Trả về danh sách category cho dropdown.
     * Mặc định loại bỏ trùng theo tên (distinct by name) và chọn MIN(id) làm id đại diện.
     * Hỗ trợ query:
     *  - only_parents=1: Chỉ lấy category cấp 1 (parent_id IS NULL)
     *  - distinct_by_name=0: Trả về đầy đủ, không loại trùng theo name
     */
    public function index(Request $request): JsonResponse
    {
        $onlyParents = $request->boolean('only_parents', false);
        $distinctByName = $request->boolean('distinct_by_name', true);

        $query = Categories::query();
        if ($onlyParents) {
            $query->whereNull('parent_id');
        }

        if ($distinctByName) {
            // Lấy duy nhất theo name, chọn MIN(id) đại diện
            $categories = $query
                ->select(DB::raw('MIN(id) as id'), 'name')
                ->groupBy('name')
                ->orderBy('name')
                ->get();
        } else {
            $categories = $query
                ->select('id', 'name')
                ->orderBy('name')
                ->get();
        }

        return response()->json($categories, 200);
    }
}
