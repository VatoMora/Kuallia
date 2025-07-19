# Simula - Frontend Setup

## Configuración del Frontend Angular

### 1. Instalación de Dependencias

```bash
cd "C:\GIT\UTEL Hackaton\Simula-\web\SimulaWeb"
npm install
```

### 2. Configuración del Backend

Asegúrate de que el backend Spring Boot esté ejecutándose en `http://localhost:8080`.

#### Iniciar el Backend:
```bash
cd "C:\GIT\UTEL Hackaton\Simula-\api\Simula"
mvn spring-boot:run
```

### 3. Configuración de la Base de Datos

#### Cargar datos de ejemplo:
```sql
-- Ejecutar en MySQL Workbench o línea de comandos
-- El archivo está en: src/assets/sample-data.sql
```

### 4. Ejecutar el Frontend

```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

## Características Implementadas

### ✅ Servicios Conectados al Backend
- **UsuarioService**: Gestión de usuarios (`/api/usuarios`)
- **RetoService**: Gestión de retos (`/api/retos`)
- **CapsulaService**: Gestión de cápsulas (`/api/capsulas`)
- **RespuestaService**: Gestión de respuestas (`/api/respuestas`)

### ✅ Componentes Funcionales
- **Dashboard**: Métricas y estadísticas en tiempo real
- **Retos**: Lista de retos con modal para responder
- **Cápsulas**: Visualización de casos de éxito y errores comunes
- **Navegación**: Rutas configuradas correctamente

### ✅ Funcionalidades Principales
- **Carga de datos reales** desde la API REST
- **Responder retos** con feedback inmediato
- **Buscar retos** por título
- **Filtrar cápsulas** por tipo (ÉXITO/ERROR)
- **Estados de carga** y manejo de errores
- **Interfaz responsive** con Bootstrap 5

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Dashboard principal
│   │   └── navbar/             # Barra de navegación
│   ├── modules/
│   │   └── emprendedor/
│   │       └── components/
│   │           ├── emprendedor-retos/     # Lista de retos
│   │           ├── emprendedor-capsulas/  # Lista de cápsulas
│   │           └── emprendedor-historial/ # Historial de respuestas
│   ├── services/               # Servicios HTTP
│   ├── models/                 # Interfaces TypeScript
│   └── assets/                 # Recursos estáticos
```

## Navegación

- **Dashboard**: `/dashboard` - Métricas y estadísticas
- **Retos**: `/retos` - Lista de retos disponibles
- **Cápsulas**: `/capsulas` - Casos de éxito y errores comunes
- **Historial**: `/historial` - Historial de respuestas del usuario

## Datos de Ejemplo

El archivo `sample-data.sql` incluye:
- 5 usuarios (1 admin, 4 emprendedores)
- 5 retos sobre emprendimiento
- 6 cápsulas (3 de éxito, 3 de errores)
- 13 respuestas de ejemplo

## Pruebas

### Probar la Conexión al Backend:
1. Asegúrate de que el backend esté corriendo
2. Abre la aplicación en `http://localhost:4200`
3. Ve al dashboard - debe mostrar estadísticas reales
4. Ve a "Retos" - debe cargar la lista de retos
5. Responde un reto - debe mostrar retroalimentación
6. Ve a "Cápsulas" - debe mostrar casos de éxito y errores

### Verificar Funcionalidades:
- ✅ Cargar datos del backend
- ✅ Responder retos con feedback
- ✅ Buscar retos por título
- ✅ Filtrar cápsulas por tipo
- ✅ Mostrar estadísticas en dashboard
- ✅ Navegación entre secciones

## Solución de Problemas

### Error de CORS:
Si hay problemas de CORS, verifica que el backend tenga configurado:
```java
@CrossOrigin(origins = "http://localhost:4200")
```

### Error de Conexión:
Verifica que el backend esté corriendo en `http://localhost:8080/api`

### Datos Vacíos:
Asegúrate de haber ejecutado el script `sample-data.sql` en la base de datos.

## Próximos Pasos

Para extender la funcionalidad:
1. Agregar autenticación de usuarios
2. Implementar un sistema de puntos/recompensas
3. Añadir más tipos de retos
4. Crear panel de administración completo
5. Agregar gráficos y análisis avanzados
