<?php

use App\Models\EquipmentIssue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/equipment-issues', function () {
    return response()->json(
        EquipmentIssue::latest()->get()
    );
});

Route::post('/equipment-issues', function (Request $request) {
    $validated = $request->validate([
        'lab_number' => 'required|in:Lab A,Lab B,Lab C,Mac Lab',
        'equipment_type' => 'required|in:Monitor,Keyboard,Mouse,LAN Cable',
        'issue_description' => 'required|string',
        'reported_by' => 'required|string|max:100',
        'severity' => 'required|in:Low,Medium,High',
    ]);

    $issue = EquipmentIssue::create([
        'lab_number' => $validated['lab_number'],
        'equipment_type' => $validated['equipment_type'],
        'issue_description' => $validated['issue_description'],
        'reported_by' => $validated['reported_by'],
        'severity' => $validated['severity'],
        'status' => 'Open',
    ]);

    return response()->json($issue, 201);
});