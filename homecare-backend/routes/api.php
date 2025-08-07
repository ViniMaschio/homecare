<?php

use App\Http\Controllers\PatientController;
use App\Http\Controllers\CaregiverController;

Route::apiResource('patients', PatientController::class);
Route::apiResource('caregivers', CaregiverController::class);