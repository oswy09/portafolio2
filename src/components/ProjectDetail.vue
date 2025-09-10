<template>
  <div class="project-detail">
    <!-- Close Button -->
    <router-link to="/projects" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M7 17L17 7M17 7H7M17 7V17"/>
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

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Project Header -->
      <div class="project-header">
        <div class="project-meta">
          <span class="project-category">{{ project?.category }}</span>
          <span class="project-year">{{ project?.year }}</span>
        </div>
        <h1 class="project-title">{{ project?.title }}</h1>
        <p class="project-description">{{ project?.description }}</p>
        
        <!-- Project Tags -->
        <div class="project-tags">
          <span v-for="tag in project?.tags" :key="tag" class="project-tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Project Image -->
      <div class="project-image-container">
        <img :src="project?.image" :alt="project?.title" class="project-image" />
      </div>

      <!-- Project Details -->
      <div class="project-details">
        <div class="details-grid">
          <!-- Client Info -->
          <div class="detail-card">
            <h3>Cliente</h3>
            <p>{{ project?.client }}</p>
          </div>

          <!-- Duration -->
          <div class="detail-card">
            <h3>Duración</h3>
            <p>{{ project?.duration || '2-3 meses' }}</p>
          </div>

          <!-- Role -->
          <div class="detail-card">
            <h3>Mi Rol</h3>
            <p>{{ project?.role || 'Diseño UX/UI & Desarrollo' }}</p>
          </div>

          <!-- Tools -->
          <div class="detail-card">
            <h3>Herramientas</h3>
            <p>{{ project?.tools || 'Figma, Vue.js, CSS' }}</p>
          </div>
        </div>
      </div>

      <!-- Project Process -->
      <div class="project-process">
        <h2>Proceso de Desarrollo</h2>
        <div class="process-steps">
          <div v-for="(step, index) in processSteps" :key="index" class="process-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Results -->
      <div class="project-results">
        <h2>Resultados</h2>
        <div class="results-grid">
          <div v-for="result in results" :key="result.id" class="result-card">
            <div class="result-icon">{{ result.icon }}</div>
            <h4>{{ result.label }}</h4>
            <p>{{ result.description }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="project-navigation">
        <button @click="goBack" class="nav-button secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver a Proyectos
        </button>
        
        <button @click="nextProject" class="nav-button primary">
          Siguiente Proyecto
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface Project {
  id: number
  title: string
  image: string
  category: string
  client: string
  tags: string[]
  year: string
  description: string
  duration?: string
  role?: string
  tools?: string
}

interface ProcessStep {
  title: string
  description: string
}

interface Result {
  id: number
  icon: string
  label: string
  description: string
}

const project = ref<Project | null>(null)

const projects: Project[] = [
  { 
    id: 1, 
    title: "Quizz Interactivo", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757370425/Quizz_website_proyectos_Oswal.png", 
    category: "Interfaz Interactiva",
    client: "Acueducto Bogotá",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    year: "2024",
    description: "Una experiencia interactiva gamificada para educar sobre el uso responsable del agua, combinando elementos de juego con información educativa.",
    duration: "3 meses",
    role: "UX/UI Designer & Frontend Developer",
    tools: "Figma, Vue.js, GSAP, CSS3"
  },
  { 
    id: 2, 
    title: "Website Hotel", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359521/Hotel_Amazon_proyecto_oswal.png", 
    category: "Website Corporativo",
    client: "Hotel Amazon",
    tags: ["Hospitality", "Booking", "Responsive", "CMS"],
    year: "2024",
    description: "Sitio web completo para hotel boutique con sistema de reservas integrado y experiencia de usuario optimizada para conversión.",
    duration: "4 meses",
    role: "Web Designer & Developer",
    tools: "WordPress, Elementor, CSS3, JavaScript"
  },
  { 
    id: 3, 
    title: "Website Centro Comercial", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png", 
    category: "E-commerce",
    client: "Micentro Comercial",
    tags: ["Shopping", "Directory", "Catalog", "Payment"],
    year: "2024",
    description: "Plataforma digital para centro comercial con directorio de tiendas, promociones y sistema de navegación interior.",
    duration: "5 meses",
    role: "UX/UI Designer & Full Stack Developer",
    tools: "Vue.js, Node.js, MongoDB, Stripe"
  }
]

const processSteps: ProcessStep[] = [
  {
    title: "Investigación y Análisis",
    description: "Análisis del mercado, usuarios objetivo y competencia para definir la estrategia del proyecto."
  },
  {
    title: "Diseño UX/UI",
    description: "Creación de wireframes, prototipos y diseño visual siguiendo las mejores prácticas de usabilidad."
  },
  {
    title: "Desarrollo",
    description: "Implementación del diseño usando tecnologías modernas y optimización para rendimiento."
  },
  {
    title: "Testing y Optimización",
    description: "Pruebas de usabilidad, corrección de errores y optimización final antes del lanzamiento."
  }
]

const results: Result[] = [
  {
    id: 1,
    icon: "📈",
    label: "Aumento en Conversión",
    description: "45% de mejora en la tasa de conversión comparado con la versión anterior."
  },
  {
    id: 2,
    icon: "⚡",
    label: "Velocidad Optimizada",
    description: "Tiempo de carga reducido en un 60%, mejorando la experiencia del usuario."
  },
  {
    id: 3,
    icon: "📱",
    label: "Diseño Responsive",
    description: "100% compatible con dispositivos móviles y tablets."
  },
  {
    id: 4,
    icon: "🎯",
    label: "UX Mejorada",
    description: "Reducción del 35% en la tasa de rebote gracias al diseño intuitivo."
  }
]

const projectId = computed(() => parseInt(route.params.id as string))

const goBack = () => {
  router.push('/projects')
}

const nextProject = () => {
  const currentIndex = projects.findIndex(p => p.id === projectId.value)
  const nextIndex = (currentIndex + 1) % projects.length
  const nextId = projects[nextIndex].id
  router.push(`/project/${nextId}`)
}

onMounted(() => {
  project.value = projects.find(p => p.id === projectId.value) || null
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: #F4F9FC;
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
  margin-bottom: 1rem;
}

.project-category,
.project-year {
  background: rgba(72, 49, 212, 0.1);
  color: #4831D4;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.project-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #4831D4;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.project-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-tag {
  background: #4831D4;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Project Image */
.project-image-container {
  margin-bottom: 4rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Project Details */
.project-details {
  margin-bottom: 4rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.detail-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.detail-card h3 {
  color: #4831D4;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.detail-card p {
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

/* Project Process */
.project-process {
  margin-bottom: 4rem;
}

.project-process h2 {
  font-size: 2.5rem;
  color: #4831D4;
  text-align: center;
  margin-bottom: 3rem;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 50px;
  height: 50px;
  background: #4831D4;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-content h4 {
  color: #4831D4;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #666;
  line-height: 1.6;
}

/* Project Results */
.project-results {
  margin-bottom: 4rem;
}

.project-results h2 {
  font-size: 2.5rem;
  color: #4831D4;
  text-align: center;
  margin-bottom: 3rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.result-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.result-card h4 {
  color: #4831D4;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.result-card p {
  color: #666;
  line-height: 1.5;
}

/* Project Navigation */
.project-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(72, 49, 212, 0.1);
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.nav-button.primary {
  background: #4831D4;
  color: white;
}

.nav-button.primary:hover {
  background: #3a2aa0;
  transform: translateY(-2px);
}

.nav-button.secondary {
  background: transparent;
  color: #4831D4;
  border: 2px solid #4831D4;
}

.nav-button.secondary:hover {
  background: #4831D4;
  color: white;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-title {
    font-size: 2.5rem;
  }
  
  .project-meta {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .process-step {
    flex-direction: column;
    text-align: center;
  }
  
  .project-navigation {
    flex-direction: column;
  }
  
  .content-wrapper {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 2rem;
  }
  
  .project-description {
    font-size: 1rem;
  }
  
  .details-grid,
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>