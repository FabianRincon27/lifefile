// resources/js/Pages/Employees/Edit.jsx

import React from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import DangerButton from "@/Components/DangerButton";
import { CheckCircleIcon, XCircleIcon, ClockIcon, ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
// import Pagination from '@/Components/Pagination';

const Edit = ({ employee, departments, accessLogs }) => { 
    const { data, setData, put, processing, errors } = useForm({
        internal_id: employee.internal_id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email || "",
        department_id: employee.department_id,
        has_room_911_access: employee.has_room_911_access,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("employees.update", employee.id));
    };

    const handleDelete = () => {
        if (
            confirm(
                `¿Estás seguro de que deseas eliminar al empleado ${employee.first_name} ${employee.last_name}? Esta acción es irreversible.`
            )
        ) {
            router.delete(route("employees.destroy", employee.id), {
                onSuccess: () => {},
            });
        }
    };

    const handlePdfExport = () => {
        const exportUrl = route('access.export.employee.pdf', employee.id);
        window.open(exportUrl, '_blank');
    };

    const handleRefreshLogs = () => {
        router.reload({ only: ['accessLogs'] });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Empleado: {employee.first_name} {employee.last_name}
                </h2>
            }
        >
            <Head title="Editar Empleado" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-6">
                    
                    {/* COLUMNA IZQUIERDA: Formulario de Edición (2/3 de ancho) */}
                    <div className="col-span-3 lg:col-span-2 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-6 text-gray-800">
                            Información Básica y Permisos
                        </h3>
                        
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Diseño de 2 Columnas para campos de entrada */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Columna 1 */}
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="internal_id" value="ID Interno (Tarjeta)" />
                                        <TextInput
                                            id="internal_id"
                                            type="text"
                                            name="internal_id"
                                            value={data.internal_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("internal_id", e.target.value)}
                                        />
                                        <InputError message={errors.internal_id} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="first_name" value="Nombre" />
                                        <TextInput
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            value={data.first_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("first_name", e.target.value)}
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="last_name" value="Apellido" />
                                        <TextInput
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            value={data.last_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("last_name", e.target.value)}
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="email" value="Correo electrónico" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("email", e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="department_id" value="Departamento" />
                                        <select
                                            id="department_id"
                                            value={data.department_id}
                                            onChange={(e) => setData("department_id", e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.department_id} className="mt-2" />
                                    </div>

                                    <div className="flex items-center pt-4">
                                        <Checkbox
                                            id="has_room_911_access"
                                            name="has_room_911_access"
                                            checked={data.has_room_911_access}
                                            onChange={(e) => setData("has_room_911_access", e.target.checked)}
                                        />
                                        <InputLabel
                                            htmlFor="has_room_911_access"
                                            className="ml-2 text-lg font-bold select-none"
                                        >
                                            Acceso al ROOM_911:{" "}
                                            <span
                                                className={
                                                    data.has_room_911_access
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }
                                            >
                                                {data.has_room_911_access ? "OTORGADO" : "DENEGADO"}
                                            </span>
                                        </InputLabel>
                                        <InputError message={errors.has_room_911_access} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-6 border-t mt-6">
                                <DangerButton
                                    onClick={handleDelete}
                                    type="button"
                                    disabled={processing}
                                >
                                    Eliminar Empleado
                                </DangerButton>
                                <PrimaryButton disabled={processing}>
                                    Guardar Cambios
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="col-span-3 lg:col-span-1 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 max-h-[430px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-md font-bold text-gray-800">
                                Histórico de Accesos
                            </h3>
                            <div className="space-x-2">
                                <PrimaryButton 
                                    onClick={handleRefreshLogs} 
                                    className="bg-gray-400 hover:bg-gray-500 py-1 px-3 text-sm"
                                    title="Recargar logs"
                                >
                                    <ArrowPathIcon className="h-4 w-4" />
                                </PrimaryButton>

                                <PrimaryButton
                                    onClick={handlePdfExport}
                                    className="bg-red-600 hover:bg-red-700 py-1 px-3 text-sm"
                                    title="Exportar a PDF"
                                >
                                    <ArrowDownTrayIcon className="h-4 w-4 mr-1" /> PDF
                                </PrimaryButton>
                            </div>
                        </div>

                        {accessLogs.data.length > 0 ? (
                            <>
                                <ul className="divide-y divide-gray-200">
                                    {accessLogs.data.map((log) => (
                                        <li key={log.id} className="py-3 flex items-start space-x-3">
                                            <span className={`p-1 rounded-full ${log.access_granted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {log.access_granted ? <CheckCircleIcon className="h-5 w-5" /> : <XCircleIcon className="h-5 w-5" />}
                                            </span>
                                            <div className="flex-1 text-sm">
                                                <p className="font-medium text-gray-900">
                                                    {log.access_granted ? 'Acceso CONCEDIDO' : 'Acceso DENEGADO'}
                                                </p>
                                                <p className={`text-xs ${log.access_granted ? 'text-green-500' : 'text-red-500'}`}>
                                                    {log.reason || "Acceso exitoso"}
                                                </p>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    <ClockIcon className="h-3 w-3 mr-1" />
                                                    {log.attempt_at} ({log.raw_date})
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4">
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4 text-gray-500 italic">
                                No hay registros de acceso para este empleado.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;