# Sistema de Login - Simula

## Implementación completada ✅

### 1. Archivos creados:
- `src/app/core/services/auth.service.ts` - Servicio de autenticación principal
- `src/app/core/guards/auth.guard.ts` - Guard para proteger rutas
- `src/app/components/login/login.component.ts` - Componente de login
- `src/app/components/login/login.component.html` - Template del login
- `src/app/components/login/login.component.css` - Estilos del login
- `src/app/core/services/user.service.ts` - Servicio para operaciones de usuario
- `src/app/core/interceptors/auth.interceptor.ts` - Interceptor HTTP (opcional)

### 2. Archivos modificados:
- `src/app/app.routes.ts` - Rutas con protección AuthGuard
- `src/app/components/navbar/navbar.component.ts` - Integración con AuthService
- `src/app/components/navbar/navbar.component.html` - Logo y marca actualizados
- `src/app/app.component.ts` - Control de visibilidad del navbar
- `src/app/app.component.html` - Mostrar navbar solo si está autenticado

### 3. Funcionalidades:
- ✅ Login con email y contraseña
- ✅ Validación de formularios reactivos
- ✅ Guard para proteger rutas
- ✅ Persistencia de sesión en localStorage
- ✅ Logout funcional
- ✅ Mostrar usuario autenticado en navbar
- ✅ Redirección automática si no está autenticado
- ✅ Soporte para roles (ADMIN/EMPRENDEDOR)

### 4. Flujo de autenticación:
1. Usuario ingresa a la app → Redirección a `/login`
2. Usuario llena formulario de login
3. AuthService intenta login con endpoint `/api/usuarios/login`
4. Si falla, simula login buscando en `/api/usuarios`
5. Si éxito, guarda usuario en localStorage y BehaviorSubject
6. Redirección a `/dashboard` o URL solicitada
7. Navbar muestra información del usuario autenticado

### 5. Endpoints utilizados:
- `POST /api/usuarios/login` (preferido, si existe)
- `GET /api/usuarios` (fallback para simulación)

### 6. Estructura de Usuario:
```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'EMPRENDEDOR';
  saldo: number;
  nivel: number;
}
```

### 7. Próximos pasos recomendados:
- Implementar endpoint `/api/usuarios/login` en el backend
- Agregar hash de contraseñas en el backend
- Implementar registro de usuarios
- Agregar recuperación de contraseña
- Implementar refresh tokens para sesiones más seguras

### 8. Uso:
1. Inicia el servidor Angular: `ng serve`
2. Ve a `http://localhost:4200`
3. Serás redirigido automáticamente a `/login`
4. Usa credentials de la tabla `usuarios` del backend
5. Después del login exitoso, verás el dashboard con el navbar

### 9. Notas importantes:
- La autenticación es básica (sin JWT)
- Las contraseñas se comparan en texto plano (solo para desarrollo)
- La sesión se mantiene en localStorage
- Todos los componentes importantes están protegidos con AuthGuard
