<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_issues', function (Blueprint $table) {
            $table->id();

            $table->string('lab_number', 50);
            $table->string('equipment_type', 50);
            $table->text('issue_description');
            $table->string('reported_by', 100);
            $table->string('severity', 20);
            $table->string('status', 20)->default('Open');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_issues');
    }
};