<?php

use App\Http\Controllers\Api\AllergyController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrdersController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\UserProfileController;
use Illuminate\Support\Facades\Route;

// ── Public Routes ──────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::get('/products',      [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// ── Protected Routes (Butuh Token) ─────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Profil Kulit
    Route::get('/profile',  [UserProfileController::class, 'show']);
    Route::post('/profile', [UserProfileController::class, 'store']);

    // Orders
    Route::get('/orders',       [OrdersController::class, 'index']);
    Route::post('/orders',      [OrdersController::class, 'store']);
    Route::get('/orders/{id}',  [OrdersController::class, 'show']);

    // Laporan Alergi
    Route::get('/allergies',  [AllergyController::class, 'index']);
    Route::post('/allergies', [AllergyController::class, 'store']);


    // AI Recommendation
    Route::get('/recommend', [RecommendationController::class, 'index']);
});
