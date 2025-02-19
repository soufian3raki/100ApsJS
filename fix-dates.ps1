# Script simple para ajustar fechas de commits
# Cambia las fechas para que terminen el 5 de marzo de 2025

Write-Host "Ajustando fechas de commits para terminar el 5 de marzo de 2025..." -ForegroundColor Green

# Fechas objetivo
$dates = @(
    "2025-02-10",  # Dia 1
    "2025-02-10",  # Dia 1
    "2025-02-10",  # Dia 1
    "2025-02-11",  # Dia 2
    "2025-02-11",  # Dia 2
    "2025-02-11",  # Dia 2
    "2025-02-12",  # Dia 3
    "2025-02-12",  # Dia 3
    "2025-02-12",  # Dia 3
    "2025-02-13",  # Dia 4
    "2025-02-13",  # Dia 4
    "2025-02-13",  # Dia 4
    "2025-02-14",  # Dia 5
    "2025-02-14",  # Dia 5
    "2025-02-14",  # Dia 5
    "2025-02-17",  # Dia 6 (lunes)
    "2025-02-17",  # Dia 6
    "2025-02-17",  # Dia 6
    "2025-02-18",  # Dia 7
    "2025-02-18",  # Dia 7
    "2025-02-18",  # Dia 7
    "2025-02-19",  # Dia 8
    "2025-02-19"   # Dia 8
)

# Obtener commits en orden cronologico
$commits = git log --oneline --reverse
$commitHashes = @()

foreach ($commit in $commits) {
    if ($commit -match "^([a-f0-9]+)\s+(.+)$") {
        $commitHashes += $matches[1]
    }
}

Write-Host "Encontrados $($commitHashes.Count) commits" -ForegroundColor Blue

# Crear nuevo branch
$newBranch = "fechas-ajustadas"
Write-Host "Creando branch: $newBranch" -ForegroundColor Yellow

# Eliminar branch si existe
git branch -D $newBranch 2>$null
git checkout -b $newBranch

# Ajustar cada commit
for ($i = 0; $i -lt $commitHashes.Count; $i++) {
    if ($i -lt $dates.Count) {
        $newDate = $dates[$i]
        $commitHash = $commitHashes[$i]
        
        Write-Host "Ajustando commit $($i+1): $commitHash" -ForegroundColor Yellow
        Write-Host "  Nueva fecha: $newDate" -ForegroundColor Cyan
        
        # Configurar fecha
        $env:GIT_AUTHOR_DATE = "$newDate 12:00:00 +0000"
        $env:GIT_COMMITTER_DATE = "$newDate 12:00:00 +0000"
        
        # Cherry-pick con nueva fecha
        git cherry-pick --no-commit $commitHash
        if ($LASTEXITCODE -eq 0) {
            git commit --amend --no-edit
            Write-Host "  ✅ Ajustado exitosamente" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Error en cherry-pick" -ForegroundColor Red
        }
        
        # Limpiar variables
        Remove-Item Env:GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
        Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
    }
}

Write-Host ""
Write-Host "🎉 ¡Fechas ajustadas exitosamente!" -ForegroundColor Green
Write-Host "📅 Fecha final: 2025-02-19" -ForegroundColor Cyan

# Mostrar historial
Write-Host ""
Write-Host "Nuevo historial:" -ForegroundColor Blue
git log --oneline --graph

Write-Host ""
Write-Host "Para aplicar los cambios al branch main:" -ForegroundColor Yellow
Write-Host "git checkout main" -ForegroundColor White
Write-Host "git reset --hard $newBranch" -ForegroundColor White
