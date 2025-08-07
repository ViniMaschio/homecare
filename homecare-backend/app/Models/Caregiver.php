<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Caregiver extends Model
{
    protected $fillable = [
        'name', 
        'specialty', 
        'phone'
    ];

    public function patients()
    {
        return $this->belongsToMany(Patient::class);
    }
}
