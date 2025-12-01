<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cho phép tất cả người dùng (sau này bạn có thể thêm auth)
        return true;
    }

    public function rules(): array
    {
        // Nếu method là POST → required tất cả
        if ($this->isMethod('post')) {
            return [
                'name' => 'required|string|max:100',
                'category_id' => 'required|exists:categories,id',
                'description' => 'nullable|string',
                'status' => 'nullable|in:active,unactive',
            ];
        }

        // Nếu method là PUT/PATCH → sometimes
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return [
                'name' => 'sometimes|required|string|max:100',
                'category_id' => 'sometimes|required|exists:categories,id',
                'description' => 'nullable|string',
                'status' => 'nullable|in:active,unactive',
            ];
        }

        return [];
    }
}
