# Simula API - Backend Spring Boot

API REST para el sistema de retos y usuarios del Hackaton UTEL.

## Características

- **Spring Boot 3** con Java 17
- **Spring Data JPA** para persistencia
- **MySQL** como base de datos
- **Lombok** para reducir código boilerplate
- **Arquitectura RESTful**

## Entidades

### Usuario
- `id`: ID único
- `nombre`: Nombre del usuario
- `email`: Email único
- `password`: Contraseña
- `rol`: ADMIN o EMPRENDEDOR
- `saldo`: Saldo del usuario
- `nivel`: Nivel actual del usuario

### Reto
- `id`: ID único
- `titulo`: Título del reto
- `descripcion`: Descripción del reto
- `opcion1`: Primera opción
- `opcion2`: Segunda opción
- `respuestaCorrecta`: 1 o 2 (opción correcta)
- `retroalimentacion`: Mensaje de retroalimentación

### Respuesta
- `id`: ID único
- `usuario`: Usuario que respondió
- `reto`: Reto respondido
- `opcionElegida`: 1 o 2 (opción elegida)
- `esCorrecta`: true/false
- `fechaRespuesta`: Fecha y hora de la respuesta

### Capsula
- `id`: ID único
- `titulo`: Título de la cápsula
- `contenido`: Contenido de la cápsula
- `tipo`: ERROR o EXITO

## Endpoints

### Usuarios (`/api/usuarios`)

- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `GET /api/usuarios/email/{email}` - Obtener usuario por email
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario
- `GET /api/usuarios/rol/{rol}` - Obtener usuarios por rol
- `GET /api/usuarios/nivel/{nivel}` - Obtener usuarios por nivel
- `PUT /api/usuarios/{id}/saldo` - Actualizar saldo
- `PUT /api/usuarios/{id}/nivel` - Actualizar nivel

### Retos (`/api/retos`)

- `GET /api/retos` - Obtener todos los retos
- `GET /api/retos/{id}` - Obtener reto por ID
- `POST /api/retos` - Crear nuevo reto
- `PUT /api/retos/{id}` - Actualizar reto
- `DELETE /api/retos/{id}` - Eliminar reto
- `GET /api/retos/buscar?titulo={titulo}` - Buscar retos por título
- `POST /api/retos/{id}/responder` - Responder un reto
- `GET /api/retos/{id}/respuestas` - Obtener respuestas de un reto

## Configuración

### Base de Datos
Configura tu base de datos MySQL en `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/DBSimula?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=tu_password
```

### Ejecutar la aplicación

1. Asegúrate de tener MySQL corriendo
2. Crea la base de datos `DBSimula`
3. Ejecuta: `mvn spring-boot:run`

La API estará disponible en `http://localhost:8080/api`

## Ejemplos de uso

### Crear un usuario
```json
POST /api/usuarios
{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "rol": "EMPRENDEDOR"
}
```

### Crear un reto
```json
POST /api/retos
{
    "titulo": "Reto de Emprendimiento",
    "descripcion": "¿Cuál es la mejor estrategia para validar una idea de negocio?",
    "opcion1": "Crear un prototipo",
    "opcion2": "Hacer una encuesta",
    "respuestaCorrecta": 1,
    "retroalimentacion": "Crear un prototipo permite validar la idea con usuarios reales"
}
```

### Responder un reto
```json
POST /api/retos/1/responder
{
    "usuarioId": 1,
    "opcionElegida": 1
}
```

## Tecnologías

- Spring Boot 3.5.3
- Spring Data JPA
- MySQL Connector
- Lombok
- Spring Boot Validation
- Spring Boot Web
