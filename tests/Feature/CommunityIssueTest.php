<?php

namespace Tests\Feature;

use App\Models\EquipmentIssue;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CommunityIssueTest extends TestCase
{
    use RefreshDatabase;

    public function test_resident_can_report_a_community_issue_with_a_photo(): void
    {
        Storage::fake('public');
        $resident = User::factory()->create();
        $photo = UploadedFile::fake()->create('streetlight.jpg', 100, 'image/jpeg');

        $response = $this->actingAs($resident)->post(route('equipment-issues.store'), [
            'category' => 'Street lighting',
            'location' => 'Rizal Street, near the covered court',
            'issue_description' => 'The streetlight has been out for three nights.',
            'severity' => 'Medium',
            'photo' => $photo,
        ]);

        $response->assertRedirect(route('equipment-issues.index'));
        $issue = EquipmentIssue::firstOrFail();
        $this->assertSame($resident->id, $issue->user_id);
        $this->assertSame($resident->name, $issue->reported_by);
        $this->assertSame('Street lighting', $issue->category);
        $this->assertSame('Open', $issue->status);
        Storage::disk('public')->assertExists($issue->photo_path);
    }

    public function test_only_staff_can_resolve_a_community_issue(): void
    {
        $issue = EquipmentIssue::create([
            'category' => 'Roads & walkways',
            'location' => 'Barangay road',
            'issue_description' => 'A deep pothole is blocking the lane.',
            'reported_by' => 'Resident',
            'severity' => 'High',
            'status' => 'Open',
        ]);

        $this->actingAs(User::factory()->create())
            ->patch(route('equipment-issue.resolve', $issue))
            ->assertForbidden();

        $this->actingAs(User::factory()->create(['role' => 'staff']))
            ->patch(route('equipment-issue.resolve', $issue))
            ->assertRedirect(route('equipment-issues.index'));

        $this->assertSame('Resolved', $issue->fresh()->status);
    }
}