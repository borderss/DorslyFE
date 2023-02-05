<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DealsController;
use App\Http\Controllers\Api\PointOfInterestController;
use App\Http\Controllers\Api\PrePurchaseController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\TestMailController;
use App\Http\Controllers\Api\TitlePhotoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\StripeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/logout', [AuthController::class, 'logout']);

    // authenticated crud
    Route::apiResource('comments',CommentController::class);
    // index, store, update(only his own comment)

    Route::apiResource('users',UserController::class);
    // non-admin can't do anything here

    Route::apiResource('deals',DealsController::class);
    // store:
    //  - only if type=="reservation"
    //  - also get user_id from auth instead of resource

    Route::apiResource('ratings',RatingController::class);
    // store:
    //  - only if user has made a deal of type "reservation" or "pre-purchase" at the POI.
    //    If user already has a rating for the POI, change the old rating to the new rating.
    //  - also get user_id from auth instead of resource


    // filtering (only accessible to admins (used for admin panel))
    Route::post('/filter_users',[UserController::class, 'filter']);
    Route::post('/filter_comments',[CommentController::class, 'filter']);
    Route::post('/filter_deals',[DealsController::class, 'filter']);
    Route::post('/filter_points_of_interest',[PointOfInterestController::class, 'filter']);
    Route::post('/filter_products',[ProductController::class, 'filter']);

    // TESTING
    Route::post('/reservationAvailable',[ReservationController::class, 'reservationAvailable']); // check if available
    Route::post('/createDeal', [DealsController::class, 'createDeal']); // create reservation
    Route::post('/createPrePurchase', [PrePurchaseController::class, 'createPrePurchase']); // create pre-purchase (Requires deal to exist)
    Route::get('/getDealFromPointOfInterest/{id}', [DealsController::class, 'getDealFromPointOfInterest']); // get deal from point of interest
    Route::get('/getDeals', [DealsController::class, 'getDeals']); // get user's deals

    // STRIPE
    Route::post('/getSession/{pointOfInterest}',[StripeController::class, 'getSession']);
    Route::post('/successPayment', [StripeController::class, 'successPayment']);
    Route::get('/sendTestMail', [TestMailController::class, 'sendEmail']);
});

// crud (only accessible to admins)
Route::apiResource('points_of_interest',PointOfInterestController::class);
Route::apiResource('products',ProductController::class);
Route::apiResource('title_photos',TitlePhotoController::class);


// util (public methods, available for everyone)
Route::get('/point_of_interest/images/{point_of_interest}',[PointOfInterestController::class,'getFile'])->name('point_of_interest.images');
Route::get('/title_photos/image/{title_photos}',[TitlePhotoController::class,'getFile'])->name('title_photos.image');

Route::get('/todays_deals', [PointOfInterestController::class, 'getTodaysSelection']);
Route::get('/popular_choices', [PointOfInterestController::class, 'getPopularSelection']);

Route::get('/points_of_interest/{id}/comments', [PointOfInterestController::class, 'getComments']);
Route::get('/points_of_interest/{id}/products', [PointOfInterestController::class, 'getProducts']);
