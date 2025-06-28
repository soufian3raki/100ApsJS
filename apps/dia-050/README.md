# Día 50: Organizador de Contraseñas

## Descripción
Gestor de contraseñas completo con generador de contraseñas seguras, almacenamiento local, categorización y búsqueda. Permite gestionar todas tus contraseñas de forma segura y organizada.

## Características
- **Generador de Contraseñas**: Configuración personalizable de longitud y caracteres
- **Gestión Completa**: Agregar, editar, eliminar contraseñas
- **Categorización**: 6 categorías predefinidas con colores
- **Búsqueda**: Buscar por servicio, usuario, notas o categoría
- **Copia Rápida**: Copiar contraseñas al portapapeles
- **Análisis de Fuerza**: Evaluación de seguridad de contraseñas
- **Persistencia**: Datos guardados en localStorage
- **Responsive**: Diseño adaptativo completo

## Cómo Funciona

### Generador de Contraseñas
```javascript
generatePassword() {
  const length = parseInt(document.getElementById('passwordLength').value);
  const includeUppercase = document.getElementById('includeUppercase').checked;
  // ... otros parámetros
  
  let charset = '';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
}
```

### Análisis de Fuerza
```javascript
calculatePasswordStrength(password) {
  let score = 0;
  
  // Length scoring
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 10;
  
  return { score: Math.min(score, 100) };
}
```

### Gestión de Contraseñas
```javascript
savePassword() {
  const passwordData = {
    service, username, password, website, notes, category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  if (this.currentPasswordId) {
    // Update existing
  } else {
    // Create new
    this.passwords.unshift({ id: Date.now(), ...passwordData });
  }
}
```

## Conceptos Aprendidos

### JavaScript
- Math.random(): Generación de números aleatorios
- String methods: charAt(), test(), includes()
- Regular expressions: Validación de patrones
- Clipboard API: Copia al portapapeles
- localStorage: Persistencia de datos
- Event handling: Múltiples tipos de eventos

### CSS
- CSS Grid: Layout de contraseñas
- Flexbox: Alineación de controles
- CSS Variables: Temas consistentes
- Pseudo-classes: :hover, :focus
- Custom properties: Colores dinámicos
- Responsive design: Media queries

### HTML
- Form controls: Inputs, select, textarea
- Modal dialogs: Ventanas emergentes
- Semantic HTML: Estructura semántica
- Accessibility: Labels y aria-labels

## Tecnologías Utilizadas
- HTML5: Formularios y estructura semántica
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Arrow functions, template literals
- localStorage: Persistencia de datos
- Clipboard API: Copia de texto
- Sin dependencias: JavaScript puro

## Categorías Disponibles
- **Personal**: Contraseñas personales (azul)
- **Trabajo**: Contraseñas laborales (verde)
- **Redes Sociales**: Plataformas sociales (morado)
- **Finanzas**: Bancos y finanzas (amarillo)
- **Entretenimiento**: Streaming y juegos (rojo)
- **Otro**: Otras categorías (gris)

## Controles del Generador
- **Longitud**: 8-50 caracteres (deslizador)
- **Mayúsculas**: A-Z (opcional)
- **Minúsculas**: a-z (opcional)
- **Números**: 0-9 (opcional)
- **Símbolos**: !@#$%^&*() (opcional)
- **Excluir Similares**: 0O1lI (opcional)

## Cómo Ejecutar
1. Abre index.html en tu navegador
2. Configura el generador de contraseñas
3. Genera una contraseña segura
4. Agrega tu primera contraseña con "Agregar"
5. Completa los datos del servicio
6. Usa la búsqueda para encontrar contraseñas
7. Copia contraseñas con un clic

## Niveles de Seguridad
- **Débil**: 0-24% (rojo)
- **Regular**: 25-49% (amarillo)
- **Buena**: 50-74% (azul)
- **Muy Fuerte**: 75-100% (verde)

## Estadísticas Técnicas
- Líneas de código: ~450 líneas
- Funcionalidades: 15 principales
- Tiempo de desarrollo: ~6 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Almacenamiento: localStorage

## Casos de Uso
- **Personas**: Gestión personal de contraseñas
- **Empresas**: Contraseñas de equipo
- **Desarrolladores**: Credenciales de desarrollo
- **Estudiantes**: Contraseñas académicas
- **Profesionales**: Credenciales laborales

## Características de Seguridad
- **Almacenamiento Local**: Datos no se envían a servidores
- **Validación de Fuerza**: Análisis de seguridad
- **Exclusión de Similares**: Evita caracteres confusos
- **Copia Segura**: Copia al portapapeles sin mostrar

## Limitaciones
- Solo funciona localmente (no sincronización)
- No incluye encriptación avanzada
- No soporta autenticación biométrica
- No incluye generación de 2FA

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 50*
