# 🔐 Credenciales de Usuarios Demo - Simula

## Usuarios creados para pruebas:

### 👤 Usuario Emprendedor #1
- **Email:** `demo@simula.com`
- **Contraseña:** `demo123`
- **Nombre:** Juan Pérez Demo
- **Rol:** EMPRENDEDOR
- **Saldo:** $1,000.00
- **Nivel:** 1

### 👨‍💼 Usuario Administrador
- **Email:** `admin@simula.com`
- **Contraseña:** `admin123`
- **Nombre:** Admin Demo
- **Rol:** ADMIN
- **Saldo:** $5,000.00
- **Nivel:** 5

### 👤 Usuario Emprendedor #2
- **Email:** `maria@simula.com`
- **Contraseña:** `maria123`
- **Nombre:** María García
- **Rol:** EMPRENDEDOR
- **Saldo:** $750.00
- **Nivel:** 2

## 🚀 Instrucciones de uso:

1. **Inicia el servidor Angular:**
   ```bash
   ng serve
   ```

2. **Accede a la aplicación:**
   - Ve a `http://localhost:4200`
   - Serás redirigido automáticamente a `/login`

3. **Prueba el login:**
   - Usa cualquiera de las credenciales de arriba
   - Después del login exitoso, serás redirigido al dashboard
   - El navbar mostrará tu nombre real y tu rol

4. **Prueba las funcionalidades:**
   - **Navbar:** Muestra el nombre del usuario autenticado
   - **Dropdown de usuario:** Muestra email, rol y opciones
   - **Cerrar sesión:** Elimina la sesión y redirige a login
   - **Rutas protegidas:** Solo accesibles si estás autenticado
   - **Roles:** Los usuarios ADMIN ven opciones adicionales

## 🔧 Configuración de Base de Datos:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/DBSimula?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=v4t0m0r4*
```

## 📋 Notas importantes:

- Las contraseñas están en **texto plano** (solo para desarrollo)
- La sesión se guarda en **localStorage**
- La autenticación funciona sin JWT (implementación básica)
- Si el endpoint `/api/usuarios/login` no existe, se simula con `/api/usuarios`
- Todas las rutas importantes están protegidas con **AuthGuard**

## 🧪 Casos de prueba:

1. **Login exitoso:** Usa `demo@simula.com` / `demo123`
2. **Login como admin:** Usa `admin@simula.com` / `admin123`
3. **Login inválido:** Usa `test@test.com` / `wrong` (debe fallar)
4. **Logout:** Haz click en "Cerrar Sesión" en el dropdown
5. **Rutas protegidas:** Intenta acceder a `/dashboard` sin login
6. **Persistencia:** Recarga la página después del login (debe mantenerse)

¡El sistema de login está listo para usar! 🎉
