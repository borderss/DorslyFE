<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DealsController;
use App\Http\Controllers\Api\PointOfInterestController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\TitlePhotoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\StripeController;
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
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/logout', [AuthController::class, 'logout']);

    // authenticated crud
    Route::apiResource('comments',CommentController::class);
    Route::apiResource('deals',DealsController::class);
    Route::apiResource('ratings',RatingController::class);
    Route::apiResource('users',UserController::class);

    // filtering
    Route::post('/filter_users',[UserController::class, 'filter']);
    Route::post('/filter_comments',[CommentController::class, 'filter']);
    Route::post('/filter_deals',[DealsController::class, 'filter']);
    Route::post('/filter_points_of_interest',[PointOfInterestController::class, 'filter']);
    Route::post('/filter_products',[ProductController::class, 'filter']);
});

// crud
Route::apiResource('points_of_interest',PointOfInterestController::class);
Route::apiResource('products',ProductController::class);
Route::apiResource('title_photos',TitlePhotoController::class);

// util
Route::get('/PointOfInterest/images/{PointOfInterest}',[PointOfInterestController::class,'getFile'])->name('PointOfInterest.images');
Route::get('/TitlePhotos/image/{TitlePhoto}',[TitlePhotoController::class,'getFile'])->name('TitlePhotos.image');
Route::get('/getSession',[StripeController::class, 'getSession']);