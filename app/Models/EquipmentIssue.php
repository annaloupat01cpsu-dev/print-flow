<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentIssue extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'location',
        'issue_description',
        'reported_by',
        'severity',
        'status',
        'photo_path',
        'user_id',
    ];
}