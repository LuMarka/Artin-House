# 🏡 Artin House Mendoza - Sitio Web

Una aplicación web moderna construida con **Angular 20** para la gestión y promoción del alojamiento temporal Artin House en Luján de Cuyo, Mendoza, Argentina.

---

## 📖 Descripción del Proyecto

**Artin House Mendoza** es una Single Page Application (SPA) que ofrece una experiencia completa para explorar, reservar y obtener información sobre dos apartamentos exclusivos de alojamiento temporario.

El sitio incluye:
- ✅ Sistema de reservas dinámico e interactivo
- ✅ Soporte multiidioma (Español, English, Português)
- ✅ Galería responsiva de fotos
- ✅ Guía turística completa de Mendoza
- ✅ Información detallada de comodidades y políticas
- ✅ Formularios de contacto y consultas
- ✅ Optimización SEO y meta tags

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Framework** | Angular 20.3.6 |
| **Lenguaje** | TypeScript 5.x |
| **Estilos** | CSS3 Responsive |
| **Arquitectura** | Componentes Standalone |
| **Estado** | Angular Signals |
| **Rutas** | Angular Router |
| **Hosting** | Vercel |
| **Versionado** | Git & GitHub |

### Características Técnicas
- 🚀 Control Flow moderno (@if, @for)
- 💾 Signal-based Reactivity
- 📦 Componentes componetizados
- 🌍 Sistema de i18n (internacionalización)
- 🎯 Type-safe con TypeScript
- ♿ Accessible HTML5

---

## 📋 Requisitos Previos

```bash
# Verifica las versiones instaladas
node --version      # v18+
npm --version       # v9+
ng version          # Angular CLI 20+
git --version       # 2.x+
```

**Instalación recomendada:**
- [Node.js LTS](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli@20`

---

## 🚀 Guía de Inicio Rápido

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/LuMarka/Artin-House.git
cd artin-house-luján
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Ejecutar Servidor de Desarrollo
```bash
ng serve
# o
npm start
```
Abre [http://localhost:4200](http://localhost:4200) en tu navegador.

### 4️⃣ Compilar para Producción
```bash
ng build --configuration production
```
Los archivos compilados estarán en `dist/`

---

## 📁 Estructura del Proyecto

```
artin-house-luján/
├── src/
│   ├── app.component.ts          # Componente raíz
│   ├── app.routes.ts             # Rutas principales
│   ├── components/               # Componentes standalone
│   │   ├── header/               # Navegación
│   │   ├── footer/               # Pie de página
│   │   ├── hero/                 # Sección hero
│   │   ├── apartments/           # Información de apartamentos
│   │   ├── apartment-detail/     # Detalle individual
│   │   ├── booking/              # Sistema de reservas
│   │   ├── gallery/              # Galería de fotos
│   │   ├── amenities/            # Comodidades
│   │   ├── contact/              # Formulario de contacto
│   │   ├── mendoza-guide/        # Guía turística
│   │   ├── home/                 # Página principal
│   │   └── whatsapp-button/      # Botón flotante
│   ├── services/                 # Servicios compartidos
│   │   ├── translation.service.ts    # Gestión de idiomas
│   │   ├── booking.service.ts        # Lógica de reservas
│   │   └── ...
│   ├── assets/                   # Recursos estáticos
│   │   ├── apartments/           # Fotos de apartamentos
│   │   ├── paisajes/             # Paisajes y lugares
│   │   └── logos/                # Logos y branding
│   └── styles/                   # Estilos globales
├── angular.json                  # Configuración Angular
├── tsconfig.json                 # Configuración TypeScript
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

---

## 🔑 Características Principales

### 🌍 Sistema Multiidioma
- Servicio centralizado de traducción
- 3 idiomas: Español, English, Português
- Fallback automático a español
- Almacenamiento de preferencia en localStorage

```typescript
// Uso en componentes
{{ getTitle() }}  // Llama a método de traducción
```

### 📅 Sistema de Reservas
- Selección interactiva de fechas
- Cálculo dinámico de precios
- Descuentos por estadías prolongadas (7+ noches)
- Validación de disponibilidad
- Depósito de seguridad configurable

### 📸 Galería Responsiva
- Carga lazy loading de imágenes
- Modal lightbox para ampliar
- Navegación por teclado
- Optimizada para móviles

### 🗺️ Guía Turística Interactiva
- Información sobre bodegas y vinos
- Recomendaciones gastronómicas
- Actividades de aventura
- Mapa interactivo de Google
- Datos de distancias y ubicaciones

### ♿ Accesibilidad
- HTML semántico
- ARIA labels
- Navegación por teclado
- Alt text en imágenes

---

## 🎨 Estilos y Responsividad

El proyecto usa **CSS3 puro** con un enfoque mobile-first:

```css
/* Breakpoints utilizados */
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

Componentes componetizados con estilos scoped a través de archivos `.css` individuales.

---

## 🔌 Servicios Principales

### TranslationService
```typescript
// Obtener traducción
const text = this.translationService.translate('clave.traduccion')();

// Cambiar idioma
this.translationService.setLanguage('en');

// Idioma actual
const currentLang = this.translationService.language();
```

### BookingService
```typescript
// Obtener precios
const prices = this.bookingService.getPrices();

// Calcular estadía
const total = this.bookingService.calculateStay(checkIn, checkOut, apartmentId);
```

---

## 🧪 Desarrollo

### Generar Componente
```bash
ng generate component components/my-component
```

### Generar Servicio
```bash
ng generate service services/my-service
```

### Lint del Código
```bash
ng lint
```

### Format de Código (si está configurado)
```bash
npm run format
```

---

## 🚢 Deployment a Vercel

### Paso 1: Push a GitHub
```bash
git add .
git commit -m "feat: mensaje descriptivo"
git push origin main
```

### Paso 2: Conectar en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Vercel detecta Angular automáticamente
4. Tu sitio estará live en `artin-house.vercel.app`

### Paso 3: Variables de Entorno (si son necesarias)
En Vercel Dashboard → Settings → Environment Variables

---

## 🐛 Troubleshooting

### Puerto 4200 en Uso
```bash
ng serve --port 4300
```

### Limpiar Caché
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Errores de Dependencias
```bash
npm audit fix
```

### Build Lento
```bash
ng serve --poll=2000
```

---

## 📚 Recursos Útiles

- [Documentación Angular](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Vercel Documentation](https://vercel.com/docs)

---

## 👨‍💻 Autor

**Luisa Markarian** | Aurea DevWeb

Desarrolladora de web modernas, arquitectura escalable y experiencia de usuario.

**Conecta conmigo:**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LuMarka)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luisa-markarian-itdeveloper/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:luisamarkarian@gmail.com)

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

```
MIT License - Libre para usar, modificar y distribuir
```

---

## 📞 Soporte

- 🐛 Reporta bugs en [Issues](https://github.com/LuMarka/artin-house-luján/issues)
- 💬 Abre una Discussion para preguntas
- 📧 Contacto: luisamarkarian@gmail.com

---

<div align="center">

### Hecho con ❤️ en Mendoza, Argentina 🇦🇷

**Última actualización:** Noviembre 2025

[Visita el sitio](https://artin-house.vercel.app/)| [Ver código fuente](https://github.com/LuMarka/Artin-House.git)

</div>
