<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
         // Kiểm tra user có role admin không
        if (auth('sanctum')->check() && auth('sanctum')->user()->role === 'admin') {
            return $next($request);
        }

        return response()->json([
            'message' => 'Bạn không có quyền truy cập'
        ], 403);
    }
}
