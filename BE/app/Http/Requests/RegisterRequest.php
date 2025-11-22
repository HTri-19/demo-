<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "name" => "required|string|max:100",
            'email' => "required|string|unique:users,email",
            "password" => "required|min:6|confirmed",
            "phone" => "required|string|min:9|max:15"
        ];
    }
    public function messages(){
        return [
            'name.required' => 'Tên không được để trống',
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email đã tồn tại',
            'password.required' => 'Mật khẩu không được để trống',
            'password.min' => 'Mật khẩu phải ít nhất 6 ký tự',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp',
            'phone.required' => 'Số điện thoại không được để trống',
            'phone.min' => 'Số điện thoại có ít nhất 9 ký tự',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự',
        ];
    }
}
