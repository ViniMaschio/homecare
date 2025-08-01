<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;


Route::apiResource('api/patients', PatientController::class);
    
