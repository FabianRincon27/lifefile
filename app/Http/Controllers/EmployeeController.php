<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\EmployeesImport; 
use Illuminate\Validation\ValidationException;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $departmentId = $request->input('department_id');

        $employees = Employee::with('department')
            ->when($search, function ($query, $search) {
                $query->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('internal_id', 'like', "%{$search}%");
            })
            ->when($departmentId, function ($query, $departmentId) {
                $query->where('department_id', $departmentId);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $departments = Department::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'departments' => $departments,
            'filters' => $request->only('search', 'department_id'),
        ]);
    }


    public function create()
    {
        $departments = Department::orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('Employees/Create', [
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'internal_id' => 'required|string|unique:employees,internal_id|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'department_id' => 'required|exists:departments,id',
            'has_room_911_access' => 'nullable|boolean',
        ]);

        Employee::create($validated);

        return redirect()->route('employees.index')->with('success', 'Empleado creado exitosamente.');
    }

    protected function formatImportFailures(array $failures): string
    {
        $errorString = '';

        foreach ($failures as $failure) {
            $errorString .= sprintf(
                "Fila %d: %s (Columnas: %s)\n",
                $failure->row(),
                implode(', ', $failure->errors()), 
                implode(', ', $failure->attribute()) 
            );
        }

        return $errorString;
    }

    public function edit(Employee $employee)
    {
        $employee->load('department'); 
        
        $accessLogs = $employee->accessLogs()
                                ->orderBy('attempt_at', 'desc')
                                ->paginate(15)
                                ->through(fn ($log) => [
                                    'id' => $log->id,
                                    'access_granted' => $log->access_granted,
                                    'reason' => $log->reason,
                                    'attempt_at' => $log->attempt_at,
                                    'raw_date' => $log->attempt_at,
                                ]);

        $departments = Department::orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'departments' => $departments,
            'accessLogs' => $accessLogs, 
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'internal_id' => 'required|string|max:255|unique:employees,internal_id,' . $employee->id,
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'department_id' => 'required|exists:departments,id',
            'has_room_911_access' => 'boolean', 
        ]);

        $employee->update($validated);

        return redirect()->route('employees.index')
                         ->with('success', 'Información del empleado y acceso al ROOM_911 actualizados.');
    }
    
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')
                         ->with('success', 'Empleado eliminado correctamente.');
    }
    
}
