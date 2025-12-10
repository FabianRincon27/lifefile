<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departmentIds = Department::pluck('id')->toArray();
        if (empty($departmentIds)) {
            $this->call(DepartmentSeeder::class);
            $departmentIds = Department::pluck('id')->toArray();
        }

        $employees = [
            [
                'internal_id' => '1001',
                'first_name' => 'Juan',
                'last_name' => 'Pérez',
                'department_id' => $departmentIds[0],
                'has_room_911_access' => true,
            ],
            [
                'internal_id' => '1002',
                'first_name' => 'María',
                'last_name' => 'Gómez',
                'department_id' => $departmentIds[1],
                'has_room_911_access' => false,
            ],
            [
                'internal_id' => '1003',
                'first_name' => 'Carlos',
                'last_name' => 'López',
                'department_id' => $departmentIds[2],
                'has_room_911_access' => true,
            ],
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
