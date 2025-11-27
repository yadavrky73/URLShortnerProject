<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        activity()->disableLogging();
        Schema::disableForeignKeyConstraints();
        DB::table('companies')->truncate();
        $superAdmin = Company::create([
            'name' => 'DemoCompany',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Schema::disableForeignKeyConstraints();
        activity()->enableLogging();
    }
}
