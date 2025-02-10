# 🚀 100 Apps JS en 100 Días

Un reto personal para crear 100 aplicaciones únicas usando JavaScript puro en 100 días. Cada aplicación es funcional, moderna y con un diseño minimalista que se adapta a tus preferencias de color.

## ✨ Características

- 🎨 **Diseño Moderno**: Inspirado en javascript100.dev pero con estilo único
- 🌙 **Dark/Light Mode**: Toggle automático con persistencia en localStorage
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- ⚡ **JavaScript Puro**: Sin frameworks, solo HTML, CSS y JavaScript vanilla
- 🧭 **Navegación Intuitiva**: Página principal con cards y navegación fluida entre apps
- 🔧 **Fácil de Extender**: Estructura modular para agregar nuevas apps rápidamente

## 📁 Estructura del Proyecto

```
📂 100JsApp/
├── 📄 README.md                 # Documentación del proyecto
├── 📂 src/                      # Código fuente principal
│   ├── 🌐 index.html            # Página principal (Home)
│   ├── 🎨 style.css             # Estilos globales + dark/light mode
│   ├── ⚙️ main.js               # Lógica global y navegación
│   └── 📂 apps/                 # Todas las aplicaciones
│       ├── 📂 dia-001/          # App #1: Contador
│       │   ├── 🌐 index.html    # HTML de la app
│       │   ├── ⚙️ app.js        # Lógica específica de la app
│       │   ├── 🎨 app.css       # Estilos específicos de la app
│       │   ├── 📄 README.md     # Documentación de la app
│       │   └── 📂 assets/       # Recursos estáticos (opcional)
│       │       └── 🖼️ imag.png
│       ├── 📂 dia-002/          # App #2: Generador de Colores
│       └── 📂 dia-003/          # App #3: Calculadora
└── 📂 assets/                   # Recursos estáticos (opcional)
    ├── 🖼️ favicon.ico
    └── 🖼️ logo.svg
```

## 🛠️ Tecnologías Utilizadas

- 🌐 **HTML5**: Estructura semántica y accesible
- 🎨 **CSS3**: Variables CSS, Flexbox, Grid, animaciones, responsive
- ⚡ **JavaScript ES6+**: Módulos, funciones modernas, LocalStorage, DOM manipulation

## 🚀 Cómo Usar

### 1. 👀 Ver el Proyecto
Abre el archivo principal en tu navegador: `src/index.html`

### 2. 🧭 Navegar entre Apps
- 🏠 **Página Principal**: Lista todas las apps disponibles
- 🔙 **Cada App**: Tiene botón 'Volver' para regresar al home
- 🌙 **Dark/Light Mode**: Toggle en la esquina superior derecha

## 🌐 Despliegue en GitHub Pages

### Opción 1: 🚀 Despliegue Automático
1. Fork este repositorio en tu cuenta de GitHub
2. Ve a Settings → Pages
3. Selecciona Source: 'Deploy from a branch'
4. Selecciona Branch: 'main' o 'master'
5. Selecciona Folder: '/ (root)'
6. Haz clic en Save
7. Espera unos minutos y tu sitio estará disponible en:
   https://soufian3raki.github.io/100JsApp

### Opción 2: 🔧 Despliegue Manual
1. Clona el repositorio:
   ```properties
   git clone https://github.com/soufian3raki/100JsApp.git
   cd 100JsApp
   ```

2. Configura Git (si es la primera vez):
   ```properties
   git config --global user.name 'Tu Nombre'
   git config --global user.email 'tu-email@ejemplo.com'
   ```

3. Sube los cambios:
   ```properties
   git add .
   git commit -m 'Initial commit'
   git push origin main
   ```

4. Activa GitHub Pages en la configuración del repositorio

