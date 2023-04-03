<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ContactMessageController;
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

    Route::put('/updateUserGeneralSettings', [UserController::class, 'updateUserGeneralSettings']);
    Route::put('/updateUserPassword', [UserController::class, 'updateUserPassword']);
    Route::put('/updateUserPrivacySettings', [UserController::class, 'updateUserPrivacySettings']);
    Route::delete('/deleteAccount', [UserController::class, 'handleUserAccountDelete']);


    Route::apiResource('comments',CommentController::class);
    Route::apiResource('users',UserController::class);
    Route::apiResource('deals',DealsController::class);

    Route::apiResource('ratings',RatingController::class);

    Route::get('/getUsersPointOfInterestRating/{id}',[RatingController::class, 'getUsersPointOfInterestRating']);

    Route::post('/filter_users',[UserController::class, 'filter']);
    Route::post('/filter_comments',[CommentController::class, 'filter']);
    Route::post('/filter_deals',[DealsController::class, 'filter']);
    Route::post('/filter_points_of_interest',[PointOfInterestController::class, 'filter']);
    Route::post('/filter_products',[ProductController::class, 'filter']);
    Route::post('/filter_reservations',[DealsController::class, 'filterReservations']);
    Route::post('/filter_prepurchases',[DealsController::class, 'filterPrePurchases']);


    Route::post('/reservationAvailable',[ReservationController::class, 'reservationAvailable']); // check if available
    Route::post('/createDeal', [DealsController::class, 'createDeal']); // create reservation
    Route::post('/createPrePurchase', [PrePurchaseController::class, 'createPrePurchase']); // create pre-purchase (Requires deal to exist)

    Route::get('/getDealFromPointOfInterest/{id}', [DealsController::class, 'getDealFromPointOfInterest']); // get deal from point of interest
    Route::get('/getDeals', [DealsController::class, 'getDeals']); // get user's deals
    Route::get('/cancelReservation/{id}', [DealsController::class, 'cancelReservation']); // get user's deals
    Route::delete('/deleteDeal/{id}', [DealsController::class, 'delete']); // delete deal

    Route::get('/getUserRatings', [RatingController::class, 'getUserRatings']); // get user's reviews
    Route::get('/getUserComments', [CommentController::class, 'getUserComments']); // get user's comments
    Route::get('/profileStatistics', [UserController::class, 'profileStatistics']);

    // STRIPE
    Route::post('/getSession/{pointOfInterest}',[StripeController::class, 'getSession']);
    Route::post('/successPayment', [StripeController::class, 'successPayment']);
    Route::get('/sendTestMail', [TestMailController::class, 'sendEmail']);
});


// crud (only accessible to admins)
Route::apiResource('points_of_interest',PointOfInterestController::class);
Route::apiResource('products',ProductController::class);
Route::apiResource('title_photos',TitlePhotoController::class);

//Route::get('contact',ContactMessageController::class);
//Route::delete('contact',ContactMessageController::class);

// util (public methods, available for everyone)
Route::get('/point_of_interest/images/{point_of_interest}',[PointOfInterestController::class,'getFile'])->name('point_of_interest.images');
Route::get('/title_photos/image/{title_photos}',[TitlePhotoController::class,'getFile'])->name('title_photos.image');

Route::get('/todays_deals', [PointOfInterestController::class, 'getTodaysSelection']);
Route::get('/popular_choices', [PointOfInterestController::class, 'getPopularSelection']);

Route::get('/points_of_interest/{id}/comments', [PointOfInterestController::class, 'getComments']);
Route::get('/points_of_interest/{id}/products', [PointOfInterestController::class, 'getProducts']);

Route::get('uml', function () {
    return view('uml');
});

//Route::post('contact',ContactMessageController::class);
