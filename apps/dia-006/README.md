# 🔐 Día 6: Generador de Contraseñas

## 📋 Descripción
Generador de contraseñas seguras con opciones de personalización: longitud, caracteres especiales, números y mayúsculas.

## ✨ Características
- **Longitud configurable** (4-50 caracteres)
- **Opciones de caracteres**: mayúsculas, minúsculas, números, símbolos
- **Generación instantánea** con un clic
- **Copia al portapapeles** con un clic
- **Indicador de fortaleza** de la contraseña
- **Diseño intuitivo** y responsive
- **Validación de opciones**

## 🚀 Cómo Funciona

### Generación de Contraseñas
```javascript
function generatePassword() {
  const length = lengthSlider.value;
  const includeUppercase = uppercaseCheck.checked;
  const includeLowercase = lowercaseCheck.checked;
  const includeNumbers = numbersCheck.checked;
  const includeSymbols = symbolsCheck.checked;
  
  let charset = "";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
}
```

### Indicador de Fortaleza
```javascript
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  return {
    score: score,
    level: score < 3 ? "Débil" : score < 5 ? "Media" : "Fuerte",
    color: score < 3 ? "#ff4757" : score < 5 ? "#ffa502" : "#2ed573"
  };
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Math.random()**: Generación de números aleatorios
- **Math.floor()**: Redondeo para índices de array
- **String methods**: charAt(), length
- **Regular expressions**: Validación de patrones
- **Checkbox handling**: Verificación de opciones
- **Range slider handling**: Valores de longitud

### CSS
- **Custom slider styling**: Personalización de controles
- **Checkbox styling**: Diseño personalizado
- **Progress bar**: Indicador de fortaleza
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual

### Seguridad
- **Principios de contraseñas seguras**: Mejores prácticas
- **Validación de fortaleza**: Algoritmos de evaluación
- **Caracteres especiales**: Diversidad de caracteres
- **Longitud mínima**: Recomendaciones de seguridad

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Formularios, sliders, checkboxes
- **CSS3**: Estilos personalizados, responsive
- **JavaScript ES6+**: Lógica de generación
- **Sin dependencias**: JavaScript puro

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles de tamaño apropiado
- **Legibilidad**: Texto y controles claros

## 🎮 Controles
- **Mouse**: Clic en botones y checkboxes
- **Teclado**: 
  - `Espacio`: Generar nueva contraseña
  - `C`: Copiar contraseña
  - `Tab`: Navegación entre controles

## 🔧 Estructura del Código
```
dia-006/
├── index.html          # Estructura HTML + controles
├── app.css            # Estilos + custom controls
├── app.js             # Lógica + generación
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Ajusta la longitud con el slider
3. Selecciona los tipos de caracteres deseados
4. Haz clic en "Generar Contraseña"
5. Usa "Copiar" para copiar al portapapeles

## 💡 Mejoras Futuras
- [ ] Generación de frases de contraseña
- [ ] Historial de contraseñas generadas
- [ ] Análisis de contraseñas existentes
- [ ] Exportar contraseñas
- [ ] Modo offline
- [ ] Integración con gestores de contraseñas

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~100 líneas
- **Tiempo de desarrollo**: ~1.5 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Caracteres**: 4 tipos soportados

## 🔐 Casos de Uso
- **Desarrolladores**: Generación de claves API
- **Usuarios**: Contraseñas personales
- **Empresas**: Políticas de seguridad
- **Educación**: Aprendizaje de seguridad

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 6*
