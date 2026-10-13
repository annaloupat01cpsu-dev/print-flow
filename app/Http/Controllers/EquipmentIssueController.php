<?php

namespace App\Http\Controllers;

use App\Models\EquipmentIssue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentIssueController extends Controller
{
    public function index()
    {
        $issues = EquipmentIssue::latest()->get();

        return Inertia::render('EquipmentIssues/Index', [
            'issues' => $issues,
        ]);
    }

    public function create()
    {
        return Inertia::render('EquipmentIssues/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lab_number' => 'required|in:Lab A,Lab B,Lab C,Mac Lab',
            'equipment_type' => 'required|in:Monitor,Keyboard,Mouse,LAN Cable',
            'issue_description' => 'required|string',
            'reported_by' => 'required|string|max:100',
            'severity' => 'required|in:Low,Medium,High',
        ]);

        EquipmentIssue::create([
            'lab_number' => $validated['lab_number'],
            'equipment_type' => $validated['equipment_type'],
            'issue_description' => $validated['issue_description'],
            'reported_by' => $validated['reported_by'],
            'severity' => $validated['severity'],
            'status' => 'Open',
        ]);

        return redirect()
            ->route('equipment-issues.index')
            ->with('success', 'Equipment issue reported successfully.');
    }

    public function show(EquipmentIssue $equipmentIssue)
    {
        return Inertia::render('EquipmentIssues/Show', [
            'issue' => $equipmentIssue,
        ]);
    }

    public function edit(EquipmentIssue $equipmentIssue)
    {
        return Inertia::render('EquipmentIssues/Edit', [
            'issue' => $equipmentIssue,
        ]);
    }

    public function update(Request $request, EquipmentIssue $equipmentIssue)
    {
        $validated = $request->validate([
            'lab_number' => 'required|in:Lab A,Lab B,Lab C,Mac Lab',
            'equipment_type' => 'required|in:Monitor,Keyboard,Mouse,LAN Cable',
            'issue_description' => 'required|string',
            'reported_by' => 'required|string|max:100',
            'severity' => 'required|in:Low,Medium,High',
            'status' => 'required|in:Open,Resolved',
        ]);

        $equipmentIssue->update($validated);

        return redirect()
            ->route('equipment-issues.index')
            ->with('success', 'Equipment issue updated successfully.');
    }

    public function destroy(EquipmentIssue $equipmentIssue)
    {
        $equipmentIssue->delete();

        return redirect()
            ->route('equipment-issues.index')
            ->with('success', 'Equipment issue deleted successfully.');
    }

    public function resolve(EquipmentIssue $equipmentIssue)
    {
        $equipmentIssue->update([
            'status' => 'Resolved',
        ]);

        return redirect()
            ->route('equipment-issues.index')
            ->with('success', 'Equipment issue resolved successfully.');
    }
}