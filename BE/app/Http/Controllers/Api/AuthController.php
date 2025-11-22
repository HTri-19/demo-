<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $user = $this->authService->register($request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Đăng ký thành công',
            'user' => $user,
        ], 200);
    }

    public function login(Request $request)
    {
        $result = $this->authService->login($request->only('email', 'password'));

        if ($result['error']) {
            return response()->json(['message' => $result['message']], 401);
        }

        return response()->json([
            'status' => true,
            'message' => $result['message'],
            'user' => $result['user'],
            'token' => $result['token'],
        ], 200);
    }

    public function forgotPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email'
    ]);

    $result = $this->authService->forgotPassword($request->email);

    $code = $result['error'] ? 400 : 200;
    return response()->json(['message' => $result['message']], $code);
}

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $result = $this->authService->resetPassword($request->only(
    'email',
            'password',
            'password_confirmation',
            'token'
        ));

        $code = $result['error'] ? 400 : 200;
        return response()->json(['message' => $result['message']], $code);
    }

    public function logout(Request $request)
    {
        $result = $this->authService->logout($request->user());

        return response()->json([
            'status' => !$result['error'],
            'message' => $result['message']
        ]);
    }
}
