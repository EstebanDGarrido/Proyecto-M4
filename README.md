# 🛒 E-commerce Backend (NestJS + TypeORM)

> **Proyecto backend para una aplicación de E-commerce**, desarrollado con **NestJS**, **TypeORM** y **PostgreSQL**.  
> Incluye autenticación JWT, gestión de usuarios, productos, categorías y órdenes, con documentación completa en Swagger.  
> ¡Fácil de clonar, configurar y desplegar!

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![UUID Tools](https://img.shields.io/badge/UUID_Tools-4A90E2?style=for-the-badge&logo=uuid&logoColor=white)](https://www.uuidtools.com/v4)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://console.cloudinary.com/)
[![bcrypt](https://img.shields.io/badge/bcrypt-FF6B35?style=for-the-badge&logo=lock&logoColor=white)](https://bcrypt.online/)
[![JWT.io](https://img.shields.io/badge/JWT.io-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://www.jwt.io/)

---

## 📑 Índice

- [🛒 E-commerce Backend (NestJS + TypeORM)](#-e-commerce-backend-nestjs--typeorm)
  - [📑 Índice](#-índice)
  - [🚀 Prerrequisitos](#-prerrequisitos)
  - [🌀 Clonar el repositorio](#-clonar-el-repositorio)
  - [📦 Instalar dependencias](#-instalar-dependencias)
  - [⚙️ Variables de entorno](#️-variables-de-entorno)
  - [🧱 Configuración de base de datos](#-configuración-de-base-de-datos)
  - [🧰 Scripts disponibles](#-scripts-disponibles)
  - [🚀 Levantar la aplicación](#-levantar-la-aplicación)
  - [📘 Documentación Swagger](#-documentación-swagger)
  - [🌱 Seeders (datos iniciales)](#-seeders-datos-iniciales)
  - [🔑 Endpoints principales](#-endpoints-principales)
    - [🧍‍♂️ Auth](#️-auth)
      - [➕ Registro (Signup)](#-registro-signup)
      - [🔐 Login (Signin)](#-login-signin)
    - [🛍️ Products](#️-products)
    - [🏷️ Categories](#️-categories)
    - [📦 Orders](#-orders)
    - [👥 Users (Admin only)](#-users-admin-only)
  - [🧾 Uso del token JWT](#-uso-del-token-jwt)
  - [🧪 Ejemplos curl](#-ejemplos-curl)
      - [Signup](#signup)
      - [Signin](#signin)
      - [Crear orden (con token)](#crear-orden-con-token)
  - [🧯 Troubleshooting](#-troubleshooting)
  - [🚧 Siguientes pasos](#-siguientes-pasos)
  - [📜 Licencia](#-licencia)
  - [📸 Diagrama ER](#-diagrama-er)

---

## 🚀 Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas en tu máquina:

- **Node.js** >= 24.12.0 (verifica con `node -v`)
- **npm** (viene con Node.js)
- **PostgreSQL** (local o en Docker: `docker run --name postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres`)
- **Insomnia** o **Postman** (para probar la API)

💡 **Tip**: Si usas Docker para Postgres, expón el puerto 5432.

---

## 🌀 Clonar el repositorio

```bash
git clone https://github.com/EstebanDGarrido/PM4BE-EstebanDGarrido.git
cd PM4BE-EstebanDGarrido
cd back/ecommerce-esteban-dgarrido
```

---

## 📦 Instalar dependencias

Ejecuta el siguiente comando para instalar todas las dependencias:

```bash
npm install
```

🔍 Puedes revisar las versiones exactas en [`package.json`](./package.json). Incluye librerías como `@nestjs/jwt`, `bcrypt`, `class-validator` y `@nestjs/swagger`.

---

## ⚙️ Variables de entorno

Crea un archivo `.env.development` en la raíz del proyecto (`back/ecommerce-esteban-dgarrido/.env.development`) con el siguiente contenido:

```env
PORT=3000
HOST=localhost

DB_NAME=ecommerce_ft68
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=ingresar_password

CLOUDINARY_CLOUD_NAME='ingresar_cloud_name'
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET='ingresar_api_secret'

JWT_SECRET='Ingrese la clave secreta'

POSTGRES_PASSWORD='Clave de Docker(DB_PASSWORD)'
POSTGRES_DB=ecommerce_ft66
```

⭐ **Ejemplo completo**: Revisa [`.env.example`](./back/ecommerce-esteban-dgarrido/.env.example) para más detalles.

⚠️ **Importante**: Nunca subas `.env.development` a Git. Está en `.gitignore`.

---

## 🧱 Configuración de base de datos

1. **Crea la base de datos** en PostgreSQL:

   ```sql
   CREATE DATABASE ecommerce_db;
   ```

2. **Verifica credenciales**: Asegúrate de que coincidan con tu `.env`.

3. **Sincronización automática**: Con `synchronize: true` en `app.module.ts`, las tablas se crean automáticamente al iniciar la app.

💡 **En producción**: Usa migraciones de TypeORM en lugar de `synchronize`.

---

## 🧰 Scripts disponibles

| Comando             | Descripción                     |
| ------------------- | ------------------------------- |
| `npm run start`     | Ejecuta el proyecto compilado   |
| `npm run start:dev` | Modo desarrollo con hot reload  |
| `npm run build`     | Compila TypeScript a JavaScript |
| `npm run lint`      | Ejecuta linter (ESLint)         |
| `npm run test`      | Ejecuta pruebas unitarias       |

---

## 🚀 Levantar la aplicación

Ejecuta el servidor en modo desarrollo:

```bash
npm run start:dev
```

Por defecto, estará disponible en:
👉 **http://localhost:3000**

🎉 ¡La app está lista! Verifica en tu navegador o con `curl http://localhost:3000`.

---

## 📘 Documentación Swagger

Accede a la documentación interactiva de la API:
👉 **http://localhost:3000/api**

Incluye:

- **Auth**: Registro y login.
- **Users**: Gestión de usuarios (protegido con JWT y roles).
- **Products**: Lista de productos con paginación.
- **Categories**: Lista de categorías.
- **Orders**: Crear y obtener órdenes (protegido).

💡 **Protegido**: Endpoints marcados con 🔒 requieren token JWT.

---

## 🌱 Seeders (datos iniciales)

Carga datos de ejemplo para desarrollo:

- **Cargar categorías**:

  ```http
  GET /categories/seeder
  ```

- **Cargar productos**:
  ```http
  GET /products/seeder
  ```

⚠️ **Nota**: Solo para desarrollo. En producción, protege estos endpoints.

---

## 🔑 Endpoints principales

### 🧍‍♂️ Auth

#### ➕ Registro (Signup)

```http
POST /auth/signup
Content-Type: application/json
```

**Body**:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Aa123456!",
  "confirmPassword": "Aa123456!",
  "phone": 3001234567,
  "address": "Calle Demo 123",
  "country": "Colombia",
  "city": "Medellín"
}
```

**Respuesta** (201):

```json
{
  "message": "Usuario creado exitosamente",
  "user": { "id": "...", "name": "Test User", ... }
}
```

#### 🔐 Login (Signin)

```http
POST /auth/signin
Content-Type: application/json
```

**Body**:

```json
{
  "email": "test@example.com",
  "password": "Aa123456!"
}
```

**Respuesta** (200):

```json
{
  "message": "Usuario Logueado",
  "token": "Bearer eyJhbGciOiJI..."
}
```

### 🛍️ Products

- **Listar productos** (con paginación):

  ```http
  GET /products?page=1&limit=5
  ```

  **Respuesta** (200): Array de productos.

- **Seeder productos**:
  ```http
  GET /products/seeder
  ```

### 🏷️ Categories

- **Listar categorías**:

  ```http
  GET /categories
  ```

  **Respuesta** (200): Array de categorías.

- **Seeder categorías**:
  ```http
  GET /categories/seeder
  ```

### 📦 Orders

- **Crear orden** 🔒:

  ```http
  POST /orders
  Authorization: Bearer <token>
  Content-Type: application/json
  ```

  **Body**:

  ```json
  {
    "userId": "c7d9c17d-bb19-4f87-b05a-9de7f14567b3",
    "products": [
      { "id": "a9b3c7d2-ff29-4a32-93b8-0a1d4c82a111" },
      { "id": "b6d2c5a3-cc22-4837-81f0-9b8a7f6c8222" }
    ]
  }
  ```

  **Respuesta** (201): Detalles de la orden creada.

- **Obtener orden por ID** 🔒:
  ```http
  GET /orders/:id
  Authorization: Bearer <token>
  ```
  **Respuesta** (200): Detalles de la orden.

### 👥 Users (Admin only)

- **Listar usuarios** 🔒 (Admin):

  ```http
  GET /users?page=1&limit=5
  Authorization: Bearer <token>
  ```

- **Obtener usuario por ID** 🔒:

  ```http
  GET /users/:id
  Authorization: Bearer <token>
  ```

- **Actualizar usuario** 🔒:

  ```http
  PUT /users/:id
  Authorization: Bearer <token>
  ```

- **Eliminar usuario** 🔒:
  ```http
  DELETE /users/:id
  Authorization: Bearer <token>
  ```

---

## 🧾 Uso del token JWT

1. **Inicia sesión** en `/auth/signin` y copia el `token`.
2. **Agrega el header** en requests protegidas:
   ```
   Authorization: Bearer <token>
   ```
3. **Ejemplo en Postman**:
   - Header: `Authorization` → `Bearer eyJhbGciOiJI...`

⚠️ **Expiración**: Tokens expiran en 1 hora (configurable en `.env`).

---

## 🧪 Ejemplos curl

#### Signup

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo","email":"demo@mail.com","password":"Aa123456!","confirmPassword":"Aa123456!","phone":3001234567,"address":"Calle 1","country":"Colombia","city":"Medellín"}'
```

#### Signin

```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@mail.com","password":"Aa123456!"}'
```

#### Crear orden (con token)

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu-token>" \
  -d '{"userId":"<user-uuid>","products":[{"id":"<prod-uuid>"}]}'
```

---

## 🧯 Troubleshooting

| Problema                 | Posible causa                    | Solución                                   |
| ------------------------ | -------------------------------- | ------------------------------------------ |
| ❌ Error DB Connection   | Credenciales o puerto incorrecto | Verifica `.env` y que Postgres esté activo |
| ⚠️ Token no válido       | Secret distinto o expirado       | Revisa `JWT_SECRET` y `JWT_EXPIRES_IN`     |
| 🧱 Seeder no carga       | Datos faltantes                  | Carga categorías antes de productos        |
| 🌀 Error TS o duplicados | Compilación vieja                | Elimina `/dist` y ejecuta `npm run build`  |
| 🔒 403 Forbidden         | Rol insuficiente                 | Usa token de Admin para endpoints de users |

---

## 🚧 Siguientes pasos

- ✅ Implementar transacciones al crear órdenes (manejo de stock + orderDetails).
- 🔄 Crear roles adicionales (superAdmin).
- 🛡️ Proteger endpoints de seeding en producción.
- 📄 Añadir paginación avanzada y filtros.
- 📚 Mejorar documentación Swagger (@ApiResponse, @ApiTags completos).
- 🧪 Agregar tests unitarios (services / repositories).
- 🚀 Desplegar en producción (Vercel, Railway o AWS).

---

## 📜 Licencia

Este proyecto está bajo **licencia MIT**.  

---

## 📸 Diagrama ER

<img src="./Assets/DER.png" alt="Diagrama Entidad-Relación del e-commerce" width="600"/>


