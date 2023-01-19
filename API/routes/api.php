<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DealsController;
use App\Http\Controllers\Api\PointOfInterestController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\TestMailController;
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
Route::get('/point_of_interest/images/{point_of_interest}',[PointOfInterestController::class,'getFile'])->name('point_of_interest.images');
Route::get('/title_photos/image/{title_photos}',[TitlePhotoController::class,'getFile'])->name('title_photos.image');
Route::post('/getSession/{pointOfInterest}',[StripeController::class, 'getSession']);
Route::post('/successPayment', [StripeController::class, 'successPayment']);
Route::get('/sendTestMail', [TestMailController::class, 'sendEmail']);

Route::get('/todays_deals', [PointOfInterestController::class, 'getTodaysSelection']);
Route::get('/popular_choices', [PointOfInterestController::class, 'getPopularSelection']);


Route::get('/points_of_interest/{id}/comments', [PointOfInterestController::class, 'getComments']);
