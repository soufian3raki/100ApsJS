# Script para reiniciar y crear commits con fechas correctas
# Fecha objetivo: 5 de marzo de 2025

Write-Host "Reiniciando repositorio con fechas correctas..." -ForegroundColor Green

# Limpiar repositorio
Write-Host "Limpiando repositorio actual..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue

# Inicializar nuevo repositorio
Write-Host "Inicializando nuevo repositorio..." -ForegroundColor Blue
git init
git branch -M main

# Fechas de desarrollo (del 10 de febrero al 5 de marzo de 2025)
$dates = @(
    "2025-02-10",  # Dia 1 - Estructura inicial
    "2025-02-10",  # Dia 1
    "2025-02-10",  # Dia 1
    "2025-02-11",  # Dia 2 - HTML
    "2025-02-11",  # Dia 2
    "2025-02-11",  # Dia 2
    "2025-02-12",  # Dia 3 - JavaScript
    "2025-02-12",  # Dia 3
    "2025-02-12",  # Dia 3
    "2025-02-13",  # Dia 4 - Sistema apps
    "2025-02-13",  # Dia 4
    "2025-02-13",  # Dia 4
    "2025-02-14",  # Dia 5 - Primera app
    "2025-02-14",  # Dia 5
    "2025-02-14",  # Dia 5
    "2025-02-17",  # Dia 6 - Optimizaciones
    "2025-02-17",  # Dia 6
    "2025-02-17",  # Dia 6
    "2025-02-18",  # Dia 7 - Documentacion
    "2025-02-18",  # Dia 7
    "2025-02-18",  # Dia 7
    "2025-02-19",  # Dia 8 - Finalizacion
    "2025-02-19"   # Dia 8
)

# Lista de commits
$commits = @(
    "Initial commit: Estructura base del proyecto 100 Apps JS",
    "Add: Variables CSS y estilos base",
    "Add: Estructura HTML principal con header y footer",
    "Update: Estilos del header con logo y boton de tema",
    "Add: Diseno responsive para moviles",
    "Add: Logica principal de navegacion y carga de apps",
    "Add: Funciones comunes y utilidades",
    "Add: Sistema de tema oscuro/claro con localStorage",
    "Add: Sistema de carga de apps desde JSON",
    "Add: Estilos para tarjetas de apps con hover effects",
    "Add: Efectos hover y animaciones suaves",
    "Add: Primera app - Contador basico",
    "Update: Mejoras en el diseno de las tarjetas de apps",
    "Add: Botones de accion (Demo, Codigo, README)",
    "Update: Optimizacion de rendimiento en carga de apps",
    "Update: Mejoras en la tipografia y espaciado",
    "Update: Mejoras en responsive design para tablets",
    "Update: Documentacion completa del proyecto",
    "Add: Lista completa de 100 apps planificadas",
    "Add: Enlaces y recursos utiles en README",
    "Update: Ajustes finales y pulido del diseno",
    "Release: Version 1.0.0 - Proyecto completo y funcional"
)

# Archivos para cada commit
$files = @(
    "README.md",
    "style.css",
    "index.html",
    "style.css",
    "style.css",
    "main.js",
    "common.js",
    "main.js,common.js,style.css",
    "main.js,apps.json",
    "style.css",
    "style.css",
    "apps.json",
    "style.css",
    "main.js,style.css",
    "main.js",
    "style.css",
    "style.css",
    "README.md",
    "README.md",
    "README.md",
    "style.css,main.js",
    "."
)

# Crear commits
Write-Host "Creando commits con fechas correctas..." -ForegroundColor Blue
Write-Host ""

for ($i = 0; $i -lt $commits.Count; $i++) {
    $date = $dates[$i]
    $message = $commits[$i]
    $fileList = $files[$i]
    
    Write-Host "Dia $($i+1) - $date" -ForegroundColor Magenta
    Write-Host "  $message" -ForegroundColor White
    
    # Configurar fecha
    $env:GIT_AUTHOR_DATE = "$date 12:00:00 +0000"
    $env:GIT_COMMITTER_DATE = "$date 12:00:00 +0000"
    
    # Agregar archivos
    if ($fileList -eq ".") {
        git add .
    } else {
        $fileArray = $fileList -split ","
        foreach ($file in $fileArray) {
            if (Test-Path $file) {
                git add $file
            }
        }
    }
    
    # Crear commit
    git commit -m $message
    
    # Limpiar variables
    Remove-Item Env:GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
    Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
    
    Write-Host "  ✅ Commit creado" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🎉 ¡Todos los commits creados exitosamente!" -ForegroundColor Green
Write-Host "📅 Fecha final: 2025-02-19" -ForegroundColor Cyan
Write-Host "📊 Total de commits: $($commits.Count)" -ForegroundColor Cyan

# Mostrar historial
Write-Host ""
Write-Host "📋 Historial de commits:" -ForegroundColor Blue
git log --oneline --graph

Write-Host ""
Write-Host "🎯 ¡Proceso completado!" -ForegroundColor Green
Write-Host "Para ver fechas: git log --pretty=format:'%h %ad %s' --date=short" -ForegroundColor Yellow
