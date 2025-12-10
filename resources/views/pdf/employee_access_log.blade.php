<!DOCTYPE html>
<html>

<head>
    <title>{{ $title }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 10pt;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }

        .header h1 {
            color: #1e40af;
            font-size: 16pt;
            margin: 0;
        }

        .employee-info {
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f4f4f4;
        }

        .employee-info p {
            margin: 5px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #e0e7ff;
            color: #333;
            font-weight: bold;
            font-size: 9pt;
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
            font-size: 8pt;
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

    <div class="employee-info">
        <h3>Datos del Empleado</h3>
        <p><strong>ID Interno:</strong> {{ $employee->internal_id }}</p>
        <p><strong>Nombre Completo:</strong> {{ $employee->first_name }} {{ $employee->last_name }}</p>
        <p><strong>Departamento:</strong> {{ $employee->department->name ?? 'N/A' }}</p>
        <p><strong>Acceso ROOM 911:</strong>
            <span class="{{ $employee->has_room_911_access ? 'granted' : 'denied' }}">
                {{ $employee->has_room_911_access ? 'OTORGADO' : 'DENEGADO' }}
            </span>
        </p>
    </div>

    <h2>Historial de Accesos (Total: {{ $logs->count() }})</h2>

    <table>
        <thead>
            <tr>
                <th>Fecha y Hora</th>
                <th>Resultado</th>
                <th>ID Escaneado</th>
                <th>Razón</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($logs as $log)
                <tr>
                    <td>{{ $log->attempt_at }}</td>
                    <td class="{{ $log->access_granted ? 'granted' : 'denied' }}">
                        {{ $log->access_granted ? 'CONCEDIDO' : 'DENEGADO' }}
                    </td>
                    <td>{{ $log->scanned_id }}</td>
                    <td>{{ $log->reason }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" style="text-align: center;">No hay registros de acceso en el historial.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Sistema de Control de Acceso - Reporte confidencial.
    </div>

</body>

</html>
