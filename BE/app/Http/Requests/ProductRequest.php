<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $base = [
            'name' => ['string', 'max:100'],
            'category_id' => ['exists:categories,id'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'in:active,unactive'],

            // Hình ảnh (tùy chọn) - chấp nhận cả chuỗi trực tiếp hoặc object {id?, image}
            'images' => ['sometimes', 'array'],
            'images.*' => ['sometimes', 'string'],
            'images.*.id' => ['sometimes', 'integer', 'exists:product_images,id'],
            'images.*.image' => ['sometimes', 'string'],

            // Biến thể (tùy chọn)
            'variants' => ['sometimes', 'array'],
            'variants.*.id' => ['sometimes', 'integer', 'exists:product_variants,id'],
            'variants.*.sku' => ['nullable', 'string', 'max:100'],
            'variants.*.model_name' => ['sometimes', 'string', 'max:100'],
            'variants.*.price' => ['sometimes', 'numeric', 'min:0'],
            'variants.*.quantity' => ['sometimes', 'integer', 'min:0'],
            'variants.*.ram_id' => ['nullable', 'integer', 'exists:rams,id'],
            'variants.*.storage_id' => ['nullable', 'integer', 'exists:storages,id'],
            'variants.*.stock' => ['nullable', 'integer', 'min:0'],
            'variants.*.warranty_months' => ['nullable', 'integer', 'min:0'],
        ];

        if ($this->isMethod('post')) {
            return array_merge($base, [
                'name' => ['required', 'string', 'max:100'],
                'category_id' => ['required', 'exists:categories,id'],
                'variants.*.model_name' => ['sometimes', 'string', 'max:100'],
                'variants.*.price' => ['sometimes', 'numeric', 'min:0'],
                'variants.*.quantity' => ['sometimes', 'integer', 'min:0'],
            ]);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return array_merge($base, [
                'name' => ['sometimes', 'required', 'string', 'max:100'],
                'category_id' => ['sometimes', 'required', 'exists:categories,id'],
            ]);
        }

        return $base;
    }
}
