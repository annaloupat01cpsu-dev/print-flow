<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('print_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('product_type', 40);
            $table->string('size', 100);
            $table->unsignedInteger('quantity');
            $table->string('color_mode', 20);
            $table->decimal('width_cm', 8, 2)->nullable();
            $table->decimal('height_cm', 8, 2)->nullable();
            $table->text('notes')->nullable();
            $table->string('file_path')->nullable();
            $table->string('status', 20)->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('print_orders');
    }
};
