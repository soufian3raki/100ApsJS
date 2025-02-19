# Script para ajustar fechas de commits existentes
# Cambia las fechas para que terminen el 5 de marzo de 2025

Write-Host "Ajustando fechas de commits para terminar el 5 de marzo de 2025..." -ForegroundColor Green

# Configuracion
$TARGET_DATE = "2025-03-05"
$START_DATE = "2025-02-10"  # Inicio del desarrollo

# Funcion para calcular fechas de desarrollo
function Get-DevelopmentDates {
    $startDate = [DateTime]::Parse($START_DATE)
    $endDate = [DateTime]::Parse($TARGET_DATE)
    $dates = @()
    
    $currentDate = $startDate
    while ($currentDate -le $endDate) {
        # Solo dias laborables (lunes a viernes)
        if ($currentDate.DayOfWeek -ne [DayOfWeek]::Saturday -and $currentDate.DayOfWeek -ne [DayOfWeek]::Sunday) {
            $dates += $currentDate.ToString("yyyy-MM-dd")
        }
        $currentDate = $currentDate.AddDays(1)
    }
    
    return $dates
}

# Obtener fechas de desarrollo
$devDates = Get-DevelopmentDates
Write-Host "Nuevas fechas de desarrollo: $($devDates.Count) dias laborables" -ForegroundColor Cyan
Write-Host " Desde: $START_DATE hasta: $TARGET_DATE" -ForegroundColor Cyan
Write-Host ""

# Obtener lista de commits actuales
$commits = git log --oneline --reverse
$commitList = @()

foreach ($commit in $commits) {
    if ($commit -match "^([a-f0-9]+)\s+(.+)$") {
        $commitList += @{
            Hash = $matches[1]
            Message = $matches[2]
        }
    }
}

Write-Host "Encontrados $($commitList.Count) commits para ajustar" -ForegroundColor Blue
Write-Host ""

# Crear un nuevo branch para los commits ajustados
$newBranch = "adjusted-dates-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "Creando nuevo branch: $newBranch" -ForegroundColor Yellow
git checkout -b $newBranch

# Ajustar fechas de commits
$commitIndex = 0
foreach ($commit in $commitList) {
    if ($commitIndex -ge $devDates.Count) {
        Write-Host "No hay suficientes dias para todos los commits" -ForegroundColor Yellow
        break
    }
    
    $newDate = $devDates[$commitIndex]
    $dayNumber = $commitIndex + 1
    
    Write-Host "Dia $dayNumber - $newDate" -ForegroundColor Magenta
    Write-Host "  Ajustando: $($commit.Message)" -ForegroundColor White
    
    # Configurar fecha del commit
    $env:GIT_AUTHOR_DATE = "$newDate 12:00:00 +0000"
    $env:GIT_COMMITTER_DATE = "$newDate 12:00:00 +0000"
    
    # Hacer cherry-pick del commit con nueva fecha
    git cherry-pick --no-commit $commit.Hash
    if ($LASTEXITCODE -eq 0) {
        git commit --amend -m $commit.Message --no-edit
        Write-Host "  ✅ Commit ajustado exitosamente" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Error al ajustar commit" -ForegroundColor Red
    }
    
    # Limpiar variables de entorno
    Remove-Item Env:GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
    Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
    
    $commitIndex++
    Write-Host ""
}

Write-Host "🎉 ¡Fechas de commits ajustadas exitosamente!" -ForegroundColor Green
Write-Host "📅 Nueva fecha objetivo: $TARGET_DATE" -ForegroundColor Cyan
Write-Host "📊 Total de commits ajustados: $commitIndex" -ForegroundColor Cyan

# Mostrar historial de commits ajustados
Write-Host ""
Write-Host "📋 Nuevo historial de commits:" -ForegroundColor Blue
git log --oneline --graph --decorate

Write-Host ""
Write-Host "🎯 ¡Ajuste de fechas completado!" -ForegroundColor Green
Write-Host "💡 Para volver al branch principal: git checkout main" -ForegroundColor Yellow
Write-Host "💡 Para fusionar los cambios: git checkout main && git merge $newBranch" -ForegroundColor Yellow
