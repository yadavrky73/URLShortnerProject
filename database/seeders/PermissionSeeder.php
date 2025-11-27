<?php

namespace Database\Seeders;

use App\Helpers\PermissionsHelper;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        activity()->disableLogging();
        Schema::disableForeignKeyConstraints();

        DB::table('permissions')->truncate();
        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_permissions')->truncate();

        $now = now();

        $permissionGroups = [

            [
                'name' => 'company',
                'permissions' => PermissionsHelper::genCrudPermissions('companies', ['update company permissions']),

            ],

            [
                'name' => 'shorturls',
                'permissions' => PermissionsHelper::genCrudPermissions('short_urls', ['update shorturl permissions']),
            ],

            [
                'name' => 'roles',
                'permissions' => PermissionsHelper::genCrudPermissions('roles', ['update role permissions']),
            ],

            [
                'name' => 'invitations',
                'permissions' => [
                    'view invitations',
                    'create invitations',
                    'delete invitations'
                ]
            ],
        ];

        foreach ($permissionGroups as $group) {
            foreach ($group['permissions'] as $permission) {
                DB::table('permissions')->insert([
                    'name'        => $permission,
                    'group_name'  => $group['name'],
                    'guard_name'  => 'web',
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ]);
            }
        }

        activity()->enableLogging();
    }
}
