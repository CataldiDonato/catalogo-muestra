# 🏎️ Catálogo de Autos - Aplicación Full Stack

Una aplicación web moderna para gestionar y visualizar un catálogo de vehículos. Construida con React, Node.js/Express y PostgreSQL.

## 📋 Requisitos Previos

- **Node.js** (v16 o superior)
- **PostgreSQL** (v12 o superior)
- **npm** o **yarn**

## 🗂️ Estructura del Proyecto

```
Catalogo-autos/
├── database/
│   ├── schema.sql          # Esquema de la base de datos
│   └── seed.sql            # Datos de prueba (6 autos)
├── server/
│   ├── server.js           # Servidor Express
│   ├── package.json        # Dependencias del backend
│   └── .env.example        # Variables de entorno de ejemplo
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx     # Página de inicio
    │   │   ├── Catalog.jsx  # Catálogo de autos
    │   │   └── Contact.jsx  # Formulario de contacto
    │   ├── components/
    │   │   ├── Navigation.jsx
    │   │   ├── Footer.jsx
    │   │   └── VehicleCard.jsx
    │   ├── App.jsx          # Componente principal con rutas
    │   └── index.css        # Estilos Tailwind
    ├── package.json         # Dependencias del frontend
    └── index.html           # HTML principal
```

## 🚀 Instalación y Configuración

### 1️⃣ Configurar Base de Datos PostgreSQL

```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE catalogo_autos;

# Conectarse a la base de datos
\c catalogo_autos

# Ejecutar el esquema
\i database/schema.sql

# Cargar datos de prueba
\i database/seed.sql

# Verificar que todo está bien
SELECT COUNT(*) FROM vehicles;  -- Debería retornar 6
```

### 2️⃣ Configurar Backend (Node.js + Express)

```bash
# Navegar a la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Crear archivo .env (copiar desde .env.example)
copy .env.example .env

# Actualizar .env con tus credenciales de PostgreSQL
# DB_USER=postgres
# DB_PASSWORD=tu_password
# DB_NAME=catalogo_autos

# Iniciar el servidor
npm start

# Para desarrollo con nodemon:
npm run dev
```

El servidor correrá en: **http://localhost:5000**

### 3️⃣ Configurar Frontend (React + Vite)

```bash
# Navegar a la carpeta del cliente
cd client

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Para producción
npm run build
npm run preview
```

El cliente correrá en: **http://localhost:3000**

## 📡 API Endpoints

### GET `/api/vehicles`

Obtiene todos los vehículos del catálogo.

**Respuesta:**

```json
[
  {
    "id": 1,
    "brand": "Toyota",
    "model": "Corolla 2024",
    "year": 2024,
    "price": 25999.99,
    "image_url": "https://...",
    "description": "Sedán compacto...",
    "created_at": "2026-01-07T00:00:00.000Z"
  }
]
```

### POST `/api/contact`

Envía un mensaje de contacto.

**Request Body:**

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Me interesa el Toyota Corolla"
}
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Mensaje guardado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "message": "Me interesa el Toyota Corolla",
    "created_at": "2026-01-07T00:00:00.000Z"
  }
}
```

## 🎨 Características

✅ **Catálogo Completo**: Visualiza todos los autos disponibles  
✅ **Filtrado por Marca**: Filtra autos por marca  
✅ **Ordenamiento**: Ordena por nombre, precio (asc/desc) y año  
✅ **Formulario de Contacto**: Envía mensajes a la base de datos  
✅ **Diseño Responsivo**: Compatible con móviles, tablets y desktop  
✅ **Tailwind CSS**: Estilos modernos y profesionales  
✅ **React Router**: Navegación entre páginas fluida

## 🛠️ Tecnologías Utilizadas

### Backend

- **Express.js** - Framework web
- **PostgreSQL** - Base de datos
- **pg** - Driver PostgreSQL para Node.js
- **CORS** - Manejo de solicitudes cross-origin
- **dotenv** - Gestión de variables de entorno

### Frontend

- **React 18** - Librería UI
- **React Router v6** - Enrutamiento
- **Vite** - Bundler y servidor de desarrollo
- **Tailwind CSS** - Framework de estilos
- **Fetch API** - Llamadas HTTP

## 📝 Variables de Entorno

Crear un archivo `.env` en la carpeta `server/`:

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=catalogo_autos
```

## 🐛 Troubleshooting

### Error: "Cannot connect to database"

- Verifica que PostgreSQL esté corriendo
- Comprueba las credenciales en `.env`
- Asegúrate de que la base de datos `catalogo_autos` existe

### Error: "CORS error"

- El frontend está intentando acceder al backend
- Verifica que el servidor Express está corriendo en `http://localhost:5000`
- Revisa la configuración de CORS en `server.js`

### Error: "Images not loading"

- Las URLs de imágenes usan Unsplash
- Si no hay conexión a internet, servirá una imagen placeholder

## 📦 Scripts Disponibles

### Backend

```bash
npm start      # Iniciar servidor
npm run dev    # Iniciar con nodemon (reload automático)
```

### Frontend

```bash
npm run dev     # Iniciar servidor de desarrollo
npm run build   # Crear build para producción
npm run preview # Vista previa del build
```

## 🎯 Próximos Pasos (Opcionales)

1. Agregar autenticación de usuarios
2. Implementar carrito de compras
3. Agregar sistema de comentarios/reseñas
4. Mejorar búsqueda con Elasticsearch
5. Implementar pagos con Stripe
6. Agregar panel de administrador

## 📄 Licencia

MIT - Libre para usar y modificar

## 👨‍💻 Autor

Generado como plantilla Full Stack completa

---

**Última actualización**: 7 de enero de 2026
