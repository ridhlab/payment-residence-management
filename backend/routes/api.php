<?php

use App\Http\Controllers\Api\HouseOccupants\HouseOccupantController;
use App\Http\Controllers\Api\Houses\HouseController;
use App\Http\Controllers\Api\Houses\HouseDropdownController;
use App\Http\Controllers\Api\MonthlyExpenses\MonthlyExpenseController;
use App\Http\Controllers\Api\Occupants\OccupantController;
use App\Http\Controllers\Api\MonthlyFees\MonthlyFeeController;
use App\Http\Controllers\Api\Occupants\OccupantDropdownController;
use App\Models\MonthlyFee;
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
    Route::get('{id}', 'show')->name('house.show');
    Route::post('/store', 'store')->name('house.store');
    Route::put('/{id}/update', 'update')->name('house.update');


    Route::prefix('/get-dropdown')->controller(HouseDropdownController::class)->group(function () {
        Route::get('/not-occupied', 'getAllHouseNotOccupied')->name('house.get-dropdown.not-occupied');
    });
});


Route::prefix('/occupant')->controller(OccupantController::class)->group(function () {
    Route::get('/', 'index')->name('occupant.index');
    Route::get('{id}', 'show')->name('occupant.show');
    Route::post('/store', 'store')->name('occupant.store');
    Route::put('/{id}/update', 'update')->name('occupant.update');

    Route::post('/upload-identity-card/{id}', 'uploadIdentityCard')->name('occupant.upload-identity-card');

    Route::prefix('/get-dropdown')->controller(OccupantDropdownController::class)->group(function () {
        Route::get('/not-occupy', 'getAllOccupantNotOccupy')->name('occupant.get-dropdown.not-occupy');
    });
});

Route::prefix('/monthly-fee')->controller(MonthlyFeeController::class)->group(function () {
    Route::get('/', 'index')->name('monthly-fee.index');
    Route::get('{id}', 'show')->name('monthly-fee.show');
    Route::post('/store', 'store')->name('monthly-fee.store');
    Route::put('/{id}/update', 'update')->name('monthly-fee.update');
});


Route::prefix('/monthly-expense')->controller(MonthlyExpenseController::class)->group(function () {
    Route::get('/', 'index')->name('monthly-expense.index');
    Route::get('{id}', 'show')->name('monthly-expense.show');
    Route::post('/store', 'store')->name('monthly-expense.store');
    Route::put('/{id}/update', 'update')->name('monthly-expense.update');
});

Route::prefix('/house-occupant')->controller(HouseOccupantController::class)->group(function () {
    Route::get('/occupied', 'getHouseOccupied')->name('hous-occupant.occupied');
    Route::get('/{id}', 'getDetailHouseOccupant')->name('house-occupant.show');
    Route::post('/add-occupant', 'addHouseOccupant')->name('house-occupant.add-occupant');
    Route::post('/remove-house-occupant/{id}', 'setEndHouseOccupant')->name('house-occupant.remove-house-occupant');
});
