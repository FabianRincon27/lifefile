<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AccessController::class, 'index'])->name('access.reader');

Route::middleware(['auth', 'auth.admin'])->group(function () {
    Route::get('/employees/{employee}/access-log/export', [AccessController::class, 'exportEmployeePdf'])->name('access.export.employee.pdf');
    Route::get('/access-logs/export-pdf', [AccessController::class, 'exportPdf'])->name('access.export.pdf');
    Route::get('/access-logs', [AccessController::class, 'dataAccessLog'])->name('access.logs.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/employees', EmployeeController::class);

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');

    Route::post('register', [RegisteredUserController::class, 'store'])->name('register_user');
});

Route::get('/access/reader', [AccessController::class, 'index'])->name('access.reader'); 
Route::post('/access/check', [AccessController::class, 'check'])->name('access.check');

require __DIR__.'/auth.php';
