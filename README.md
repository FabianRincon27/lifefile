# 🚀 Proyecto de Gestión de Empleados

Este es un proyecto web construido con **Laravel 11+** (PHP), **Inertia.js** y **React** para la gestión interna de empleados y sus accesos. Incluye autenticación con Breeze y funcionalidades administrativas para crear, listar y gestionar usuarios/empleados.

---

## 🛠️ Requisitos del Sistema

Para la instalación local, asegúrate de tener instalados:

* **PHP** (versión 8.2 o superior)
* **Composer**
* **Node.js** y **npm** (o Yarn)
* **Base de Datos** (MySQL/MariaDB preferentemente)

---

## 📋 Instalación y Configuración

Sigue estos pasos para poner el proyecto en funcionamiento en tu entorno local.

### 1. Clonar el Repositorio

Clona el proyecto y navega al directorio principal:

```bash
git clone https://github.com/FabianRincon27/lifefile.git
cd [lifefile]
```

### 2. Configuración de Entorno
Copia el archivo de configuración de entorno y genera la clave de aplicación, luego configura tus credenciales de base de datos en el archivo .env

```bash
# Crear el archivo .env a partir de .env.example
cp .env.example .env

# Generar la clave de aplicación
php artisan key:generate
```
### 3. Instalación de Dependencias
Instala las dependencias de PHP (Backend) y de JavaScript (Frontend):

```bash
# Dependencias de PHP
composer install

# Dependencias de JavaScript
npm install
```

### 4. Configuración y Siembra de la Base de Datos
Ejecuta las migraciones para crear la estructura de tablas (users, employees, departments, etc.) y luego corre los seeders para poblar con datos iniciales (como el usuario administrador):

```bash
# Ejecutar migraciones
php artisan migrate

# Correr seeders (para crear departamentos y usuario administrador)
php artisan db:seed
```

### 5. Iniciar la Aplicación
Ejecuta Laravel en un terminal para el backend:

```bash
php artisan serve
```

En un terminal separado, inicia el proceso de compilación del frontend (Vite):

```bash
npm run dev
```

### El proyecto estará accesible en http://127.0.0.1:8000

## Credenciales de acceso
```bash
user: admin@room911.com
pass: admin123
```