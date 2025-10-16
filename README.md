# 🎵 MusicTasks

Una aplicación web inteligente para la gestión de tareas musicales potenciada por Inteligencia Artificial, diseñada para estudiantes y profesionales de la música.

## 📋 Descripción

MusicTasks es una plataforma innovadora que combina la gestión de tareas musicales con la potencia de la Inteligencia Artificial de OpenAI. La aplicación ayuda a los usuarios a organizar sus tareas de estudio musical y recibir sugerencias personalizadas de práctica, además de proporcionar un asistente virtual para resolver dudas musicales.

## ✨ Características Principales

### 🤖 Agente de IA Integrado

- **Sugerencias Inteligentes de Estudio**: El agente de IA analiza tus tareas musicales y genera recomendaciones personalizadas de estudio basadas en tus objetivos y necesidades.
- **Chat Musical Interactivo**: Asistente de IA especializado en música que responde preguntas sobre teoría musical, técnicas, historia y más.

### 📝 Gestión de Tareas

- Creación, edición y eliminación de tareas musicales
- Almacenamiento local mediante LocalStorage
- Interfaz intuitiva y fácil de usar

### 🔗 Recursos y Recomendaciones

- Integración con proyectos relacionados del desarrollador
- Enlaces a tienda de música
- Recursos interactivos para el aprendizaje musical
- Contenido educativo curado

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Framework**: Angular 18.1.3
- **Estilos**: Tailwind CSS
- **Almacenamiento**: LocalStorage

### Backend

- **Framework**: NestJS
- **IA**: OpenAI API

### Herramientas de Desarrollo

- Angular CLI
- TypeScript
- Node.js

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI (`npm install -g @angular/cli`)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/JuanAndreAV/musictasks.git
cd musictasks
```

1. **Instalar dependencias**

```bash
npm install
```

1. **Configurar variables de entorno**

Crea o edita el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000' // URL de tu API NestJS
};
```

Para producción, edita `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-produccion.com' // URL de tu API en producción
};
```

1. **Iniciar el servidor de desarrollo**

```bash
ng serve
```

1. **Acceder a la aplicación**
   Navega a `http://localhost:4200/` en tu navegador.

## 🚀 Uso

### Servidor de Desarrollo

```bash
ng serve
```

La aplicación se recargará automáticamente si modificas algún archivo fuente.

### Construcción para Producción

```bash
ng build
```

Los artefactos de construcción se almacenarán en el directorio `dist/`.

### Ejecutar Pruebas

```bash
# Pruebas unitarias
ng test

# Pruebas end-to-end
ng e2e
```

## 📖 Funcionalidades Detalladas

### Gestión de Tareas Musicales

1. **Crear Tareas**: Agrega nuevas tareas de estudio con detalles específicos
1. **Organizar**: Visualiza y administra todas tus tareas en un solo lugar
1. **Persistencia**: Todas las tareas se guardan localmente en tu navegador

### Sugerencias de IA

- El agente analiza tus tareas pendientes
- Genera un plan de estudio personalizado
- Proporciona recomendaciones basadas en prioridades y objetivos

### Chat Musical

- Haz preguntas sobre teoría musical
- Solicita consejos de práctica
- Obtén explicaciones sobre conceptos musicales complejos
- Recibe orientación sobre técnicas instrumentales

## 🔧 Arquitectura del Proyecto

### Interfaces

- **tareas.ts**: Define la estructura de datos para las tareas musicales

### Pages (Páginas)

- **home**: Página principal de la aplicación
- **form**: Formulario para crear y editar tareas musicales
- **ai-suggestions**: Vista de sugerencias generadas por IA
- **categorias**: Organización de tareas por categorías
- **recomendados**: Página con recomendaciones de recursos musicales
- **shared**: Componentes reutilizables entre páginas

### Services (Servicios)

- **ai.service.ts**: Maneja la comunicación con la API de OpenAI para sugerencias y chat
- **tareas.service.ts**: Gestiona las operaciones CRUD de tareas y LocalStorage

### Environments

- Configuración de `apiUrl` para conectar con el backend NestJS

```bash
# Generar un nuevo componente
ng generate component nombre-componente

# Generar un servicio
ng generate service nombre-servicio

# Generar otros elementos
ng generate directive|pipe|service|class|guard|interface|enum|module

# Ayuda
ng help
```

## 🌐 API Backend

Este proyecto utiliza una API REST desarrollada en NestJS que gestiona:

- Integración con OpenAI
- Procesamiento de solicitudes del agente de IA
- Gestión del chat musical

## 🎨 Estilos y UI

La interfaz está diseñada con **Tailwind CSS**, proporcionando:

- Diseño responsivo y adaptable
- Experiencia de usuario moderna y atractiva
- Componentes estilizados y consistentes

## 🔗 Proyectos Relacionados

La aplicación incluye enlaces a otros proyectos del desarrollador:

- Tienda de música online
- Recursos interactivos para el aprendizaje musical
- Contenido educativo complementario

## 📝 Estructura del Proyecto

```
musictasks/
├── src/
│   ├── app/
│   │   ├── interfaces/
│   │   │   └── tareas.ts           # Interface para las tareas musicales
│   │   ├── pages/
│   │   │   ├── ai-suggestions/     # Página de sugerencias de IA
│   │   │   ├── categorias/         # Página de categorías
│   │   │   ├── form/               # Formulario de tareas
│   │   │   ├── home/               # Página principal
│   │   │   ├── recomendados/       # Página de recomendaciones
│   │   │   └── shared/             # Componentes compartidos
│   │   ├── services/
│   │   │   ├── ai.service.ts       # Servicio de integración con IA
│   │   │   └── tareas.service.ts   # Servicio de gestión de tareas
│   │   └── app.component.ts
│   ├── assets/                     # Recursos estáticos
│   └── environments/               # Variables de entorno (apiUrl)
├── package.json
└── angular.json
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir:

1. Fork el proyecto
1. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
1. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
1. Push a la rama (`git push origin feature/AmazingFeature`)
1. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo LICENSE.

## 👤 Autor

**Juan Andrés Álvarez Velásquez (JuanitoCode)**

- GitHub: [@JuanAndreAV](https://github.com/JuanAndreAV)

## 🙏 Agradecimientos

- OpenAI por proporcionar la API de IA
- La comunidad de Angular por el excelente framework
- Todos los músicos que inspiran el desarrollo de herramientas educativas

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio de GitHub.

-----

**Hecho con ❤️ para la comunidad musical**