<?php

namespace App\Http\Controllers;

use App\Models\AccessLog;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth; 
use Barryvdh\DomPDF\Facade\Pdf;

class AccessController extends Controller
{

    public function index()
    {
        if (Auth::check()) {
            return redirect()->route('access.logs.index');
        }
            
        return Inertia::render('AccessControl/Reader');
    }

    public function check(Request $request)
    {
        $request->validate([
            'card_id' => 'required|string|max:255',
        ]);

        $cardId = $request->input('card_id');
        $employee = Employee::where('internal_id', $cardId)->first();
        
        $accessGranted = false;
        $reason = null;

        if (!$employee) {
            $reason = 'Tarjeta/ID no registrado.';
        } elseif (!$employee->has_room_911_access) {
            $reason = 'Acceso al ROOM_911 revocado.';
        } else {
            $accessGranted = true;
            $reason = 'Acceso concedido.';
        }
        
        AccessLog::create([
            'scanned_id' => $cardId,
            'employee_id' => $employee ? $employee->id : null,
            'access_granted' => $accessGranted,
            'reason' => $reason,
            'attempt_at' => now(),
        ]);

        $employeeName = $employee 
            ? "{$employee->first_name} {$employee->last_name} ({$employee->internal_id})" 
            : "ID {$cardId} (Desconocido)";
        
        $flashMessage = $accessGranted
            ? ['success' => "ACCESO CONCEDIDO para {$employeeName}."]
            : ['error' => "ACCESO DENEGADO para {$employeeName}. Razón: {$reason}"];

        return redirect()->route('access.reader')
                         ->with($flashMessage);
    }

    public function exportEmployeePdf(Employee $employee)
    {
        $logs = $employee->accessLogs()
                         ->with('employee')
                         ->orderBy('attempt_at', 'desc')
                         ->get();
        
        $data = [
            'employee' => $employee->load('department'),
            'logs' => $logs,
            'title' => 'Reporte de Acceso ROOM 911',
            'date' => now()->format('d/m/Y H:i:s'),
        ];
        
        $pdf = Pdf::loadView('pdf.employee_access_log', $data);

        $filename = 'Acceso_Historial_' . $employee->internal_id . '_' . now()->format('Ymd_His') . '.pdf';
        
        return $pdf->download($filename);
    }

    public function dataAccessLog(Request $request)
    {
       
        $filters = $request->only(['employee_id', 'start_date', 'end_date']);

        $logsQuery = AccessLog::query()
            ->with('employee');
       
        if ($filters['employee_id'] ?? null) {
            $logsQuery->where('employee_id', $filters['employee_id']);
        }
        
        if ($filters['start_date'] ?? null) {
            $logsQuery->whereDate('attempt_at', '>=', $filters['start_date']);
        }
        
        if ($filters['end_date'] ?? null) {
            $logsQuery->whereDate('attempt_at', '<=', $filters['end_date']);
        }
       
        $logs = $logsQuery->orderBy('attempt_at', 'desc')
                          ->paginate(10)
                          ->withQueryString();

        $employeesList = Employee::orderBy('last_name')->get(['id', 'first_name', 'last_name', 'internal_id']);
        
        return Inertia::render('AccessControl/Index', [
            'logs' => $logs,
            'employeesList' => $employeesList,
            'filters' => $filters,
        ]);
    }

    public function exportPdf(Request $request)
    {
        $filters = $request->only(['employee_id', 'start_date', 'end_date']);

        $logsQuery = AccessLog::query()->with('employee');
        
        if ($filters['employee_id'] ?? null) {
            $logsQuery->where('employee_id', $filters['employee_id']);
        }
        
        if ($filters['start_date'] ?? null) {
            $logsQuery->whereDate('attempt_at', '>=', $filters['start_date']);
        }
        
        if ($filters['end_date'] ?? null) {
            $logsQuery->whereDate('attempt_at', '<=', $filters['end_date']);
        }

        $logs = $logsQuery->orderBy('attempt_at', 'desc')->get();
        
        $data = [
            'logs' => $logs,
            'title' => 'Reporte General de Historial de Acceso',
            'date' => now()->format('d/m/Y H:i:s'),
            'filters_active' => $filters,
            'employee_name' => null,
        ];
        
        if ($filters['employee_id'] ?? null) {
             $employee = Employee::find($filters['employee_id']);
             $data['employee_name'] = $employee ? $employee->first_name . ' ' . $employee->last_name . ' (' . $employee->internal_id . ')' : 'Empleado Eliminado/ID Inválido';
        }

        $pdf = Pdf::loadView('pdf.general_access_log', $data);

        $filename = 'Historial_General_Acceso_' . now()->format('Ymd_His') . '.pdf';
        
        return $pdf->download($filename);
    }    

}
