<template>
  <div class="project-detail">
    <!-- Close Button -->
    <router-link to="/projects" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <!-- Vertical Lines Background -->
    <div class="vertical-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!-- Content Wrapper -->
    <div class="content-wrapper">
      <!-- Project Header -->
      <div class="project-header">
        <div class="project-meta">
          <span class="project-number">Proyecto {{ projectId }}</span>
          <span class="project-category">{{ currentProject?.category || 'Categoría' }}</span>
        </div>
        <h1 class="project-title">{{ currentProject?.title || 'Título del Proyecto' }}</h1>
        <p class="project-subtitle">{{ currentProject?.description || 'Descripción del proyecto aquí' }}</p>
      </div>

      <!-- Project Image -->
      <div class="project-image-section">
        <div class="image-container">
          <img 
            :src="currentProject?.image || 'https://via.placeholder.com/800x600'" 
            :alt="currentProject?.title || 'Proyecto'" 
            class="main-image"
          />
        </div>
      </div>

      <!-- Project Info Grid -->
      <div class="project-info-grid">
        <div class="info-card">
          <h3>Cliente</h3>
          <p>{{ currentProject?.client || 'Nombre del cliente' }}</p>
        </div>
        <div class="info-card">
          <h3>Industria</h3>
          <p>{{ currentProject?.industry || 'Industria del proyecto' }}</p>
        </div>
        <div class="info-card">
          <h3>Mi Rol</h3>
          <p>{{ currentProject?.role || 'Rol en el proyecto' }}</p>
        </div>
        <div class="info-card">
          <h3>Año</h3>
          <p>{{ currentProject?.year || '2024' }}</p>
        </div>
      </div>

      <!-- Project Challenge -->
      <div class="project-section">
        <h2>El Reto</h2>
        <p>{{ currentProject?.challenge || 'Descripción del reto que presentaba este proyecto. Aquí se explica el problema principal que se necesitaba resolver y los objetivos específicos que se plantearon.' }}</p>
      </div>

      <!-- Project Solution -->
      <div class="project-section">
        <h2>La Solución</h2>
        <p>{{ currentProject?.solution || 'Explicación detallada de la solución implementada. Se describe el enfoque utilizado, las tecnologías empleadas y la metodología seguida para resolver el reto planteado.' }}</p>
        
        <!-- Solution Image/GIF -->
        <div v-if="currentProject?.solutionImage" class="solution-media">
          <img :src="currentProject.solutionImage" :alt="currentProject.title + ' - Solución'" class="solution-image" />
        </div>
      </div>

      <!-- Project Results -->
      <div class="project-section">
        <h2>Resultados</h2>
        <p>{{ currentProject?.results || 'Descripción de los resultados obtenidos con la implementación de la solución. Métricas, feedback del cliente y impacto del proyecto.' }}</p>
        
        <!-- Results Stats -->
        <div v-if="currentProject?.stats" class="results-stats">
          <div v-for="stat in currentProject.stats" :key="stat.label" class="stat-item">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Technologies Used -->
      <div class="project-section">
        <h2>Tecnologías</h2>
        <div class="tech-tags">
          <span v-for="tag in currentProject?.tags || ['HTML', 'CSS', 'JavaScript']" :key="tag" class="tech-tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Project Link -->
      <div class="project-actions">
        <button v-if="currentProject?.liveUrl" @click="openLiveProject" class="live-project-btn">
          <span>Ver Proyecto Live</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <div class="project-navigation">
        <button @click="goToPrevious" class="nav-btn prev-btn" :disabled="!hasPrevious">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Proyecto Anterior</span>
        </button>
        
        <button @click="goBack" class="nav-btn back-btn">
          <span>Volver a Proyectos</span>
        </button>
        
        <button @click="goToNext" class="nav-btn next-btn" :disabled="!hasNext">
          <span>Siguiente Proyecto</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
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

// Get project ID from route
const projectId = computed(() => parseInt(route.params.id as string))

