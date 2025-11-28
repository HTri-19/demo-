<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'keyword' => 'nullable|string|max:255',
            'category_id' => 'nullable|integer|exists:categories,id',
            'status' => 'nullable|string|max:100',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0|gte:min_price',
            'limit' => 'nullable|integer|min:1|max:100',
        ];
    }

    public function messages()
    {
        return [
            'max_price.gte' => 'Giá tối đa phải lớn hơn hoặc bằng giá tối thiểu',
        ];
    }
}