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

const getStackIcon = (tech) => {
  const iconMap = {
    'Vue.js': 'fab fa-vuejs',
    'JavaScript': 'fab fa-js-square',
    'HTML5': 'fab fa-html5',
    'CSS3': 'fab fa-css3-alt',
    'Node.js': 'fab fa-node-js',
    'MongoDB': 'fas fa-database',
    'Express': 'fas fa-server',
    'React': 'fab fa-react',
    'Angular': 'fab fa-angular',
    'PHP': 'fab fa-php',
    'Python': 'fab fa-python',
    'Laravel': 'fab fa-laravel',
    'WordPress': 'fab fa-wordpress',
    'MySQL': 'fas fa-database',
    'PostgreSQL': 'fas fa-database',
    'Git': 'fab fa-git-alt',
    'Docker': 'fab fa-docker',
    'AWS': 'fab fa-aws',
    'Firebase': 'fas fa-fire',
    'Figma': 'fab fa-figma',
    'Adobe XD': 'fas fa-vector-square',
    'Photoshop': 'fas fa-image',
    'Illustrator': 'fas fa-bezier-curve',
    'Tailwind CSS': 'fas fa-wind',
    'Bootstrap': 'fab fa-bootstrap',
    'Sass': 'fab fa-sass',
    'TypeScript': 'fas fa-code',
    'Webpack': 'fas fa-cube',
    'Vite': 'fas fa-bolt'
  }
  
  return iconMap[tech] || 'fas fa-code'
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
      gif: 'https://oswal.com.co/wp-content/uploads/2025/08/p2.gif',
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
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
     imageGallery: [
      {
        url: "https://oswal.com.co/wp-content/uploads/2025/08/Amazon_mockup02-scaled.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B_portafolio servicios",
        tag: "Resultado" 
      },
      {
        url: "https://oswal.com.co/wp-content/uploads/2025/08/Amazon_mockup03-scaled.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B_portafolio servicios",
        tag: "Resultado" 
      }
     
    ]
  
  },
  {
    id: 3,
    title: 'MiCentro: Navegando la Experiencia Comercial ',
    image: 'https://oswal.com.co/wp-content/uploads/2025/05/micentro_el_porvenir.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de un sitio web moderno para centro