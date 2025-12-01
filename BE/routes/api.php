<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RamController;
use App\Http\Controllers\Api\StorageController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderdetailController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProductImage;
use App\Http\Controllers\Api\ProductVariantController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\CartController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});
// 🔹 Auth Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']); // quên mật khẩu
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);   // đặt lại mật khẩu
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::prefix('product')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::post('/', [ProductController::class, 'store']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});
Route::apiResource('rams', RamController::class);
Route::apiResource('storages', StorageController::class);

Route::prefix('addresses')->group(function () {
    Route::get('/', [AddressController::class, 'index']);
    Route::get('/{user_id}', [AddressController::class, 'show']);    // Lấy danh sách địa chỉ theo user
    Route::post('/', [AddressController::class, 'store']);              // Thêm địa chỉ mới
    Route::put('/{id}', [AddressController::class, 'update']);          // Cập nhật địa chỉ
    Route::delete('/{id}', [AddressController::class, 'destroy']);      // Xóa địa chỉ
});
Route::prefix('product_variants')->group(function () {
    // Lấy tất cả variant
    Route::get('/', [ProductVariantController::class, 'getAllVariants']);

    // Tìm kiếm theo SKU
    Route::get('/search/sku/{sku}', [ProductVariantController::class, 'searchBySku']);

    // Lấy variant theo id (kèm relationships)
    Route::get('/{id}', [ProductVariantController::class, 'showWithRelations']);

    // Lấy variant theo product_id
    Route::get('/product/{product_id}', [ProductVariantController::class, 'index']);

    // Lấy variant theo storage_id
    Route::get('/storage/{storage_id}', [ProductVariantController::class, 'getByStorage']);

    // Lấy variant theo ram_id
    Route::get('/ram/{ram_id}', [ProductVariantController::class, 'getByRam']);

    // Thêm variant
    Route::post('/', [ProductVariantController::class, 'store']);

    // Cập nhật variant
    Route::put('/{id}', [ProductVariantController::class, 'update']);

    // Xóa variant
    Route::delete('/{id}', [ProductVariantController::class, 'destroy']);
});
Route::prefix('comment')->group(function(){
    Route::get('/', [CommentController::class, 'index']);
    Route::get('/{id}', [CommentController::class, 'show']);
    Route::post('/', [CommentController::class, 'store']);
    Route::put('/{id}', [CommentController::class, 'update']);
    Route::delete('/{id}', [CommentController::class, 'destroy']);
});
Route::prefix('order')->group(function(){
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/{id}', [OrderController::class, 'show']);
    Route::post('/', [OrderController::class, 'store']);
    Route::put('/{id}', [OrderController::class, 'update']);
    Route::delete('/{id}', [OrderController::class, 'destroy']);
});
Route::prefix('order_detail')->group(function(){
    Route::get('/', [OrderdetailController::class, 'index']);
    Route::get('/{id}', [OrderdetailController::class, 'show']);
    Route::post('/', [OrderdetailController::class, 'store']);
    Route::put('/{id}', [OrderdetailController::class, 'update']);
    Route::delete('/{id}', [OrderdetailController::class, 'destroy']);
});
Route::prefix('payment')->group(function(){
    Route::get('/', [PaymentController::class, 'index']);
    Route::get('/{id}', [PaymentController::class, 'show']);
    Route::post('/', [PaymentController::class, 'store']);
    Route::put('/{id}', [PaymentController::class, 'update']);
    Route::delete('/{id}', [PaymentController::class, 'destroy']);
});
Route::prefix('products')->group(function(){
    Route::get('/search', [SearchController::class, 'search']);
});
Route::prefix('product_images')->group(function(){
    Route::get('/', [ProductImage::class, 'index']);
    Route::get('/{id}', [ProductImage::class, 'show']);
    Route::post('/', [ProductImage::class, 'store']);
    Route::put('/{id}', [ProductImage::class, 'update']);
    Route::delete('/{id}', [ProductImage::class, 'destroy']);
});
Route::prefix('voucher')->group(function(){
    Route::get('/', [VoucherController::class, 'index']);
    Route::get('/{id}', [VoucherController::class, 'show']);
    Route::post('/', [VoucherController::class, 'store']);
    Route::put('/{id}', [VoucherController::class, 'update']);
    Route::delete('/{id}', [VoucherController::class, 'destroy']);
});

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/add', [CartController::class, 'add'])->name('cart.add');
    Route::put('/{variantId}', [CartController::class, 'update'])->where('variantId', '[0-9]+')->name('cart.update');
    Route::delete('/{variantId}', [CartController::class, 'remove'])->where('variantId', '[0-9]+')->name('cart.remove');
    Route::delete('/', [CartController::class, 'clear'])->name('cart.clear');
});
