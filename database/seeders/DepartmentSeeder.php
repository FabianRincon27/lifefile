<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            ['name' => 'Inyectables', 'description' => 'Producción de medicamentos inyectables.'],
            ['name' => 'Sólidos Orales', 'description' => 'Producción de tabletas y cápsulas.'],
            ['name' => 'Control de Calidad', 'description' => 'Aseguramiento de la calidad de los lotes.'],
            ['name' => 'Mantenimiento', 'description' => 'Servicios técnicos y reparación de equipos.'],
        ];

        foreach ($departments as $department) {
            Department::create($department);
        }
    }
}
