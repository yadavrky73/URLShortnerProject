<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ShortUrlController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\Role\RoleController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\Users\UserController;
use Illuminate\Support\Facades\Route;




Route::prefix('admin')->name('admin.')->middleware(['web', 'auth'])->group(function () {
    Route::prefix('users')->name('users.')->controller(UserController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit users']);
        Route::post('store', 'store')->name('store')->middleware(['can:create users']);
        Route::get('create', 'create')->name('create')->middleware(['can:create users']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit users']);
        Route::get('', 'index')->name('index')->middleware(['can:view users']);
    });

    Route::prefix('roles')->name('roles.')->controller(RoleController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit roles']);
        Route::post('store', 'store')->name('store')->middleware(['can:create roles']);
        Route::get('create', 'create')->name('create')->middleware(['can:create roles']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit roles']);
        Route::get('', 'index')->name('index')->middleware(['can:view roles']);
    });

    Route::prefix('companies')->name('companies.')->controller(CompanyController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit companies']);
        Route::post('store', 'store')->name('store')->middleware(['can:create companies']);
        Route::get('create', 'create')->name('create')->middleware(['can:create companies']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit companies']);
        Route::get('', 'index')->name('index')->middleware(['can:view companies']);
    });

    Route::prefix('shortUrls')->name('shortUrls.')->controller(ShortUrlController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit short_urls']);
        Route::post('store', 'store')->name('store')->middleware(['can:create short_urls']);
        Route::get('create', 'create')->name('create')->middleware(['can:create short_urls']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit short_urls']);
        Route::get('', 'index')->name('index')->middleware(['can:view short_urls']);
    });


    Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

    Route::redirect('/', '/dashboard');
});