### Opción 3: 🖥️ Usando GitHub CLI
```properties
# Instalar GitHub CLI
# Windows: winget install GitHub.cli
# macOS: brew install gh
# Linux: apt install gh

# Autenticarse
gh auth login

# Crear repositorio y subir
gh repo create 100JsApp --public
git remote add origin https://github.com/soufian3raki/100JsApp.git
git push -u origin main

# Activar GitHub Pages
gh api repos/soufian3raki/100JsApp/pages --method POST --field source[branch]=main --field source[path]=/
```

## 📱 Apps Incluidas (Día 1-60)

### 🟢 Apps Básicas (1-25)
   [x] Contador - Contador básico con botones + y -


## 📋 Lista Completa de 100 Apps

<details>
   <summary><b>🟢 FÁCIL (1–30): Proyectos pequeños para calentar</b></summary>

   1. Contador - Contador básico con botones + y -
   2. Conversor de divisas - Conversión entre monedas
   3. Reloj digital / analógico - Reloj en tiempo real
   4. Temporizador (countdown) - Cuenta regresiva
   5. Cronómetro - Cronómetro con start/stop/reset
   6. Generador de contraseñas - Contraseñas seguras aleatorias
   7. App de notas (localStorage) - Notas persistentes
   8. Lista de tareas (To-do) - Gestión de tareas
   9. Juego del ahorcado - Juego clásico
   10. Piedra, papel o tijera - Juego simple
   11. Juego de memoria (cards flip) - Memoria con cartas
   12. App de clima (API básica) - Información del clima
   13. Conversor de unidades - Peso, temperatura, etc.
   14. Generador de frases motivadoras - Frases aleatorias
   15. App de citas célebres - Citas famosas
   16. Lector RSS simple - Lectura de feeds
   17. Quiz de preguntas - Preguntas con puntuación
   18. Lector de archivos JSON - Visualización de JSON
   19. Editor de texto tipo Notepad - Editor básico
   20. Controlador de gastos personales - Gestión de gastos
   21. Juego de Tic-Tac-Toe (gato) - Tres en línea
   22. Reproductor de audio simple - Player básico
   23. Editor de imágenes básico (Canvas) - Edición simple
   24. Validador de formularios - Validación en tiempo real
   25. Detector de palíndromos - Detección de palíndromos
   26. Contador de palabras y caracteres - Análisis de texto
   27. App de recetas - Recetas de cocina
   28. Conversor de colores HEX/RGB - Conversión de colores
   29. App de sorteo aleatorio - Sorteador de nombres
   30. Juego de dados aleatorios - Simulador de dados
</details>

<details>
   <summary><b>🟡 INTERMEDIO (31–70): Apps completas con lógica más robusta</b></summary>
   
   31. Chat offline simulado con bots - Chat con respuestas automáticas
   32. App de calendario - Calendario interactivo
   33. Cronograma interactivo con eventos - Gestión de eventos
   34. Administrador de tareas con categorías - Tareas organizadas
   35. App de gastos con gráficos - Gráficos de gastos
   36. Editor de Markdown en vivo - Editor con preview
   37. Juego de Sudoku - Sudoku completo
   38. App de lector de código QR - Lectura de QR
   39. Generador de memes - Creación de memes
   40. Juego de Snake - Juego clásico
   41. App de hábitos diarios - Seguimiento de hábitos
   42. Juego de blackjack - Blackjack completo
   43. Simulador de inversión en bolsa - Simulación de trading
   44. Generador de CV en PDF - CV generador
   45. Calculadora de IMC - Cálculo de IMC
   46. App de seguimiento de libros leídos - Biblioteca personal
   47. Portafolio editable tipo CMS - CMS simple
   48. Reproductor de video personalizado - Player de video
   49. App de notas con etiquetas y búsqueda - Notas avanzadas
   50. Organizador de contraseñas - Gestor de contraseñas
   51. Simulador de préstamos - Cálculo de préstamos
   52. Lector de archivos CSV con gráficos - Análisis de datos
   53. Convertidor de voz a texto - Speech to text
   54. App de votaciones con resultados - Sistema de votos
   55. Visor de imágenes con zoom - Galería de imágenes
   56. Juego de preguntas con niveles - Quiz avanzado
   57. Simulador de carrito de compras - E-commerce simulado
   58. Generador de código de barras - Códigos de barras
   59. App de recetas con buscador - Recetas con filtros
   60. Cronograma de estudio - Planificador de estudio
   61. App de recordatorios - Notificaciones locales
   62. Calculadora científica - Calculadora avanzada
   63. Juego de cartas tipo solitario - Solitario
   64. Editor de gráficos vectoriales - Editor SVG
   65. Simulador de criptomonedas - Precios de crypto
   66. Generador de mapas mentales - Mapas conceptuales
   67. Juego de laberinto - Laberinto interactivo
   68. App de seguimiento de series - Gestión de contenido
   69. Simulador de entrevistas técnicas - Práctica de entrevistas
   70. Simulador de horarios de transporte - Horarios de buses
