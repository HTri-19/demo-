<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class MailController extends Controller
{
    public function sendMail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email không tồn tại!'], 400);
        }

        try {
            // ✅ SỬA: Đổi 3000 thành 5173
            $resetLink = "http://localhost:5173/reset-password?email=" . urlencode($user->email);

            \Illuminate\Support\Facades\Mail::raw(
                "Xin chào {$user->name},\n\n" .
                "Bạn đã yêu cầu đặt lại mật khẩu.\n\n" .
                "Email: {$user->email}\n\n" .
                "Nhấp vào link để đặt lại mật khẩu:\n" .
                "{$resetLink}\n\n" .
                "© 2024 myTechstore",
                function ($message) use ($user) {
                    $message->to($user->email)
                            ->subject('Yêu cầu đặt lại mật khẩu - myTechstore');
                }
            );

            return response()->json([
                'message' => 'Email đã gửi! Vui lòng kiểm tra hộp thư.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
            'password_confirmation' => 'required|min:6|same:password'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email không tồn tại!'], 400);
        }

        try {
            $user->update(['password' => Hash::make($request->password)]);

            return response()->json([
                'message' => 'Mật khẩu đã được cập nhật thành công!'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }
}
