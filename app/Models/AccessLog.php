<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccessLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'scanned_id', 'employee_id', 'access_granted', 'reason', 'attempt_at'
    ];

    protected $casts = [
        'access_granted' => 'boolean',
    ];

    protected $dates = [
        'attempt_at',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
