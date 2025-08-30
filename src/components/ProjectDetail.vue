<template>
  <div class="project-detail">
    <!-- Back to Gallery Button -->
    <div class="button-wrapper">
      <button class="portfolio-button" @click="backToGallery">
        <div class="arrow-icon">
          <i class="fas fa-arrow-left"></i>
        </div>
        <span>Volver a Galería</span>
      </button>
    </div>

    <!-- Hero Section -->
    <div class="hero">
      <img :src="project?.image" :alt="project?.title" class="hero-image" />
      <div class="hero-content">
        <h1>{{ project?.title }}</h1>
        <p class="achievement">{{ project?.keyAchievement }}</p>
      </div>
    </div>

    <!-- Client & Role Section -->
    <section class="section client-section">
      <div class="client-grid">
        <div class="client-info">
          <h3 class="section-subtitle">Cliente</h3>
          <p>{{ project?.client }}</p>
          <div class="client-details">
            <span class="detail-item">
              <i class="fas fa-building"></i>
              {{ project?.industry }}
            </span>
            <span class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              {{ project?.location }}
            </span>
          </div>
        </div>
        <div class="role-info">
          <h3 class="stage-title">Mi Rol</h3>
          <p>{{ project?.myRole }}</p>
          <div class="responsibilities">
            <span
              v-for="resp in project?.responsibilities"
              :key="resp"
              class="responsibility-tag"
            >
              {{ resp }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Challenge Section -->
    <section class="section challenge-section" v-if="project?.challenge">
      <h2 class="section-title">El Reto</h2>
      <p class="section-text">{{ project?.challenge }}</p>
    </section>

    <!-- Process Section -->
    <section
      class="section process-section"
      v-if="project?.process.research?.length ||
            project?.process.design?.activities?.length ||
            project?.process.design?.colors?.length ||
            project?.process.design?.typography?.length ||
            project?.process.design?.icons?.length ||
            project?.process.development?.activities?.length ||
            project?.process.development?.stack?.length ||
            project?.process.marketing?.length"
    >
      <h2 class="section-title">El Proceso</h2>

      <!-- UX Research -->
      <div class="process-stage" v-if="project?.process.research?.length">
        <h3 class="stage-title">
          <i class="fas fa-search"></i>
          Investigación / UX
        </h3>
        <div class="stage-content">
          <ul class="activity-list">
            <li v-for="activity in project?.process.research" :key="activity">
              {{ activity }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Design -->
      <div
        class="process-stage"
        v-if="project?.process.design?.activities?.length ||
              project?.process.design?.colors?.length ||
              project?.process.design?.typography?.length ||
              project?.process.design?.icons?.length"
      >
        <h3 class="stage-title">
          <i class="fas fa-paint-brush"></i>
          Diseño / UI
        </h3>
        <div class="stage-content">
          <ul class="activity-list design-activities" v-if="project?.process.design.activities?.length">
            <li
              v-for="activity in project?.process.design.activities"
              :key="activity"
            >
              {{ activity }}
            </li>
          </ul>
          <div class="design-elements">
            <div class="design-card color-palette" v-if="project?.process.design.colors?.length">
              <div class="card-header">
                <i class="fas fa-palette"></i>
                <h4>Paleta de Colores</h4>
              </div>
              <div class="colors">
                <div
                  v-for="color in project?.process.design.colors"
                  :key="color"
                  class="color-item"
                  :style="{ backgroundColor: color }"
                >
                  <span class="color-tooltip">{{ color }}</span>
                  <div class="color-preview" :style="{ backgroundColor: color }"></div>
                </div>
              </div>
            </div>

            <div class="design-card typography" v-if="project?.process.design.typography?.length">
              <div class="card-header">
                <i class="fas fa-font"></i>
                <h4>Tipografía</h4>
              </div>
              <div class="font-samples">
                <div
                  v-for="font in project?.process.design.typography"
                  :key="font.name"
                  class="font-item"
                  :style="{ fontFamily: font.name }"
                >
                  <span class="font-name">{{ font.name }}</span>
                  <p class="font-usage">{{ font.usage }}</p>
                  <div class="font-preview">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    <br />
                    abcdefghijklmnopqrstuvwxyz
                    <br />
                    0123456789
                  </div>
                </div>
              </div>
            </div>

            <div class="design-card iconography" v-if="project?.process.design.icons?.length">
              <div class="card-header">
                <i class="fas fa-icons"></i>
                <h4>Iconografía</h4>
              </div>
              <div class="icon-grid">
                <div
                  v-for="(icon, index) in project?.process.design.icons"
                  :key="index"
                  class="icon-item"
                >
                  <template v-if="icon.type === 'fa'">
                    <i :class="icon.value"></i>
                  </template>
                  <template v-else-if="icon.type === 'image'">
                    <img :src="icon.value" alt="icon" class="icon-image" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Development -->
      <div
        class="process-stage"
        v-if="project?.process.development?.activities?.length ||
              project?.process.development?.stack?.length"
      >
        <h3 class="stage-title">
          <i class="fas fa-code"></i>
          Desarrollo/Implementación
        </h3>
        <div class="stage-content">
          <ul class="activity-list" v-if="project?.process.development.activities?.length">
            <li
              v-for="activity in project?.process.development.activities"
              :key="activity"
            >
              {{ activity }}
            </li>
          </ul>
          <div v-if="project.technologies && project.technologies.length > 0" class="detail-section">
            <h4>Tecnologías Utilizadas</h4>
            <div class="tech-icons" v-if="project?.process.development.stack?.length">
              <div
                v-for="tech in project?.process.development.stack"
                :key="tech.name"
                class="icon-container-large"
              >
                <i :class="tech.icon"></i>
                <span>{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Marketing -->
      <div class="process-stage" v-if="project?.process.marketing?.length">
        <h3 class="stage-title">
          <i class="fas fa-bullhorn"></i>
          Marketing
        </h3>
        <div class="stage-content">
          <ul class="activity-list">
            <li v-for="activity in project?.process.marketing" :key="activity">
              {{ activity }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Solution Section -->
    <section class="section solution-section" v-if="project?.solution?.gif || project?.solution?.description">
      <h2 class="section-title">La Solución</h2>
      <div class="solution-content">
        <div class="solution-demo" v-if="project?.solution.gif">
          <img
            :src="project?.solution.gif"
            :alt="project?.title"
            class="solution-gif"
          />
        </div>
        <p class="solution-description" v-if="project?.solution.description">{{ project?.solution.description }}</p>
        
        <!-- Galería de Imágenes dentro de La Solución -->
        <div class="gallery-grid" v-if="project.gallery && project.gallery.length > 0">
          <div 
            v-for="(image, index) in project.gallery" 
            :key="index"
            class="gallery-item"
            @click="openLightbox(index)"
          >
            <img :src="image" :alt="`Imagen ${index + 1}`" class="gallery-image" />
            <div class="gallery-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Image Gallery Section -->
    <section class="section image-gallery-section" v-if="project?.imageGallery?.length">
      <h2 class="section-title"></h2>
      <div class="image-grid">
        <div
          v-for="(image, index) in project?.imageGallery"
          :key="index"
          class="gallery-image-wrapper"
          :data-tag="image.tag"
          :class="{ 'has-tag': image.tag }"
        >
          <!-- Contenedor con scroll para la imagen -->
          <div class="gallery-image-container">
            <img :src="image.url" :alt="image.alt" class="gallery-image" />
          </div>
          <p v-if="image.caption" class="gallery-image-caption">{{ image.caption }}</p>
        </div>
      </div>
    </section>

    <!-- Results Section - Redesigned -->
    <div v-if="project.results" class="section results-section">
      <h2 class="section-title">Resultados del Proyecto</h2>
      
      <!-- Results Cards -->
      <div class="results-cards">
        <div class="result-card">
          <div class="result-content">
            <div class="result-number">450+</div>
            <div class="result-label">Usuarios Activos</div>
            <div class="result-description">Incremento mensual promedio después del lanzamiento</div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="result-content">
            <div class="result-number">95%</div>
            <div class="result-label">Satisfacción</div>
            <div class="result-description">Feedback positivo de usuarios en pruebas de usabilidad</div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="result-content">
            <div class="result-number">65%</div>
            <div class="result-label">Reducción de Tiempo</div>
            <div class="result-description">En completar tareas principales del sistema</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Navigation -->
    <div class="floating-nav">
      <div class="nav-container">
        <button
          @click="navigateToProject(prevProjectId)"
          class="nav-btn"
          :disabled="!prevProjectId"
        >
          <div class="arrow-icon left">
            <i class="fas fa-arrow-left"></i>
          </div>
          <span>Anterior</span>
        </button>

        <div class="nav-separator"></div>

        <a
          :href="project?.liveUrl || '#'"
          target="_blank"
          class="nav-btn primary"
        >
          <span>Ver Proyecto</span>
          <div class="arrow-icon">
            <i class="fas fa-external-link-alt"></i>
          </div>
        </a>

        <div class="nav-separator"></div>

        <button
          @click="navigateToProject(nextProjectId)"
          class="nav-btn"
          :disabled="!nextProjectId"
        >
          <span>Siguiente</span>
          <div class="arrow-icon">
            <i class="fas fa-arrow-right"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Obtiene el ID actual del proyecto de los parámetros de la ruta
const currentId = computed(() => parseInt(route.params.id as string))
// Busca el proyecto correspondiente al ID actual en el arreglo 'projects'
const project = computed(() => projects.find((p) => p.id === currentId.value))

// Calcula el ID del proyecto anterior para la navegación
const prevProjectId = computed(() => {
  const prevId = currentId.value - 1
  return prevId >= 1 ? prevId : null // Si es el primer proyecto, no hay anterior
})

// Calcula el ID del proyecto siguiente para la navegación
const nextProjectId = computed(() => {
  const nextId = currentId.value + 1
  return nextId <= projects.length ? nextId : null // Si es el último proyecto, no hay siguiente
})

// Función para navegar a un proyecto específico por su ID
const navigateToProject = (id: number | null) => {
  if (id) {
    router.push({ name: 'project-detail', params: { id: id.toString() } })
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Desplaza la ventana al inicio suavemente
  }
}

// Función para volver a la galería de proyectos
const backToGallery = () => {
  router.push({ name: 'projects' })
}

// Función auxiliar para obtener el nombre de un icono basado en su tipo
function getIconName(icon: { type: string; value: string }) {
  if (icon.type === 'fa') {
    return icon.value.split('fa-')[1] // Para iconos de Font Awesome
  } else if (icon.type === 'image') {
    // Para imágenes, extrae el nombre del archivo sin extensión y reemplaza guiones por espacios
    return icon.value.split('/').pop()?.split('.')[0].replace(/-/g, ' ') || ''
  }
  return ''
}

// Interfaz para la estructura del proceso del proyecto
interface Process {
  research: string[]
  design: {
    activities: string[]
    colors: string[]
    typography: Array<{
      name: string
      usage: string
    }>
    icons: Array<{ type: string; value: string }>
  }
  development: {
    activities: string[]
    stack: Array<{
      name: string
      icon: string
    }>
  }
  marketing: string[]
}

// Interfaz para la estructura de los resultados del proyecto
interface Result {
  value: string
  metric: string
}

// Interfaz para la estructura de la solución del proyecto
interface Solution {
  gif: string
  description: string
}

// ¡Nueva interfaz para las imágenes de la galería, incluyendo la propiedad 'tag'!
interface ImageGalleryItem {
  url: string;
  alt: string;
  caption?: string; // Propiedad opcional para una descripción de la imagen
  tag?: 'antes' | 'después' | 'resultado'; // ¡Nueva propiedad 'tag'!
}

// Interfaz principal para la estructura de un proyecto
interface Project {
  id: number
  image: string
  title: string
  roles: string[]
  keyAchievement: string
  client: string
  industry: string
  location: string
  myRole: string
  responsibilities: string[]
  challenge: string
  process: Process
  solution: Solution
  results: Result[]
  testimonial?: string
  liveUrl?: string
  imageGallery?: ImageGalleryItem[]; 
}

const projectsData = {
  1: {
    title: "Quizz Interactivo",
    category: "Aplicación Web Interactiva",
    description: "Una aplicación de quiz interactiva desarrollada con Vue.js que permite a los usuarios responder preguntas de manera dinámica con retroalimentación inmediata.",
    challenge: "Crear una experiencia de quiz atractiva y educativa que mantenga a los usuarios comprometidos mientras aprenden. El desafío principal era diseñar una interfaz intuitiva que funcionara bien en todos los dispositivos y proporcionara retroalimentación inmediata.",
    solution: "Desarrollé una aplicación Vue.js con un sistema de puntuación en tiempo real, animaciones suaves entre preguntas, y un diseño responsive. Implementé un sistema de retroalimentación que muestra explicaciones detalladas después de cada respuesta.",
    technologies: ["Vue.js", "CSS3", "JavaScript", "Responsive Design"],
    images: [
      "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    ],
    results: [
      { metric: "2,500+", label: "Quizzes Completados" },
      { metric: "89%", label: "Tasa de Finalización" },
      { metric: "4.7/5", label: "Calificación Promedio" }
    ]
  },
  2: {
    title: "Website Hotel",
    category: "Sitio Web Corporativo",
    description: "Sitio web completo para un hotel boutique con sistema de reservas integrado, galería de habitaciones y información de servicios.",
    challenge: "Desarrollar un sitio web que transmitiera la elegancia del hotel mientras proporcionaba una experiencia de reserva fluida. Era crucial mostrar las habitaciones de manera atractiva y facilitar el proceso de reserva.",
    solution: "Creé un sitio web responsive con una galería interactiva de habitaciones, sistema de reservas integrado, y diseño elegante que refleja la marca del hotel. Implementé optimizaciones SEO para mejorar la visibilidad online.",
    technologies: ["WordPress", "PHP", "MySQL", "CSS3", "JavaScript"],
    images: [
      "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2069&auto=format&fit=crop"
    ],
    results: [
      { metric: "180%", label: "Aumento en Reservas" },
      { metric: "92%", label: "Satisfacción Cliente" },
      { metric: "45%", label: "Reducción Tiempo Reserva" }
    ]
  },
  3: {
    title: "Website Centro Comercial",
    category: "Portal E-commerce",
    description: "Portal web para centro comercial con directorio de tiendas, promociones, eventos y sistema de navegación interactivo.",
    challenge: "Crear un portal que sirviera como hub central para todas las tiendas del centro comercial, facilitando la navegación de los visitantes y promoviendo las ofertas y eventos.",
    solution: "Desarrollé un portal con mapa interactivo del centro comercial, directorio searchable de tiendas, sistema de promociones y calendario de eventos. Incluí funcionalidades de geolocalización para ayudar a los visitantes.",
    technologies: ["React", "Node.js", "MongoDB", "Google Maps API"],
    images: [
      "https://oswal.com.co/wp-content/uploads/2025/04/p4.jpg",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop"
    ],
    results: [
      { metric: "15,000+", label: "Visitantes Mensuales" },
      { metric: "78%", label: "Uso del Directorio" },
      { metric: "35%", label: "Aumento Tráfico Tiendas" }
    ]
  },
  4: {
    title: "Landing Page Seguros",
    category: "Landing Page Corporativa",
    description: "Landing page optimizada para conversión para una compañía de seguros, enfocada en la generación de leads y cotizaciones online.",
    challenge: "Crear una landing page que convirtiera visitantes en leads calificados para la compañía de seguros, comunicando confianza y profesionalismo mientras simplificaba el proceso de cotización.",
    solution: "Diseñé una landing page con formulario de cotización optimizado, testimonios de clientes, y elementos de confianza. Implementé A/B testing y optimizaciones de conversión basadas en analytics.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "Google Analytics"],
    images: [
      "https://oswal.com.co/wp-content/uploads/2025/05/axa.jpg",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop"
    ],
    results: [
      { metric: "24%", label: "Tasa de Conversión" },
      { metric: "1,200+", label: "Leads Generados" },
      { metric: "68%", label: "Reducción Costo Lead" }
    ]
  },
  5: {
    title: "Catálogo Online",
    category: "E-commerce",
    description: "Catálogo digital interactivo con sistema de búsqueda avanzada, filtros por categoría y funcionalidad de wishlist.",
    challenge: "Desarrollar un catálogo que permitiera a los usuarios encontrar productos fácilmente entre miles de artículos, con una experiencia de navegación intuitiva y rápida.",
    solution: "Creé un catálogo con búsqueda inteligente, filtros múltiples, comparador de productos y sistema de recomendaciones. Optimicé la carga de imágenes y implementé lazy loading para mejorar el rendimiento.",
    technologies: ["Vue.js", "Elasticsearch", "AWS", "Progressive Web App"],
    images: [
      "https://oswal.com.co/wp-content/uploads/2025/04/P3.jpg",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop"
    ],
    results: [
      { metric: "8,500+", label: "Productos Catalogados" },
      { metric: "85%", label: "Uso de Filtros" },
      { metric: "42%", label: "Aumento Tiempo Sesión" }
    ]
  },
  6: {
    title: "Dashboard Corporativo",
    category: "Aplicación Web",
    description: "Dashboard ejecutivo con visualización de datos en tiempo real, reportes automatizados y métricas de rendimiento empresarial.",
    challenge: "Crear un dashboard que presentara datos complejos de manera clara y actionable para ejecutivos, con actualizaciones en tiempo real y capacidades de drill-down.",
    solution: "Desarrollé un dashboard con gráficos interactivos, alertas automáticas, y reportes personalizables. Implementé WebSockets para actualizaciones en tiempo real y un sistema de permisos granular.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "WebSockets"],
    images: [
      "https://oswal.com.co/wp-content/uploads/2025/05/Dashboard.jpg",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    ],
    results: [
      { metric: "95%", label: "Adopción Usuarios" },
      { metric: "60%", label: "Reducción Tiempo Reportes" },
      { metric: "4.8/5", label: "Satisfacción Ejecutivos" }
    ]
  }
}

// Datos de los proyectos
const projects: Project[] = [
  {
    id: 1,
    image:
      'https://oswal.com.co/wp-content/uploads/2025/08/plataforma_concursos.jpg',
    title: 'Quizz Interactivo para concursos: Potenciando el Estudio del Acueducto de Bogotá',
    roles: ['UX Research', 'UI Design', 'Frontend Designer'],
    keyAchievement:
      'Una interfaz para que los empleados del Acueducto de Bogotá estudien y se preparen de forma autónoma para los concursos de ascenso.',
    client: 'Acueducto de Bogotá',
    industry: 'Servicios públicos',
    location: 'Bogotá, Colombia',
    myRole: 'Frontend Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Developer'],
    challenge:
      "El Acueducto de Bogotá buscaba una solución innovadora y accesible para apoyar a sus empleados en la preparación de los concursos de ascenso, más allá de los métodos de estudio tradicionales. El desafío era crear una herramienta digital interactiva que permitiera a los usuarios autoevaluarse en temarios específicos, gestionar su progreso y ofrecer una experiencia de estudio atractiva y efectiva, todo dentro de un entorno seguro y controlado con gestión de usuarios internos.",
    process: {
      research: [
        'User Flow',
        'Arquitectura de la Información y Sitemap',
        'Pruebas de Usabilidad'
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Adaptación y Aplicación de UI kit',
          'Diseño de elementos gráficos'
        ],
        colors: ['#4831D4', '#CCF381', '#2A2356', '#F4F9FC'],
        typography: [
          { name: 'Montserrat', usage: 'Títulos y encabezados' },
          { name: 'Inter', usage: 'Texto y contenido' },
        ],
        icons: [
        
        ],
      },
      development: {
        activities: [
          'Diseño de Microinteracciones y Animaciones JS/CSS',
          'Performance Optimization',
          'Construcción de la interfaz de usuario interactiva y dinámica utilizando Vue.js.',
          'Implementación de Seguridad Web',
          'Creación de dashboard para gestionar usuarios ',
        ],
        stack: [
          { name: 'Vue', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1754408304/Proyecto_oswal_web_design_Quiz_y1nutn.gif',
      description:
        'Se entregó una aplicación web interactiva de quizz construida desde cero con Vue.js Esta interfaz no solo facilita el estudio personalizado por temas y la autoevaluación para los concursos de ascenso, sino que también ofrece un panel administrativo intuitivo para la gestión total de usuarios y contenido por parte del Acueducto de Bogotá.',
    },
    results: [
      { value: '450', metric: 'empleado se registraron y utilizan la interfaz' },
      { value: 'Feedback', metric: 'Recepción de comentarios positivos sobre la facilidad de uso' },
      { value: 'Reducción de Tiempo', metric: ' La centralización y digitalización del contenido del quizz en la plataforma redujo el tiempo promedio que los empleados dedican a buscar y acceder a materiales de estudio' },
    ],
    liveUrl: 'https://demoquizz.netlify.app/',
   
    imageGallery: [
  
     
    ]
  },
  

  {
    id: 2,
    title: 'Hotel Amazon B&B - Un Refugio en el Corazón del Amazonas',
    image: 'http://www.amazonbb.com/wp-content/uploads/2023/05/boat-forest-river-blue-sky-reflection.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Revitalizando la presencia online para una experiencia amazónica auténtica y atractiva para el viajero internacional.',
    client: 'Hotel Amazon B&B',
    industry: 'Hotel',
    location: 'Amazonas, Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'Amazon B&B, un encantador hotel inmerso en la exuberante selva amazónica, luchaba por conectar con su público objetivo: turistas extranjeros en busca de una experiencia única. Su sitio web existente era pesado, carente de diseño atractivo y con una usabilidad deficiente, lo que dificultaba la reserva y no reflejaba la belleza y autenticidad del lugar.',
    process: {
      research: [
        'Análisis de requisitos técnicos',
        'benchmark de sitios web de hoteles de ecoturismo',
        'Análisis de Usabilidad del Sitio Web',
        'User Flow',
        'Card Sorting',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#455D58', '#3B6317', '#9DBC79', '#EC9B30', '#2E3B48'],
        typography: [
          { name: 'EB Garamond', usage: 'Títulos y encabezados' },
          { name: 'Montserrat', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/Amazon-01.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete5-dia6.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete5-dia1.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete4-dia4.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete4-dia3.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/Package1-dia2-.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
        'Test A/B (A/B Testing)',
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: '',
      description:
        'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
    },
    results: [
      { value: '+25%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
     imageGallery: [
      {
        url: "https://oswal.com.co/wp-content/uploads/2025/08/Amazon_mockup02-scaled.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B_portafolio servicios",
        tag: "resultado" 
      },
      {
        url: "https://oswal.com.co/wp-content/uploads/2025/08/Amazon_mockup03-scaled.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B_portafolio servicios",
        tag: "resultado" 
      }
     
    ]
  
  },
  {
    id: 3,
    title: 'MiCentro: Navegando la Experiencia Comercial ',
    image: 'https://oswal.com.co/wp-content/uploads/2025/05/micentro_el_porvenir.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de un sitio web moderno para centro comercial MiCentro, transformándolo en el punto de encuentro digital para visitantes y negocios.',
    client: 'Centro comercial Micentro',
    industry: 'Centro comercial',
    location: 'Bogotá, Colombia',
    myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer'],
    challenge: 'MiCentro, un centro comercial en crecimiento, necesitaba establecer una presencia online sólida y atractiva que reflejara su ambiente dinámico y facilitara la conexión entre visitantes y sus diversos negocios. El desafío radicaba en crear un sitio web fácil de gestionar por el cliente, que sirviera como directorio de marcas y eventos, potenciara la visibilidad orgánica y ofreciera una experiencia de usuario que invitara a la interacción, superando la falta de un canal digital unificado y optimizado.',
    process: {
      research: [
        'User Journey Map',
        'benchmark ',
        'Card Sorting',
        'Arquitectura de la Información y Sitemap',
        'Pruebas de Usabilidad',

      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Diseño Responsivo y Adaptativo ',
          'mejoramiento de UI KIT, basaado en guias de estilo',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#FF4364', '#EFA146', '#3D3D3D'],
        typography: [
          { name: 'Philosopher', usage: 'Títulos y encabezados' },
          { name: 'Lato', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://ccmicentro.com/wp-content/uploads/2021/02/inicio-1-48x48.png' },
          { type: 'image', value: 'https://ccmicentro.com/wp-content/uploads/2021/02/quienes-somos-1-48x48.png' },
          { type: 'image', value: 'https://ccmicentro.com/wp-content/uploads/2021/02/Marcas-1-48x48.png' },
          { type: 'image', value: 'https://ccmicentro.com/wp-content/uploads/2021/02/Contacto-1-48x48.png' }
     
        ],
      },
      development: { 
        activities: [
          
          'Configuración hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Campos Personalizados (Custom Fields)',
          'Creación de directorio de marcas, eventos',
          'Creación y configuración de Blog',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
        
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
        'Integración y configuracion Google Analytics ',
        'Integración Pixel Facebook',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756241744/Proyecto_oswal_web_design_micentro_jpfodi.gif',
      description:
        'Se entregó un sitio web dinámico y visualmente atractivo para MiCentro, construido desde cero en WordPress, diseñado para ser el punto de referencia digital del centro comercial. Cuenta con un directorio de marcas intuitivo, un calendario de eventos interactivo y un blog, todo gestionable autónomamente gracias a la implementación de campos personalizados. La solución no solo elevó la presencia digital de MiCentro con un diseño moderno y responsivo',
    },
    results: [
      { value: '+30%', metric: 'Aumento en la Visibilidad Orgánica' },
      { value: '+25%', metric: 'Incremento en Consultas Directas a Tiendas' },
      { value: '+Impacto', metric: 'Facilidad de Gestión de Contenido para el área de marketing' },
    ],
    liveUrl: 'https://ccmicentro.com/',

imageGallery: [
     
    ]

    
  },
  {
    id: 4,
    title: 'AXA Colpatria - Landing Page "Seguro de Vida Deudor"',
    image: 'https://oswal.com.co/wp-content/uploads/2025/05/Landing_AX-COL.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Creación de una landing page corporativa de alto impacto visual y optimizada para la conversión, enfocada en la captación de leads para el Seguro de Vida Deudor de AXA Colpatria.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: 'Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'AXA Colpatria necesitaba una landing page específica y altamente efectiva para promocionar su Seguro de Vida Deudor. El desafío era diseñar y desarrollar una página que no solo comunicara de forma clara los beneficios y requisitos del seguro, sino que también inspirara confianza, guiara al usuario intuitivamente, y que se pudiera integrar facilmente a un CRM.',
    process: {
      research: [
        'Análisis de Público Objetivo y Competencia',
        'User Flow',
        'Pruebas de Usabilidad',
         
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipos',
          'Integración sistema de diseño de la marca',
           
        ],
        colors: ['#5C5CB7', '#3D3DAA', '#00008F', '#DD7358', '#D75D3D','#D24723','#7698CB','#41949F','#E196AA'],
        typography: [
          { name: 'Publico Headline Web', usage: 'Títulos y encabezados' },
          { name: 'Source Sans Pro', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu016-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu028-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu048-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu078-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu113-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu134-1.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Implementación en html, css y Javascript',
          'Desarrollo de Funcionalidades Personalizadas',
          'Diseño y configuración de iconos fuente',
          'Creación y envío de formulario',
          
        ],  
        stack: [
         
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
       
        ],
      },
      marketing: [
    
        'Optimización para Motores de Búsqueda (SEO)',
       
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756246659/Proyectos_oswal_web_design_AXA_landing_vida_hlubht.gif',
      description:
        'Se entregó una landing page clave para AXA Colpatria, concebida en Figma y desarrollada con código HTML, CSS y JavaScript. Esta página es totalmente responsiva y fue construida para cumplir con objetivos de negocio y marketing claros. Su diseño presenta los beneficios del Seguro de Vida Deudor de forma directa y su función principal es captar leads calificados eficientemente a través de un formulario optimizado.',
    },
    results: [
      { value: '+35%', metric: 'Tasa de Conversión de Leads' },
      { value: '-15%', metric: 'Tasa de rebote' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
  },
  {
    id: 5,
    title: 'Bestyle - Catálogo Digital Interactivo y Venta Express',
    image: 'https://oswal.com.co/wp-content/uploads/2025/05/bestyle2.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de una solución de catálogo digital ágil y moderna, permitiendo a Bestyle vender sus prendas online de forma rápida y directa a través de WhatsApp y enlaces de pago.',
    client: 'Bestyle',
    industry: 'Ropa y moda',
     myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer'],
    challenge: 'Bestyle, una marca de moda con fuerte presencia en redes sociales, necesitaba trascender la venta por mensaje directo y establecer una presencia online funcional y expedita para su catálogo de prendas. El principal desafío era crear una solución digital rápida y fácil de usar que permitiera a los clientes explorar las prendas, calcular el total de su compra y finalizar el pedido de manera fluida vía WhatsApp o mediante un enlace de pago, todo ello sin la complejidad de un e-commerce tradicional.',
    process: {
      research: [
       
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Diseño Responsivo y Adaptativo',
          'Adaptación de Componentes de Diseño e Iconografía Genérica',
           
        ],
        colors: [ ],
        typography: [
           
        ],
        icons: [
           
        ],
      },
      development: { 
        activities: [
           'Implementación de Funcionalidades Personalizadas',
          'Implementación de Generación de Pedido vía WhatsApp y link de pago',
          'Sistema de Búsqueda y Filtrado Dinámico (Categorías y Subcategorías)',
        ],  
        stack: [
         
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          
        ],
      },
      marketing: [
       
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756247093/Proyectos_oswal_web_design_bestyle_lh9b7z.gif',
      description: 'Se desarrolló una plataforma de catálogo digital ágil y moderna para Bestyle, permitiendo a la marca realizar ventas online rápidas y directas. permite a los clientes seleccionar prendas, calcular su total y finalizar la compra enviando el pedido por WhatsApp o a través de un link de pago.',
    },
    results: [
      { value: '+20%', metric: ' Ventas Directas Online' },
      { value: '24/7', metric: 'Mayor Alcance y Disponibilidad' },
      { value: '+30%', metric: 'Productividad en gestión de consultas' },
    ],
    liveUrl: 'https://bestyle.store/',
  },
  {
    id: 6,
    title: 'BetterMe - Tu Transformación Estética en Colombia',
    image: 'https://oswal.com.co/wp-content/uploads/2025/05/Betterme_Ver2.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Web moderna y sencilla para BetterMe, facilitando a extranjeros el acceso a servicios de cirugía y procedimientos estéticos en Colombia',
    client: 'Betterme',
    industry: 'Estética y Belleza', 
    location: 'Miami, Medellín',
    myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer'],
    challenge: 'El desafío principal era construir un sitio web que no solo mostrara la gama de servicios y el equipo de especialistas, sino que también transmitiera confianza, seguridad y la propuesta de valor integral (logística, recuperación). Además, era crucial que la plataforma fuera fácilmente actualizable por el equipo de BetterMe para mantener la información de servicios y especialistas al día.',
    process: {
      research: [
        
      ],
      design: {
        activities: [



        'Diseño de Mockups',
          'Prototipado',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#3a4183',  '#F1918C', '#E6E6F2'],
        typography: [ 
        { name: 'Manrope', usage: 'Títulos y texto contenido' },
        ],
        icons: [
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/quienes-somos.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/quienes-somos-betterme.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/facial.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/aparatologia.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/ciudades.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/medicina-estetica.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
        'Test A/B (A/B Testing)',
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249634/Proyectos_oswal_web_design_Betterme_hx48fj.gif',
      description:
        'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://betterme.oswal.com.co/',
  },
  {
    id: 7,
    title: 'Dedicándote: Website de Dedicatorias Musicales y Diseño Personalizado',
    image: 'https://oswal.com.co/wp-content/uploads/2025/05/dedicandote.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de una landing page promocional y funcional para "Dedicándote", permitiendo a los usuarios elegir diseños y dedicar canciones con reproductores de música personalizados',
    client: 'Dedicandote',
    industry: 'Músic', 
    location: 'Bogotá, Colombia',
  myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer','Marketing'],
    challenge: '"Dedicándote" buscaba lanzar un servicio innovador: dedicatorias musicales con diseños personalizados. El desafío era crear una presencia online atractiva y funcional que promocionara este producto único y, al mismo tiempo, facilitara el proceso de personalización de la dedicatoria, la selección de la canción, la visualización del reproductor y la gestión del pedido',
    process: {
      research: [
       
      ],
      design: {
        activities: [
        'Diseño de Mockups',
          'Prototipado',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#AA50E6', '#a9f9f3', '#3969CB'],
        typography: [
          { name: 'Montserrat', usage: 'Títulos y texto contenido' },
          
        ],
        icons: [

          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-song-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-play-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-get-quote-60.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-image-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/arco-iris.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/rayo.png' },
 
        ],
      },
      development: { 
        activities: [
          'Configuración hosting',
         'Construcción de Layouts y Diseño a Medida de reproductores de música',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
          'Implementación de Formulario',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
        'Test A/B (A/B Testing)',
        'Optimización para Motores de Búsqueda (SEO)',
        'Configuración Google Analytics y Google Search Console',
        'Estrategias de Adquisición de Tráfico',
        'Automatización flujo de venta',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249840/Proyectos_oswal_web_design_Dedicandote_f0subc.gif',
      description:
        'Se entregó una landing page promocional y transaccional para "Dedicándote", construida en WordPress, que integra reproductores de música personalizables desarrollados a medida con HTML, CSS y JavaScript. Esta plataforma, con un diseño moderno y centrado en la emoción, permite a los usuarios elegir entre diversos diseños, dedicar canciones, previsualizar su creación y gestionar el pedido con un formulario detallado, notificaciones automáticas por correo',
    },
    results: [
      { value: '5%', metric: 'Tasa de Conversión de Pedidos' },
      { value: '45%', metric: 'Nivel de Interacción con Reproductores' },
      { value: '70%', metric: 'Reducción del Tiempo de Procesamiento de Pedidos' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
  },
  {
    id: 8,
    title: 'AXA Colpatria - Rediseño Estratégico de portal público',
    image: 'https://oswal.com.co/wp-content/uploads/2025/06/AXA_Process.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Rediseño completo de la plataforma web de AXA Colpatria, elevando la experiencia de usuario e interfaz (UX/UI) a estándares de última generación, incorporando nuevas tecnologías y aplicando rigurosos principios de usabilidad y accesibilidad para optimizar la interacción de los clientes con los servicios de seguros.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: ' Colombia',
    myRole: 'Frontend Developer',
    responsibilities: ['UX /UI design'],
    challenge: 'AXA Colpatria, líder en el sector asegurador, enfrentaba el desafío de transformar su plataforma web existente en un canal digital que no solo fuera funcional, sino que realmente inspirara confianza, simplificara la compleja información de seguros y ofreciera una experiencia de usuario intuitiva y moderna. El reto era ambicioso: ir más allá de una actualización visual, enfocándose en una arquitectura de información optimizada, flujos de navegación simplificados y un diseño inclusivo',
    process: {
      research: [
         
        'Benchmark ',
        'Análisis de Usabilidad del Sitio Web',
        'User persona',
        'User Journey Map',
        'Card Sorting',
        'Sitemap',
        'Pruebas de Usabilidad',
        
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Integración sistema de diseño',
          'Prototipado',
          'Diseño de Iconografía y Elementos Gráficos',
          'Diseño de Microinteracciones y Estados de Componentes',
          'Diseño Responsivo y Adaptativo',
          'Aplicación de Estándares de Accesibilidad (WCAG 2.1 AA)',
          
        ],
        colors: ['#5C5CB7', '#3D3DAA', '#00008F', '#DD7358', '#D75D3D','#D24723','#7698CB','#41949F','#E196AA'],
        typography: [
          { name: 'Public headline', usage: 'Títulos y encabezados' },
          { name: 'Source sans pro', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu016-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu028-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu048-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu078-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu113-1.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/07/ilu134-1.png' }
        ],
      },
      development: { 
        activities: [
        
        ],  
        stack: [
         
        ],
      },
      marketing: [
       'Email-marketing',
      ],
    },
    solution: {
      gif: '',
      description:
        'Se entregó un rediseño estratégico de la plataforma web de AXA Colpatria, transformándola en una experiencia digital de seguros moderna, intuitiva e inclusiva.',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://www.axacolpatria.co/home',
     imageGallery: [
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756512408/AXA_Colpatria_antes_website_ecypnb.jpg",
        alt: "Imagen resultado sitio web_AXA_COLPATRIA",
        caption: "Home AXA Colpatria_antes",
        tag: "Antes" 
      },
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756511734/Proyectos_oswal_web_design_AXA_Home_page_p62gsa.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Home AXA Colpatria_Ahora",
        tag: "resultado" 
      }
     
    ]
  },
  {
    id: 9,
    title: 'Clínica Odontológica en Suecia',
    image: 'https://oswal.com.co/wp-content/uploads/2025/08/Clinica-en-suecia.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño Web y UX para una Experiencia Profesional y Confiable',
    client: 'kliniken Schröder',
    industry: 'Clinica dental',
    location: 'Estocolmo, Suecia',
      myRole: 'Web designer',
    responsibilities: ['Web designer'],
    challenge: 'Diseño y desarrollo de una plataforma web moderna y profesional para una clínica odontológica en Suecia, con el objetivo de proyectar confianza, facilitar el acceso a información sobre tratamientos.',
    process: {
      research: [
        
        'Análisis de Audiencia Sueca y Estándares de Confianza',
        'Análisis de Usabilidad del Sitio Web',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#2C2C96', '#99A833'],
        typography: [
          { name: 'Cormorant Garamond', usage: 'Títulos y encabezados' },
          { name: 'Open sans', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/08/corona-dental-2.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/08/Snarkskenor-icon2.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/08/Tandvardsradsla-icon2.png' },
          { type: 'image', value: 'https://oswal.com.co/wp-content/uploads/2025/08/Blekning-icon2.png' }
        ],
      },
      development: { 
        activities: [
         
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',

        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
  
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756514195/Proyectos_oswal_web_design_Tandkliniken_schroder_slkyt8.gif',
      description:
        'Se entregó un sitio web profesional y minimalista para la clínica odontológica en Suecia, diseñado para ser una herramienta clave en la captación y comunicación con los pacientes. La plataforma, con un estilo estético sueco, presenta los servicios y al equipo de manera clara y transparente, estableciendo la confianza digital',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://tandklinikenlschroder.se/',
  },
  {
    id: 10,
    title: 'Website venta café',
    image: 'http://www.amazonbb.com/wp-content/uploads/2023/05/boat-forest-river-blue-sky-reflection.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Revitalizando la presencia online para una experiencia amazónica auténtica y atractiva para el viajero internacional.',
    client: 'Centro comercial',
    industry: 'Centro comercial',
    location: 'Amazonas, Colombia',
    myRole: 'Frontend Developer',
    responsibilities: ['Dashboard Development', 'Data Visualization', 'Performance Optimization'],
    challenge: 'Amazon B&B, un encantador hotel inmerso en la exuberante selva amazónica, luchaba por conectar con su público objetivo: turistas extranjeros en busca de una experiencia única. Su sitio web existente era pesado, carente de diseño atractivo y con una usabilidad deficiente, lo que dificultaba la reserva y no reflejaba la belleza y autenticidad del lugar.',
    process: {
      research: [
        'Análisis de requisitos técnicos',
        'benchmark de sitios web de hoteles de ecoturismo',
        'Análisis de Usabilidad del Sitio Web',
        'User Flow',
        'Card Sorting',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#455D58', '#3B6317', '#9DBC79', '#EC9B30', '#2E3B48'],
        typography: [
          { name: 'EB Garamond', usage: 'Títulos y encabezados' },
          { name: 'Montserrat', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/Amazon-01.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete5-dia6.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete5-dia1.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete4-dia4.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete4-dia3.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/Package1-dia2-.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
        'Test A/B (A/B Testing)',
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzE3MmZiNjM5ZTBmZjM4ZjBiZjM4ZjJiZjM4ZjJiZjM4ZjJiZjM4Zg/3oKIPnAiaMCws8nOsE/giphy.gif',
      description:
        'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
  }
];
</script>

<style scoped>
.project-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 120px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  min-height: 100vh;
}

.button-wrapper {
  margin-bottom: 3rem;
  display: inline-block;
}

.portfolio-button {
  background: #4831D4;
  color: #fff;  
  border: 1px solid #4831D4;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
}

.portfolio-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.portfolio-button span {
  padding: 1rem 1.5rem;
  display: block;
  flex-grow: 1;
}

.portfolio-button .arrow-icon {
  background: #CCF381;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.portfolio-button .arrow-icon i {
  color: #4831D4;
  font-size: 1.2rem;
}

.portfolio-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(72, 49, 212, 0.2);
}

.portfolio-button:hover .arrow-icon {
  background: #c0e872;
}

.hero {
  position: relative;
  height: 62vh; 
  min-height: unset !important; 
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hero-image {
  background-size: cover;
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: contain;
  filter: brightness(0.7);
  display: block;
  transition: all 0.5s ease;
  transform: scale(1.05);
  filter: brightness(0.8);
}

/* Website Images Section */
.website-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.website-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.website-frame {
  background: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  overflow: hidden;
}

.website-frame:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(72, 49, 212, 0.2);
}

.website-image-container::-webkit-scrollbar {
  width: 6px;
}

.website-image-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.website-image-container::-webkit-scrollbar-thumb {
  background: #4831D4;
  border-radius: 3px;
}

.website-image-container::-webkit-scrollbar-thumb:hover {
  background: #3a2aa0;
}

.website-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  transition: transform 0.3s ease;
}

.website-frame:hover .website-image {
  transform: scale(1.02);
}

.image-label {
  font-size: 1rem;
  font-weight: 600;
  color: #4831D4;
  text-align: center;
  padding: 0.5rem 1rem;
  background: rgba(72, 49, 212, 0.1);
  border-radius: 20px;
  background-attachment: fixed;
  border: 1px solid rgba(72, 49, 212, 0.2);
}

.hero-content {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  right: 0;
  padding: 0.5rem 1rem;
  background: linear-gradient(to top, rgba(26, 26, 46, 0.95), transparent);
  color: white;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #CCF381);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleReveal 0.8s ease forwards;
}

.roles {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease forwards 0.2s;
  opacity: 0;
}

.role {
  background: rgba(72, 49, 212, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  border: 1px solid rgba(204, 243, 129, 0.3);
  transition: all 0.3s ease;
}

.role:hover {
  background: rgba(72, 49, 212, 0.5);
  border-color: #CCF381;
}

.achievement {
  font-size: 1.5rem;
  max-width: 800px;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease forwards 0.4s;
  opacity: 0;
  color: rgba(255, 255, 255, 0.9);
}

.section {
  margin-bottom: 6rem;
  animation: fadeIn 0.8s ease forwards;
}

.section-title {
  font-size: 2.5rem;
  color: #CCF381;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60%;
  height: 3px;
  background: linear-gradient(to right, #4831D4, transparent);
}

.client-section {
  margin-bottom: 4rem;
}

.client-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.client-info,
.role-info {
  background: rgba(72, 49, 212, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(204, 243, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.client-info:hover,
.role-info:hover {
  transform: translateY(-5px);
  border-color: #CCF381;
  box-shadow: 0 10px 30px rgba(72, 49, 212, 0.2);
}

.section-subtitle {
  color: #CCF381;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.section-subtitle::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40%;
  height: 2px;
  background: linear-gradient(to right, #CCF381, transparent);
  transition: width 0.3s ease;
}

.section-subtitle:hover::after {
  width: 100%;
}

.client-details {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.detail-item:hover {
  color: #CCF381;
  transform: translateX(5px);
}

.responsibilities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.responsibility-tag {
  background: rgba(72, 49, 212, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  color: rgba(255,255, 255, 0.9);
  border: 1px solid rgba(204, 243, 129, 0.1);
  transition: all 0.3s ease;
}

.responsibility-tag:hover {
  background: rgba(72, 49, 212, 0.3);
  border-color: #CCF381;
  transform: translateY(-2px);
}

.process-stage {
  background: rgba(72, 49, 212, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(204, 243, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.process-stage:hover {
  transform: translateY(-5px);
  border-color: #CCF381;
  box-shadow: 0 10px 30px rgba(72, 49, 212, 0.2);
}

.stage-title {
  color: #CCF381;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stage-title i {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.process-stage:hover .stage-title i {
  transform: scale(1.2);
}

.activity-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.activity-list li {
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.activity-list li::before {
  content: '→';
  color: #CCF381;
  transition: transform 0.3s ease;
}

.activity-list li:hover {
  color: #CCF381;
  transform: translateX(10px);
  border-bottom-color: #CCF381;
}

.activity-list li:hover::before {
  transform: translateX(5px);
}

.design-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.design-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.design-card:hover {
  transform: translateY(-5px);
  border-color: #CCF381;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header i {
  font-size: 1.5rem;
  color: #CCF381;
  background: rgba(204, 243, 129, 0.1);
  padding: 0.8rem;
  border-radius: 0.8rem;
  transition: all 0.3s ease;
}

.design-card:hover .card-header i {
  transform: scale(1.1);
  background: rgba(204, 243, 129, 0.2);
}

.card-header h4 {
  font-size: 1.2rem;
  color: white;
  margin: 0;
}

.colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
}

.color-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.color-preview {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.color-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}

.color-item:hover .color-tooltip {
  opacity: 1;
  transform: translateY(0);
}

.color-item:hover .color-preview {
  transform: scale(1.1);
  border-color: #CCF381;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.font-samples {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.font-item {
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;
  transition: all 0.3s ease;
}

.font-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(10px);
}

.font-name {
  font-size: 1.2rem;
  color: #CCF381;
  display: block;
  margin-bottom: 0.5rem;
}

.font-usage {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.font-preview {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  max-width: 100%;
  overflow-wrap: break-word;  
  word-break: break-word;     
  box-sizing: border-box;    
}

.font-item:hover .font-preview {
  background: rgba(0, 0, 0, 0.3);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.1rem;
  background: #F4F9FC;
  border-radius: 0.8rem;
  transition: all 0.3s ease;
}

.icon-item i {
  font-size: 1.8rem;
  color: #CCF381;
  transition: all 0.3s ease;
}

.icon-name {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  transition: all 0.3s ease;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
}

.tech-stack {
  margin-top: 2rem;
}

.tech-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;
  transition: all 0.3s ease;
  min-width: 100px;
}

.tech-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.tech-item i {
  font-size: 2rem;
  color: #CCF381;
  transition: all 0.3s ease;
}

.tech-item:hover i {
  transform: scale(1.2);
}

.tech-item span {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.tech-item:hover span {
  color: white;
}

/* Iconografía */
.icon-container-large {
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
}

.icon-container-large:hover {
  transform: translateY(-5px);
  border-color: #4831D4;
  border: 2px solid #e9ecef;
}

.project-icon {
  font-size: 3rem;
  transition: all 0.3s ease;
}

.icon-container-large:hover .project-icon {
  transform: scale(1.1);
  color: #3a2aa0;
}

.icon-image{
  width: 4rem;
  height: 4rem;
  box-shadow: none;
}
  
.solution-section {
  text-align: center;
}

.solution-content {
  max-width: 800px;
  margin: 0 auto;
}

.solution-demo {
  margin-bottom: 2rem;
}

.solution-gif {
  max-width: 600px;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.solution-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

/* Results Section Styles */
.results-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.result-card {
  display: block;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(72, 49, 212, 0.15);
  border-left-color: #CCF381;
}

.result-content {
  width: 100%;
}

.result-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4831D4;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.result-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.result-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
}

.results-images {
  margin-top: 3rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.image-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-item:hover {
  transform: translateY(-5px);
}

.image-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(72, 49, 212, 0.1);
  width: 100%;
  height: 300px;
}

.result-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-item:hover .result-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(72, 49, 212, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  color: white;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.floating-nav {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: auto;
  padding: 0.5rem;
}

.nav-container {
  background: white;
  padding: 0.75rem;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: none;
  background: transparent;
  color: #1a1a2e;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.nav-btn:hover:not(:disabled) {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.nav-btn.primary {
  background: #4831D4;
  color: white;
}

.nav-btn.primary:hover {
  background: #3a28a7;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-separator {
  width: 1px;
  height: 24px;
  background: rgba(0, 0, 0, 0.1);
}

.arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.nav-btn:hover .arrow-icon:not(.left) {
  transform: translateX(3px);
}

.nav-btn:hover .arrow-icon.left {
  transform: translateX(-3px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes titleReveal {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .project-detail {
    padding: 1.5rem;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .design-elements {
    grid-template-columns: 1fr;
  }

  .results-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .project-detail {
    padding: 1rem;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .achievement {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .client-grid {
    grid-template-columns: 1fr;
  }

  .design-elements {
    grid-template-columns: 1fr;
  }

  .floating-nav {
    width: calc(100% - 2rem);
    padding: 0.5rem;
    bottom: 1rem;
  }

  .nav-container {
    width: 100%;
    justify-content: space-between;
  }

  .nav-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .nav-btn.primary {
    padding: 0.5rem 1.5rem;
  }

  .solution-gif {
    max-width: 100%;
  }

  .iconography-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .website-images-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .results-cards {
    grid-template-columns: 1fr;
  }
  
  .result-number {
    font-size: 2rem;
  }
  
  .result-label {
    font-size: 1.1rem;
  }
  
  .images-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 2rem;
  }

  .achievement {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .iconography-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
  
  .website-images-grid {
    gap: 1rem;
  }

  .images-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .website-images-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .website-image-wrapper {
    max-width: 100%;
    min-width: auto;
  }
}
/* Estilos para la sección de la galería de imágenes */
.image-gallery-section {
    padding: 40px 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    margin-top: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center; /* Centrar el título de la sección */
}

.image-gallery-section .section-title {
    color: #333;
    font-size: 2.2em;
    margin-bottom: 30px;
    position: relative;
    display: inline-block; /* Para que la línea inferior se ajuste al texto */
}

.image-gallery-section .section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: #6a0dad; /* Un color morado, puedes ajustarlo a tu paleta */
    margin: 10px auto 0;
    border-radius: 2px;
}

.image-grid {
    display: grid;
    grid-template-columns: 1fr; /* Una columna por defecto */
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .image-grid {
        grid-template-columns: repeat(2, 1fr); /* Dos columnas en pantallas medianas y grandes */
    }
}

.gallery-image-wrapper {
    background-color: #fff;
    border-radius: 8px;
    /* Se cambió overflow: hidden; a esta regla para asegurar que las esquinas redondeadas del wrapper contengan el scroll */
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Se cambió justify-content: center; a flex-start para que el contenido se alinee al inicio y el scroll funcione */
    justify-content: flex-start;
    text-align: center;
    /* padding-bottom: 15px; se eliminó de aquí y se movió a gallery-image-caption si es necesario */
    position: relative; /* Necesario para posicionar el pseudo-elemento */
}

.gallery-image-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Estilos para el pseudo-elemento ::before que actuará como tag */
.gallery-image-wrapper.has-tag::before {
    content: attr(data-tag); /* Obtiene el texto del atributo data-tag */
    position: absolute;
    top: 15px;
    left: 15px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8em;
    font-weight: bold;
    text-transform: uppercase;
    z-index: 10; /* Asegura que el tag esté por encima de la imagen */
}

/* Estilos específicos para cada tipo de tag usando la clase en el wrapper */
.gallery-image-wrapper[data-tag="antes"]::before {
    background-color: #e74c3c; /* Rojo para "antes" */
}

.gallery-image-wrapper[data-tag="después"]::before {
    background-color: #2ecc71; /* Verde para "después" */
}

.gallery-image-wrapper[data-tag="resultado"]::before {
    background-color: #3498db; /* Azul para "resultado" */
}

/* --- NUEVO: Contenedor para la imagen con scroll --- */
.gallery-image-container {
    width: 100%;
    max-height: 500px; /* Altura máxima para el contenedor scrollable */
    overflow-y: auto; /* Habilita el scroll vertical cuando el contenido excede el max-height */
    border-bottom: 1px solid #eee; /* Separador sutil */
    /* Hereda los bordes redondeados superiores del wrapper para una apariencia unificada */
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #f1f1f1; /* Fondo para el área de scroll */

    /* Estilización de la barra de desplazamiento para un look más moderno (Firefox) */
    scrollbar-width: thin;
    scrollbar-color: #4730D3 #f1f1f1; /* Color base del pulgar y color de la pista */
}

/* Estilización de la barra de desplazamiento para navegadores basados en Webkit (Chrome, Safari, Edge) */
.gallery-image-container::-webkit-scrollbar {
    width: 8px; /* Ancho de la barra de desplazamiento vertical */
}

.gallery-image-container::-webkit-scrollbar-track {
    background: #f1f1f1; /* Fondo de la pista de la barra de desplazamiento */
    border-radius: 10px; /* Bordes redondeados para la pista */
}

.gallery-image-container::-webkit-scrollbar-thumb {
    background: #4730D3; /* Color del "pulgar" de la barra de desplazamiento */
    border-radius: 10px; /* Bordes redondeados para el pulgar */
}

.gallery-image-container::-webkit-scrollbar-thumb:hover {
    background: #3a25a0; /* Color del pulgar al pasar el ratón (un tono más oscuro de #4730D3) */
}

.gallery-image {
    width: 100%;
    height: auto; /* Permite que la imagen conserve su altura original */
    display: block; /* Elimina cualquier espacio extra debajo de la imagen */
    /* Las propiedades de altura mínima/máxima y object-fit ya no son necesarias aquí, las controla el contenedor con scroll */
    /* border-bottom: 1px solid #eee; se movió al contenedor gallery-image-container */
}

.gallery-image-caption {
    font-size: 0.9em;
    color: #666;
    margin-top: 15px;
    /* Ajustado el padding para incluir el padding-bottom que antes estaba en gallery-image-wrapper */
    padding: 0 15px 15px;
    line-height: 1.5;
}

/* Puedes ajustar los márgenes y paddings de las secciones generales si es necesario */
.section {
    margin-bottom: 60px; /* Un poco más de espacio entre secciones */
}

</style>