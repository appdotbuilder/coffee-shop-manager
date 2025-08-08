<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->enum('category', ['rent', 'utilities', 'supplies', 'equipment', 'maintenance', 'other']);
            $table->decimal('amount', 10, 2);
            $table->date('expense_date');
            $table->enum('payment_method', ['cash', 'debit_card', 'credit_card', 'bank_transfer']);
            $table->foreignId('user_id')->constrained();
            $table->text('notes')->nullable();
            $table->string('receipt_number')->nullable();
            $table->timestamps();
            
            $table->index('category');
            $table->index('expense_date');
            $table->index('payment_method');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};