<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrintOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_type',
        'size',
        'quantity',
        'color_mode',
        'width_cm',
        'height_cm',
        'notes',
        'file_path',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
