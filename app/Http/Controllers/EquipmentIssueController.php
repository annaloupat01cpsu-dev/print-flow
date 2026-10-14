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
            'category' => 'required|in:Roads & walkways,Drainage & flooding,Waste & sanitation,Street lighting,Water supply,Public safety,Other',
            'location' => 'required|string|max:255',
            'issue_description' => 'required|string|max:5000',
            'severity' => 'required|in:Low,Medium,High',
            'photo' => 'nullable|image|max:5120',
        ]);

        $photoPath = $request->file('photo')?->store('issue-photos', 'public');

        EquipmentIssue::create([
            'category' => $validated['category'],
            'location' => $validated['location'],
            'issue_description' => $validated['issue_description'],
            'reported_by' => $request->user()->name,
            'severity' => $validated['severity'],
            'photo_path' => $photoPath,
            'user_id' => $request->user()->id,
            'status' => 'Open',
        ]);

        return redirect()
            ->route('equipment-issues.index')
            ->with('success', 'Community issue reported successfully.');
    }

    public function resolve(EquipmentIssue $equipmentIssue, Request $request)
    {
        abort_unless($request->user()->isStaff(), 403);

        $equipmentIssue->update([
            'status' => 'Resolved',
        ]);

        return redirect()
            ->route('equipment-issues.index')
            ->with('success', 'Equipment issue resolved successfully.');
    }
}