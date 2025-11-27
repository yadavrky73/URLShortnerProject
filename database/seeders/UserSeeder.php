<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        activity()->disableLogging();
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        $superAdmin = User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'company_id' => 1 ,
            'email' => 'super_admin@admin.com',
            'password' => bcrypt('123456789'),
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);

        $superAdmin->assignRole('super_admin');

        Schema::disableForeignKeyConstraints();
        activity()->enableLogging();
    }
}