// Projects data (same as in Projects.vue)
const projects = [
  { 
    id: 1, 
    title: "Website hotel", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359521/Hotel_Amazon_proyecto_oswal.png", 
    category: "website",
    client: "Hotel Amazon",
    tags: ["Hospitality", "Booking", "Responsive", "CMS"],
    industry: "Hospitalidad",
    role: "Diseñador Web & UX/UI",
    year: "2024",
    description: "Diseño y desarrollo de website para hotel boutique en el Amazonas",
    challenge: "Crear una experiencia digital que transmita la esencia única del Amazonas y facilite las reservas online.",
    solution: "Desarrollé un sitio web inmersivo con fotografía de alta calidad, sistema de reservas integrado y diseño responsive que refleja la naturaleza amazónica.",
    results: "Incremento del 45% en reservas online y mejora significativa en la experiencia del usuario.",
    liveUrl: "https://example.com"
  },
  { 
    id: 2, 
    title: "Web centro comercial", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png", 
    category: "ecommerce",
    client: "Micentro Comercial",
    tags: ["Shopping", "Directory", "Catalog", "Payment"],
    industry: "Retail",
    role: "Diseñador Web & Desarrollador",
    year: "2024",
    description: "Plataforma digital para centro comercial con directorio de tiendas y servicios",
    challenge: "Crear un hub digital que conecte a los visitantes con todas las tiendas y servicios del centro comercial.",
    solution: "Desarrollé una plataforma web con directorio interactivo, mapa del centro comercial, promociones y sistema de notificaciones.",
    results: "Mayor engagement de visitantes y aumento en las ventas de los locales comerciales."
  },
  { 
    id: 3, 
    title: "Website portal", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757361622/Redise%C3%B1o_web_Proyecto_oswal.png", 
    category: "website",
    client: "AXA Colpatria",
    tags: ["Portal", "Corporate", "Multi-page", "Professional"],
    industry: "Seguros",
    role: "UX/UI Designer & Frontend Developer",
    year: "2024",
    description: "Rediseño completo del portal corporativo de AXA Colpatria",
    challenge: "Modernizar la experiencia digital manteniendo la confianza y profesionalismo de la marca.",
    solution: "Rediseñé completamente la arquitectura de información, creé un sistema de diseño coherente y optimicé la usabilidad.",
    results: "Reducción del 60% en tiempo de búsqueda de información y mejora en satisfacción del usuario."
  },
  { 
    id: 4, 
    title: "Quizz Interactivo", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757370425/Quizz_website_proyectos_Oswal.png", 
    category: "interfaz",
    client: "Acueducto Bogotá",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    industry: "Servicios Públicos",
    role: "Desarrollador Frontend & UX Designer",
    year: "2024",
    description: "Aplicación interactiva educativa sobre el cuidado del agua",
    challenge: "Crear una experiencia gamificada que eduque sobre el uso responsable del agua de manera entretenida.",
    solution: "Desarrollé un quiz interactivo con Vue.js, animaciones atractivas y sistema de puntuación que motiva el aprendizaje.",
    results: "Alta participación ciudadana y mejora en la conciencia sobre el cuidado del agua."
  },
  { 
    id: 5, 
    title: "Bunker de libros", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop", 
    category: "ecommerce",
    client: "Bunker Libros",
    tags: ["Books", "E-commerce", "Reading", "Culture"],
    industry: "Editorial",
    role: "Diseñador Web & Desarrollador E-commerce",
    year: "2024",
    description: "Tienda online especializada en libros y cultura literaria",
    challenge: "Crear una experiencia de compra que celebre la cultura literaria y facilite la búsqueda de libros.",
    solution: "Diseñé una plataforma e-commerce con sistema de recomendaciones, reseñas de usuarios y ambiente que evoca una librería tradicional.",
    results: "Información pendiente de agregar."
  },
  { 
    id: 6, 
    title: "Website Clínica Dental", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757375618/Clinica_Betterme_proyecto_web_oswal.png", 
    category: "website",
    client: "Betterme Dental",
    tags: ["Healthcare", "Dental", "Medical", "Services"],
    industry: "Salud",
    role: "Diseñador Web & UX/UI",
    year: "2024",
    description: "Website profesional para clínica dental especializada",
    challenge: "Transmitir confianza y profesionalismo mientras se facilita la programación de citas.",
    solution: "Creé un diseño limpio y profesional con sistema de citas online, galería de casos y información detallada de servicios.",
    results: "Información pendiente de agregar."
  },
  { 
    id: 7, 
    title: "Catálogo digital", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371705/Bestyle_website_proyectos_Oswal.png", 
    category: "ecommerce",
    client: "Bestyle",
    tags: ["Catalog", "Products", "Search", "Filter"],
    industry: "Moda",
    role: "Diseñador UX/UI & Frontend",
    year: "2024",
    description: "Catálogo digital interactivo para marca de moda",
    challenge: "Crear una experiencia de navegación intuitiva que destaque los productos de moda.",
    solution: "Desarrollé un catálogo con filtros avanzados, vista de productos optimizada y experiencia de usuario fluida.",
    results: "Información pendiente de agregar."
  },
  { 
    id: 8, 
    title: "Landing page Intermediarios", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373349/Landing_Pages_inter_oswal.png", 
    category: "landing",
    client: "AXA Colpatria",
    tags: ["Insurance", "Intermediaries", "Lead Gen", "Forms"],
    industry: "Seguros",
    role: "Diseñador UX/UI & Desarrollador",
    year: "2024",
    description: "Landing page especializada para intermediarios de seguros",
    challenge: "Crear una página de conversión efectiva dirigida específicamente a intermediarios.",
    solution: "Diseñé una landing page optimizada para conversión con formularios inteligentes y contenido segmentado.",
    results: "Información pendiente de agregar."
  },
  { 
    id: 9, 
    title: "Clínica Cirugías Betterme", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757362220/Clinica_odontologica_proyecto_web_oswal.png", 
    category: "website",
    client: "Betterme Surgery",
    tags: ["Healthcare", "Surgery", "Medical", "Aesthetic"],
    industry: "Salud Estética",
    role: "Diseñador Web & UX/UI",
    year: "2024",
    description: "Website para clínica especializada en cirugías estéticas",
    challenge: "Crear confianza y mostrar profesionalismo en el área de cirugía estética.",
    solution: "Desarrollé un sitio web elegante con galería de resultados, información detallada de procedimientos y sistema de consultas.",
    results: "Información pendiente de agregar."
  },
  { 
    id: 10, 
    title: "Dedicador canciones", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757372516/Dedicandote_proyecto_oswal_music.png", 
    category: "landing",
    client: "Dedicandote",
    tags: ["Music", "Entertainment", "Social", "Interactive"],
    industry: "Entretenimiento",
    role: "Diseñador UX/UI & Desarrollador",
    year: "2024",
    description: "Plataforma para dedicar canciones de manera personalizada",
    challenge: "Crear una experiencia emotiva y personal para dedicar música.",
    solution: "Diseñé una interfaz intuitiva con elementos visuales atractivos y flujo de dedicatoria optimizado.",
    results: "Información pendiente de agregar."
  },
  { 
    id: 11, 
    title: "Website venta café", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373361/Website_cafe_proyecto_oswal_col.png", 
    category: "ecommerce",
    client: "Café Cumbre",
    tags: ["Coffee", "Retail", "Online Store", "Products"],
    industry: "Alimentos y Bebidas",
    role: "Diseñador Web & Desarrollador E-commerce",
    year: "2024",
    description: "Tienda online para marca de café artesanal colombiano",
    challenge: "Transmitir la calidad y origen del café mientras se facilita la compra online.",
    solution: "Creé una experiencia e-commerce que cuenta la historia del café, con proceso de compra optimizado y diseño que evoca la cultura cafetera.",
    results: "Información pendiente de agregar."
  }
]

