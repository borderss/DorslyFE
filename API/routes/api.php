<?php

use App\Http\Controllers\Api\AuthConroller;
use App\Http\Controllers\Api\CommentsController;
use App\Http\Controllers\Api\DealsController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\Interest_pointController;
use App\Http\Controllers\Api\PointOfInterestController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RatingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/register', [AuthConroller::class, 'register']);
Route::post('/login', [AuthConroller::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthConroller::class, 'user']);
    Route::get('/logout', [AuthConroller::class, 'logout']);
    Route::apiResource('PointOfInterest',PointOfInterestController::class);
});

Route::apiResource('PointOfInterest',PointOfInterestController::class);
Route::apiResource('Product',ProductController::class);
