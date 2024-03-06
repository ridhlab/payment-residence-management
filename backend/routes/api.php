<?php

use App\Http\Controllers\Api\Houses\HouseController;
use App\Http\Controllers\Api\Occupants\OccupantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/house')->controller(HouseController::class)->group(function () {
    Route::get('/', 'index')->name('house.index');
    Route::get('{uid}', 'show')->name('house.show');
    Route::post('/store', 'store')->name('house.store');
    Route::put('/{uid}/update', 'update')->name('house.update');
});


Route::prefix('/occupant')->controller(OccupantController::class)->group(function () {
    Route::get('/', 'index')->name('occupant.index');
    Route::get('{uid}', 'show')->name('occupant.show');
    Route::post('/store', 'store')->name('occupant.store');
    Route::put('/{uid}/update', 'update')->name('occupant.update');

    Route::post('/upload-identity-card/{uid}', 'uploadIdentityCard')->name('occupant.upload-identity-card');
});
