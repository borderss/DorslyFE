<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DealsController;
use App\Http\Controllers\Api\PointOfInterestController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\TitlePhotoController;
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
    Route::apiResource('Comment',CommentController::class);
    Route::apiResource('Deal',DealsController::class);
    Route::apiResource('Rating',RatingController::class);
});

Route::apiResource('PointOfInterest',PointOfInterestController::class);
Route::get('/PointOfInterest/images/{PointOfInterest}',[PointOfInterestController::class,'getFile'])->name('PointOfInterest.images');

Route::apiResource('Product',ProductController::class);
Route::apiResource('Comment',CommentController::class);
Route::apiResource('Deal',DealsController::class);
Route::apiResource('Rating',RatingController::class);

Route::apiResource('TitlePhotos',TitlePhotoController::class);
Route::get('/TitlePhotos/image/{TitlePhoto}',[TitlePhotoController::class,'getFile'])->name('TitlePhotos.image');
