import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';

const Create = ({ departments }) => {
    const { data, setData, post, processing, errors } = useForm({
        internal_id: '',
        first_name: '',
        last_name: '',
        email: '',
        department_id: departments[0]?.id || '',
        has_room_911_access: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Añadir Empleado</h2>}
        >
            <Head title="Crear Empleado" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <InputLabel htmlFor="internal_id" value="ID Interno" />
                                <TextInput
                                    id="internal_id"
                                    type="text"
                                    name="internal_id"
                                    value={data.internal_id}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('internal_id', e.target.value)}
                                />
                                <InputError message={errors.internal_id} className="mt-2" />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <InputLabel htmlFor="first_name" value="Nombre" />
                                    <TextInput
                                        id="first_name"
                                        type="text"
                                        value={data.first_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('first_name', e.target.value)}
                                    />
                                    <InputError message={errors.first_name} className="mt-2" />
                                </div>
                                <div className="flex-1">
                                    <InputLabel htmlFor="last_name" value="Apellido" />
                                    <TextInput
                                        id="last_name"
                                        type="text"
                                        value={data.last_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('last_name', e.target.value)}
                                    />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="email" value="Correo electrónico" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            
                            
                            <div>
                                <InputLabel htmlFor="department_id" value="Departamento" />
                                <select
                                    id="department_id"
                                    value={data.department_id}
                                    onChange={(e) => setData('department_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.department_id} className="mt-2" />
                            </div>
                            
                            <div className="flex items-center">
                                <Checkbox
                                    id="has_room_911_access"
                                    name="has_room_911_access"
                                    checked={data.has_room_911_access}
                                    onChange={(e) => setData('has_room_911_access', e.target.checked)}
                                />
                                <InputLabel htmlFor="has_room_911_access" className="ml-2">
                                    Otorgar Acceso al ROOM_911
                                </InputLabel>
                                <InputError message={errors.has_room_911_access} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton disabled={processing}>
                                    Guardar Empleado
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;