</details>

<details>
   <summary><b>🔴 DIFÍCIL (71–100): Proyectos desafiantes, nivel experto</b></summary>

   71. Sistema de reservas de citas - Gestión de citas
   72. WebApp de gestión de inventario - Inventario con IndexedDB
   73. Juego tipo RPG por turnos - RPG simple
   74. Simulador de bolsa con histórico - Trading con gráficas
   75. App de edición de fotos - Editor de imágenes
   76. Dashboard de analítica - Múltiples gráficos
   77. App de organización de proyectos - Tipo Trello
   78. Juego de ajedrez con IA básica - Ajedrez con IA
   79. CMS ligero sin backend - CMS local
   80. Plataforma de cursos - Cursos online
   81. Gestor de archivos con drag & drop - File manager
   82. Editor de presentaciones - Tipo PowerPoint
   83. App de colaboración en tiempo real - WebRTC
   84. Simulador de terminal de comandos - Terminal web
   85. App de mapa interactivo - Mapas con Leaflet
   86. Intérprete de lenguaje simple - Lenguaje básico
   87. Juego de plataformas - Plataformas con física
   88. Red social simulada - Posts, likes, comments
   89. Sistema de votaciones anónimas - Votaciones seguras
   90. Sistema de seguimiento de hábitos - Hábitos con reportes
   91. Simulador de chat en vivo - Chat con sockets
   92. Visualizador de algoritmos - Algoritmos animados
   93. Juego de Tetris - Tetris completo
   94. Juego de Conecta 4 con IA - Conecta 4
   95. App de diseño de UI - Drag & drop UI
   96. Dashboard financiero personal - Finanzas avanzadas
   97. Plataforma de encuestas - Encuestas y formularios
   98. WebApp para landing pages - Generador de landing
   99. Intérprete visual de regex - Regex visual
   100. Sistema de gestión escolar - Gestión educativa
</details>

## 🤝 Contribuir

Si quieres contribuir o tienes ideas para nuevas apps:

1. 🍴 Fork el proyecto
2. 🌿 Crea una rama para tu feature (`git checkout -b feature/nueva-app`)
3. 🛠️ Crea la nueva app siguiendo la estructura
4. 📝 Actualiza la documentación
5. 💾 Commit tus cambios (`git commit -m 'Add nueva app'`)
6. 🚀 Push a la rama (`git push origin feature/nueva-app`)
7. 🔄 Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🔗 Enlaces Útiles

- 🌐 **Demo en vivo**: [GitHub Pages](https://soufian3raki.github.io/100JsApp)
- 📂 **Repositorio**: [GitHub](https://github.com/soufian3raki/100JsApp)
- 💡 **Inspiración**: [javascript100.dev](https://javascript100.dev/)

---

**🚀 ¡Disfruta creando y aprendiendo con JavaScript!**

*💡 Inspirado en javascript100.dev por midudev*
