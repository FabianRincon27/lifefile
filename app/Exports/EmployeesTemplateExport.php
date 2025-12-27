<?php

namespace App\Exports;

use App\Models\Department;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Cell\DataValidation;

class EmployeesTemplateExport implements WithHeadings, WithEvents, ShouldAutoSize
{
    public function headings(): array
    {
        return [
            'internal_id',
            'first_name',
            'last_name',
            'email',
            'department',
            'has_room_911_access',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $departments = Department::pluck('name')->toArray();
                $departmentsList = '"' . implode(',', $departments) . '"';

                for ($row = 2; $row <= 1000; $row++) {

                    $departmentValidation = new DataValidation();
                    $departmentValidation->setType(DataValidation::TYPE_LIST);
                    $departmentValidation->setErrorStyle(DataValidation::STYLE_STOP);
                    $departmentValidation->setAllowBlank(false);
                    $departmentValidation->setShowDropDown(true);
                    $departmentValidation->setFormula1($departmentsList);
                    $departmentValidation->setErrorTitle('Departamento inválido');
                    $departmentValidation->setError('Seleccione un departamento de la lista');
                    $departmentValidation->setPromptTitle('Departamento');
                    $departmentValidation->setPrompt('Seleccione un valor del listado');

                    $event->sheet
                        ->getDelegate()
                        ->getCell("E{$row}")
                        ->setDataValidation($departmentValidation);

                    $boolValidation = new DataValidation();
                    $boolValidation->setType(DataValidation::TYPE_LIST);
                    $boolValidation->setAllowBlank(false);
                    $boolValidation->setFormula1('"SI,NO"');
                    $boolValidation->setErrorTitle('Valor inválido');
                    $boolValidation->setError('Debe seleccionar SI o NO');
                    $boolValidation->setPromptTitle('Acceso ROOM_911');
                    $boolValidation->setPrompt('SI = Autorizado | NO = No autorizado');

                    $event->sheet
                        ->getDelegate()
                        ->getCell("F{$row}")
                        ->setDataValidation($boolValidation);
                }
            }
        ];
    }
}
