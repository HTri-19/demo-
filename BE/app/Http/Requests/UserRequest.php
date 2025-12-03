<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        $userId = $this->route('id');
        $emailRule = Rule::unique('users', 'email');

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $emailRule = $emailRule->ignore($userId);
        }

        $passwordRule = $this->isMethod('POST')
            ? ['required', 'string', 'min:6']
            : ['nullable', 'string', 'min:6'];

        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', $emailRule],
            'password' => $passwordRule,
            'phone' => ['nullable', 'string', 'max:50'],
            'role' => ['required', Rule::in(['user', 'admin'])],
            'status' => ['required', Rule::in(['active', 'unactive'])],
        ];
    }
}
