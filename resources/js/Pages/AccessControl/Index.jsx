import React, { useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import {
    CheckCircleIcon,
    XCircleIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Pagination from "@/Components/Pagination";
import SecondaryButton from "@/Components/SecondaryButton";

const LogsIndex = ({ logs, employeesList, filters }) => {
    const [localFilters, setLocalFilters] = useState({
        employee_id: filters.employee_id || "",
        start_date: filters.start_date || "",
        end_date: filters.end_date || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const queryParams = Object.keys(localFilters).reduce((acc, key) => {
            if (localFilters[key]) {
                acc[key] = localFilters[key];
            }
            return acc;
        }, {});

        router.get(route("access.logs.index"), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setLocalFilters({ employee_id: "", start_date: "", end_date: "" });
        router.get(
            route("access.logs.index"),
            {},
            {
                preserveState: false,
                preserveScroll: true,
            }
        );
    };

    const handleExportPdf = () => {
        const queryParams = Object.keys(localFilters).reduce((acc, key) => {
            if (localFilters[key]) {
                acc[key] = localFilters[key];
            }
            return acc;
        }, {});

        const url = route("access.export.pdf", queryParams);
        window.location.href = url;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard de Historial de Acceso
                </h2>
            }
        >
            <Head title="Historial de Logs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Sección de Filtros */}
                    <div className="bg-white p-6 shadow-xl sm:rounded-lg mb-6 border border-gray-200">
                        <h3 className="text-lg font-bold mb-4 text-indigo-700 flex items-center">
                            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />{" "}
                            Opciones de Filtrado
                        </h3>
                        <form
                            onSubmit={handleSearch}
                            className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
                        >
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="employee_id"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Empleado
                                </label>
                                <select
                                    id="employee_id"
                                    name="employee_id"
                                    value={localFilters.employee_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">
                                        -- Todos los Empleados --
                                    </option>
                                    {employeesList.map((employee) => (
                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.last_name},{" "}
                                            {employee.first_name} (
                                            {employee.internal_id})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="start_date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Fecha Inicio
                                </label>
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={localFilters.start_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="end_date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Fecha Fin
                                </label>
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={localFilters.end_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                            </div>

                            <div className="flex space-x-2">
                                <PrimaryButton
                                    type="submit"
                                    className="flex items-center"
                                >
                                    <MagnifyingGlassIcon className="h-4 w-4 mr-1" />{" "}
                                    Buscar
                                </PrimaryButton>
                                <SecondaryButton
                                    type="button"
                                    onClick={handleReset}
                                    className="bg-gray-500 hover:bg-gray-600 flex items-center"
                                >
                                    <TrashIcon className="h-4 w-4 mr-1" />{" "}
                                    Limpiar
                                </SecondaryButton>
                                <PrimaryButton
                                    type="button"
                                    onClick={handleExportPdf}
                                    className="bg-red-600 hover:bg-red-700 flex items-center"
                                >
                                    <ArrowDownTrayIcon className="h-4 w-4 mr-1" />{" "}
                                    PDF
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4">
                                Resultados (Total: {logs.total})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fecha/Hora
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID Tarjeta
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Empleado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Resultado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Razón
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {logs.data.map((log) => (
                                            <tr key={log.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(
                                                        log.attempt_at
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {log.scanned_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {log.employee ? (
                                                        `${log.employee.first_name} ${log.employee.last_name} (${log.employee.internal_id})`
                                                    ) : (
                                                        <span className="text-gray-400 italic">
                                                            Desconocido
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                            log.access_granted
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {log.access_granted ? (
                                                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                                                        ) : (
                                                            <XCircleIcon className="h-4 w-4 mr-1" />
                                                        )}
                                                        {log.access_granted
                                                            ? "Acceso CONCEDIDO"
                                                            : "Acceso DENEGADO"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {log.reason}
                                                </td>
                                            </tr>
                                        ))}
                                        {logs.data.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-4 text-center text-gray-500 italic"
                                                >
                                                    No se encontraron registros
                                                    que coincidan con los
                                                    filtros.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Paginación */}
                        <div className="border-t p-4 flex justify-end bg-gray-50">
                            <Pagination links={logs.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default LogsIndex;
