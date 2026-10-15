<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EquipmentIssueController;
use App\Http\Controllers\PrintOrderController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (\Illuminate\Http\Request $request) {
    $orderQuery = \App\Models\PrintOrder::query();

    if (! $request->user()->isStaff()) {
        $orderQuery->where('user_id', $request->user()->id);
    }

    $statusCounts = (clone $orderQuery)
        ->selectRaw('status, COUNT(*) as total')
        ->groupBy('status')
        ->pluck('total', 'status');

    return Inertia::render('Dashboard', [
        'orders' => (clone $orderQuery)
            ->with('user:id,name,email')
            ->latest()
            ->take(8)
            ->get(),
        'statusCounts' => $statusCounts,
        'isStaff' => $request->user()->isStaff(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('print-orders', PrintOrderController::class)
        ->only(['index', 'create', 'store']);
    Route::patch('/print-orders/{printOrder}/status', [PrintOrderController::class, 'updateStatus'])
        ->name('print-orders.status');
    Route::get('/print-orders/{printOrder}/file', [PrintOrderController::class, 'downloadFile'])
        ->name('print-orders.download');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('equipment-issues', EquipmentIssueController::class)
        ->only(['index', 'create', 'store']);
    Route::patch('/equipment-issues/{equipmentIssue}/resolve', [EquipmentIssueController::class, 'resolve'])
        ->name('equipment-issue.resolve');
});

require __DIR__.'/auth.php';
