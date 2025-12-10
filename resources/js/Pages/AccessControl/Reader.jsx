// resources/js/Pages/AccessControl/Reader.jsx

import React from "react";
import { Head, useForm, router, Link, usePage } from "@inertiajs/react";
import {
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    LockClosedIcon,
    UserIcon,
} from "@heroicons/react/24/solid";

import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

const Reader = ({ auth }) => {
    const { flash } = usePage().props;

    const { data, setData, post, processing, reset, errors } = useForm({
        card_id: "",
    });

    const handleSwipe = (e) => {
        e.preventDefault();
        post(route("access.check"), {
            onSuccess: () => reset("card_id"),
        });
    };

    return (
        <>
            <Head title="Lector de Acceso ROOM 911" />

            <div className="bg-gray-100 min-h-screen flex flex-col">
                <header className="bg-white shadow-md p-4 w-full">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-extrabold text-indigo-700 flex items-center">
                            <LockClosedIcon className="h-6 w-6 mr-2" />
                            SISTEMA DE CONTROL DE ACCESO ROOM 911
                        </h1>

                        <nav className="flex space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route("employees.index")}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center"
                                >
                                    <UserIcon className="h-5 w-5 mr-1" />
                                    Acceder a Empleados
                                </Link>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 font-semibold"
                                >
                                    Acceder al ROOM 911 (Admin)
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

                <div className="flex-1 flex items-start justify-center py-12">
                    <div className="max-w-7xl w-full sm:px-6 lg:px-8 grid grid-cols-3 gap-8">
                        <div className="col-span-3 bg-white overflow-hidden shadow-xl rounded-lg p-8">
                            <h3 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
                                Lector de Tarjetas
                            </h3>

                            {(flash.success || flash.error) && (
                                <div
                                    className={`mb-6 p-4 border-l-4 text-lg font-semibold flex items-center ${
                                        flash.success
                                            ? "bg-green-50 border-green-500 text-green-800"
                                            : "bg-red-50 border-red-500 text-red-800"
                                    }`}
                                >
                                    {flash.success ? (
                                        <CheckCircleIcon className="h-8 w-8 mr-3" />
                                    ) : (
                                        <XCircleIcon className="h-8 w-8 mr-3" />
                                    )}
                                    {flash.success || flash.error}
                                </div>
                            )}

                            <form onSubmit={handleSwipe} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="card_id"
                                        className="text-xl"
                                        value="ID de Tarjeta / Código de Empleado (internal_id)"
                                    />
                                    <TextInput
                                        id="card_id"
                                        type="text"
                                        name="card_id"
                                        value={data.card_id}
                                        className="mt-1 block w-full text-2xl p-4 border-4 border-gray-400 focus:border-indigo-500"
                                        onChange={(e) =>
                                            setData("card_id", e.target.value)
                                        }
                                        required
                                        autoFocus
                                        placeholder="Ingrese el ID de la tarjeta..."
                                    />
                                    <InputError
                                        message={errors.card_id}
                                        className="mt-2"
                                    />
                                </div>

                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="w-full justify-center py-3 text-2xl"
                                >
                                    {processing
                                        ? "Verificando..."
                                        : "Simular Entrada"}
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reader;
