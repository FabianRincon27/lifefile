<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    protected $fillable = [
        'internal_id', 'first_name', 'last_name', 'email', 'department_id', 'has_room_911_access'
    ];
    
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function accessLogs(): HasMany
    {
        return $this->hasMany(AccessLog::class);
    }
}
