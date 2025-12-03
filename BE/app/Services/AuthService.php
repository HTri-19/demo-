<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\User;

class AuthService
{
    public function register($data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
            'register_date' => now(),
        ]);

        return $user;
    }

    public function login($data)
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return [
                'error' => true,
                'message' => 'Email hoặc mật khẩu không đúng'
            ];
        }
        $token = $user->createToken('api_token')->plainTextToken;

        return [
            'error' => false,
            'user' => $user,
            'token' => $token,
            'message' => 'Đăng nhập thành công',
        ];
    }

      public function forgotPassword($email)
    {
        // sendResetLink cần array ['email' => $email]
        $status = Password::sendResetLink(['email' => $email]);

        if ($status === Password::RESET_LINK_SENT) {
            return [
                'error' => false,
                'message' => 'Link đặt lại mật khẩu đã gửi qua email!'
            ];
        }

        // Đây là lỗi nếu email không tồn tại
        return [
            'error' => true,
            'message' => 'Email không tồn tại trong hệ thống!'
        ];
    }

    public function resetPassword($data)
    {
        $status = Password::reset(
            $data,
            function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return ['error' => false, 'message' => 'Đặt lại mật khẩu thành công!'];
        }

        return ['error' => true, 'message' => 'Token hoặc email không hợp lệ!'];
    }

    public function logout($user)
    {
        $user->tokens()->delete();

        return ['error' => false, 'message' => 'Đăng xuất thành công'];
    }
}