// Get current project
const currentProject = computed(() => {
  return projects.find(project => project.id === projectId.value)
})

// Navigation helpers
const hasPrevious = computed(() => projectId.value > 1)
const hasNext = computed(() => projectId.value < projects.length)

// Navigation functions
const goBack = () => {
  router.push('/projects')
}

const goToPrevious = () => {
  if (hasPrevious.value) {
    router.push(`/project/${projectId.value - 1}`)
  }
}

const goToNext = () => {
  if (hasNext.value) {
    router.push(`/project/${projectId.value + 1}`)
  }
}

const openLiveProject = () => {
  if (currentProject.value?.liveUrl) {
    window.open(currentProject.value.liveUrl, '_blank')
  }
}
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  background: #F4F9FC;
  position: relative;
  overflow-y: auto;
}

/* Close Button */
.close-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(72, 49, 212, 0.1);
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4831D4;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.close-button:hover {
  background: rgba(72, 49, 212, 0.2);
  transform: rotate(90deg);
}

/* Vertical Lines Background */
.vertical-lines {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  z-index: 0;
}

.line {
  width: 1px;
  height: 100%;
  background-color: rgba(72, 49, 212, 0.1);
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
}

/* Project Header */
.project-header {
  text-align: center;
  margin-bottom: 4rem;
}

.project-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.project-number,
.project-category {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4831D4;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.project-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #2d3748;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.project-subtitle {
  font-size: 1.3rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Project Image */
.project-image-section {
  margin-bottom: 4rem;
}

.image-container {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
}

/* Project Info Grid */
.project-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.info-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #4831D4;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.info-card p {
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0;
  font-weight: 600;
}

/* Project Sections */
.project-section {
  margin-bottom: 4rem;
}

.project-section h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4831D4;
  margin-bottom: 1.5rem;
}

.project-section p {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* Solution Media */
.solution-media {
  margin-top: 2rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.solution-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Results Stats */
.results-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  color: #4831D4;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  font-weight: 600;
}

/* Tech Tags */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-tag {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  color: white;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(72, 49, 212, 0.3);
}

/* Project Actions */
.project-actions {
  text-align: center;
  margin-bottom: 4rem;
}

.live-project-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  background: #4831D4;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.3);
}

.live-project-btn:hover {
  background: #6A5AE0;
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(72, 49, 212, 0.4);
}

/* Project Navigation */
.project-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(72, 49, 212, 0.1);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: white;
  color: #4831D4;
  border: 2px solid #4831D4;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.nav-btn:hover:not(:disabled) {
  background: #4831D4;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.3);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-btn {
  background: #4831D4;
  color: white;
}

.back-btn:hover {
  background: #6A5AE0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 2rem 1rem;
  }

  .project-title {
    font-size: 2.5rem;
  }

  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .main-image {
    height: 300px;
  }

  .project-info-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .info-card {
    padding: 1.5rem;
  }

  .project-section h2 {
    font-size: 2rem;
  }

  .project-navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-btn {
    width: 100%;
    justify-content: center;
  }

  .results-stats {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .stat-item {
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 2rem;
  }

  .project-subtitle {
    font-size: 1.1rem;
  }

  .main-image {
    height: 250px;
  }

  .project-section h2 {
    font-size: 1.8rem;
  }

  .project-section p {
    font-size: 1.1rem;
  }

  .tech-tags {
    justify-content: center;
  }

  .tech-tag {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>