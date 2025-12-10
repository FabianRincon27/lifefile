import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import React, { useState } from "react";
import { Head, Link, router, usePage, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

const Index = ({ employees, departments, filters }) => {
    const { props } = usePage();
    const flash = props.flash || {};

    const [localFilters, setLocalFilters] = useState({
        search: filters.search || "",
        department_id: filters.department_id || "",
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route("employees.index"), localFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setLocalFilters({ search: "", department_id: "" });

        router.get(
            route("employees.index"),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gestión de Empleados
                </h2>
            }
        >
            <Head title="Empleados" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {flash.error}
                        </div>
                    )}

                    <div className="flex justify-end mb-4">
                        <Link href={route("employees.create")}>
                            <PrimaryButton>Añadir Nuevo Empleado</PrimaryButton>
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form
                            onSubmit={handleFilter}
                            className="flex gap-4 mb-6 items-end border p-4 rounded-lg bg-gray-50"
                        >
                            <div>
                                <label
                                    htmlFor="search"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Buscar (ID, Nombre o Apellido)
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={localFilters.search}
                                    onChange={(e) =>
                                        setLocalFilters((prev) => ({
                                            ...prev,
                                            search: e.target.value,
                                        }))
                                    }
                                    className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm"
                                    placeholder="Ej: 1001, Juan, Pérez"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="department_id"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Departamento
                                </label>
                                <select
                                    id="department_id"
                                    value={localFilters.department_id}
                                    onChange={(e) =>
                                        setLocalFilters((prev) => ({
                                            ...prev,
                                            department_id: e.target.value,
                                        }))
                                    }
                                    className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">Todos</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <PrimaryButton type="submit">
                                Aplicar Filtros
                            </PrimaryButton>
                            <SecondaryButton
                                type="button"
                                onClick={handleReset}
                            >
                                Limpiar
                            </SecondaryButton>
                        </form>

                        <div className="overflow-x-auto border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID Interno
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre Completo
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Departamento
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acceso ROOM_911
                                        </th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employees.data.length > 0 ? (
                                        employees.data.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {employee.internal_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {employee.first_name}{" "}
                                                    {employee.last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {employee.department.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            employee.has_room_911_access
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {employee.has_room_911_access
                                                            ? "Sí"
                                                            : "No"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route(
                                                            "employees.edit",
                                                            employee.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Editar/Ver Histórico
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No se encontraron empleados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
