<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'name', 
        'address', 
        'birth_date'];

    public function caregivers()
    {
        return $this->belongsToMany(Caregiver::class);
    }
}
