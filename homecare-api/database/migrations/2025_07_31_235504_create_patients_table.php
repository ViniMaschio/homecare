<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->date('date_of_birth');
        $table->string('address');
        $table->string('phone')->nullable();
        $table->text('medical_history')->nullable();
        $table->timestamps();

    });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
