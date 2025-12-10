<!DOCTYPE html>
<html>

<head>
    <title>{{ $title }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 9pt;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }

        .header h1 {
            color: #1e40af;
            font-size: 14pt;
            margin: 0;
        }

        .filters {
            margin-bottom: 15px;
            padding: 10px;
            border: 1px dashed #ccc;
            background-color: #f9f9f9;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
        }

        th {
            background-color: #e0e7ff;
            color: #333;
            font-weight: bold;
            font-size: 8pt;
        }

        .granted {
            color: green;
            font-weight: bold;
        }

        .denied {
            color: red;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            font-size: 7pt;
            text-align: right;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>{{ $title }}</h1>
        <p>Generado el: {{ $date }}</p>
    </div>

    <div class="filters">
        <p><strong>Filtros Aplicados:</strong></p>
        <ul>
            <li>Empleado: {{ $employee_name ?? 'Todos' }}</li>
            <li>Fecha Inicio: {{ $filters_active['start_date'] ?? 'N/A' }}</li>
            <li>Fecha Fin: {{ $filters_active['end_date'] ?? 'N/A' }}</li>
        </ul>
    </div>

    <h2>Registros Encontrados (Total: {{ $logs->count() }})</h2>

    <table>
        <thead>
            <tr>
                <th style="width: 15%;">Fecha/Hora</th>
                <th style="width: 10%;">ID Tarjeta</th>
                <th style="width: 30%;">Empleado</th>
                <th style="width: 15%;">Resultado</th>
                <th style="width: 30%;">Razón</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($logs as $log)
                <tr>
                    <td>{{ $log->attempt_at }}</td>
                    <td>{{ $log->scanned_id }}</td>
                    <td>
                        @if ($log->employee)
                            {{ $log->employee->first_name }} {{ $log->employee->last_name }}
                            ({{ $log->employee->internal_id }})
                        @else
                            <span style="color: gray;">(Empleado No Encontrado)</span>
                        @endif
                    </td>
                    <td class="{{ $log->access_granted ? 'granted' : 'denied' }}">
                        {{ $log->access_granted ? 'CONCEDIDO' : 'DENEGADO' }}
                    </td>
                    <td>{{ $log->reason }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align: center;">No se encontraron registros de acceso.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Sistema de Control de Acceso - Reporte confidencial.
    </div>
</body>

</html>
