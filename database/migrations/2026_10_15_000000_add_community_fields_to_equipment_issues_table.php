<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('equipment_issues', function (Blueprint $table) {
            $table->string('lab_number', 50)->nullable()->change();
            $table->string('equipment_type', 50)->nullable()->change();
            $table->string('category', 100)->nullable();
            $table->string('location', 255)->nullable();
            $table->string('photo_path')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('resident');
        });
    }

    public function down(): void
    {
        Schema::table('equipment_issues', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
            $table->dropColumn(['category', 'location', 'photo_path']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};