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
        Schema::table('users', function (Blueprint $table) {
            // This should reference companies, NOT roles
            $table->foreignId('company_id')
                ->nullable()
                ->after('id')
                ->constrained('companies')   // correct table name
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove FK first
            $table->dropForeign(['company_id']);

            // Remove column
            $table->dropColumn('company_id');
        });
    }
};
