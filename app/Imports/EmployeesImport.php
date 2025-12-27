<?php

namespace App\Imports;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class EmployeesImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {

            if (!$row['internal_id']) {
                continue;
            }

            $department = Department::where('name', $row['department'])->first();

            if (!$department) {
                continue;
            }

            Employee::create([
                'internal_id' => $row['internal_id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'email' => $row['email'],
                'department_id' => $department->id,
                'has_room_911_access' => strtoupper($row['has_room_911_access']) === 'SI',
            ]);
        }
    }
}
