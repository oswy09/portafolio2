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

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="project-title">{{ project.title }}</h1>
        <p class="project-description">{{ project.description }}</p>
        
        <!-- Project Tags -->
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="project-tag">
            {{ tag }}
          </span>
        </div>

        <!-- Project Info -->
        <div class="project-info">
          <div class="info-item">
            <span class="info-label">Cliente:</span>
            <span class="info-value">{{ project.client }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Año:</span>
            <span class="info-value">{{ project.year }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Categoría:</span>
            <span class="info-value">{{ project.category }}</span>
          </div>
        </div>

        <!-- Project Actions -->
        <div class="project-actions">
          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" class="action-button primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Ver Sitio
          </a>
          <button @click="goBack" class="action-button secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver
          </button>
        </div>
      </div>

      <!-- Project Image -->
      <div class="hero-image">
        <img :src="project.image" :alt="project.title" class="main-image">
      </div>
    </div>

    <!-- NUEVA SECCIÓN 1: Antes y Después -->
    <div class="before-after-section">
      <div class="section-container">
        <h2 class="section-title">Antes y Después</h2>
        <p class="section-description">Transformación visual del proyecto</p>
        
        <div class="before-after-container">
          <!-- Antes -->
          <div class="comparison-item">
            <div class="comparison-header">
              <h3>Antes</h3>
              <span class="comparison-badge before">Versión Original</span>
            </div>
            <div class="comparison-image-container">
              <img :src="project.beforeImage" :alt="`${project.title} - Antes`" class="comparison-image">
              <div class="image-overlay">
                <div class="overlay-content">
                  <span class="overlay-text">Estado Inicial</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Después -->
          <div class="comparison-item">
            <div class="comparison-header">
              <h3>Después</h3>
              <span class="comparison-badge after">Versión Mejorada</span>
            </div>
            <div class="comparison-image-container">
              <img :src="project.afterImage" :alt="`${project.title} - Después`" class="comparison-image">
              <div class="image-overlay">
                <div class="overlay-content">
                  <span class="overlay-text">Resultado Final</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mejoras Destacadas -->
        <div class="improvements-list">
          <h4>Mejoras Implementadas:</h4>
          <div class="improvements-grid">
            <div v-for="improvement in project.improvements" :key="improvement" class="improvement-item">
              <div class="improvement-icon">✓</div>
              <span>{{ improvement }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NUEVA SECCIÓN 2: Vista Interactiva (como la imagen adjunta) -->
    <div class="interactive-view-section">
      <div class="section-container">
        <h2 class="section-title">Vista Interactiva</h2>
        <p class="section-description">Explora el proyecto en detalle</p>
        
        <div class="interactive-container">
          <!-- Device Frame -->
          <div class="device-frame">
            <div class="device-header">
              <div class="device-controls">
                <div class="control-dot red"></div>
                <div class="control-dot yellow"></div>
                <div class="control-dot green"></div>
              </div>
            </div>
            
            <!-- Scrollable Content Area -->
            <div class="device-screen" @scroll="handleScroll" ref="deviceScreen">
              <div class="screen-content">
                <img :src="project.fullScreenshot" :alt="`${project.title} - Vista completa`" class="full-screenshot">
              </div>
            </div>
            
            <!-- Navigation Controls -->
            <div class="navigation-controls">
              <button @click="scrollToTop" class="nav-button" :class="{ active: scrollPosition === 'top' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
              </button>
              <button @click="scrollToMiddle" class="nav-button" :class="{ active: scrollPosition === 'middle' }">
                <div class="nav-dot"></div>
              </button>
              <button @click="scrollToBottom" class="nav-button" :class="{ active: scrollPosition === 'bottom' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Project Details Sidebar -->
          <div class="details-sidebar">
            <h3>Detalles del Proyecto</h3>
            
            <div class="detail-section">
              <h4>Tecnologías Utilizadas</h4>
              <div class="tech-stack">
                <span v-for="tech in project.technologies" :key="tech" class="tech-item">
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="detail-section">
              <h4>Características Principales</h4>
              <ul class="features-list">
                <li v-for="feature in project.mainFeatures" :key="feature">{{ feature }}</li>
              </ul>
            </div>

            <div class="detail-section">
              <h4>Proceso de Desarrollo</h4>
              <div class="process-steps">
                <div v-for="(step, index) in project.developmentProcess" :key="index" class="process-step">
                  <div class="step-number">{{ index + 1 }}</div>
                  <div class="step-content">
                    <h5>{{ step.title }}</h5>
                    <p>{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NUEVA SECCIÓN 3: Galería de Imágenes con Scroll -->
    <div class="image-gallery-section">
      <div class="section-container">
        <h2 class="section-title">Galería del Proyecto</h2>
        <p class="section-description">Desliza para ver más capturas del proyecto</p>
        
        <div class="gallery-container" @wheel="handleGalleryWheel" ref="galleryContainer">
          <div class="gallery-track" :style="{ transform: `translateX(${galleryTranslate}px)` }">
            <div v-for="(image, index) in project.gallery" :key="index" class="gallery-item">
              <div class="gallery-image-container">
                <img :src="image.url" :alt="image.caption" class="gallery-image">
                <div class="image-caption">
                  <h4>{{ image.title }}</h4>
                  <p>{{ image.caption }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gallery Progress -->
        <div class="gallery-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: galleryProgress + '%' }"></div>
          </div>
          <div class="progress-indicators">
            <div 
              v-for="(image, index) in project.gallery" 
              :key="index"
              class="progress-dot"
              :class="{ active: currentGalleryIndex === index }"
              @click="scrollToGalleryItem(index)"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Existing Content Continues... -->
    <div class="content-sections">
      <!-- Project Overview -->
      <div class="section overview-section">
        <div class="section-container">
          <h2 class="section-title">Resumen del Proyecto</h2>
          <div class="overview-content">
            <div class="overview-text">
              <p>{{ project.overview }}</p>
              
              <!-- Challenge -->
              <div class="subsection">
                <h3>El Desafío</h3>
                <p>{{ project.challenge }}</p>
              </div>

              <!-- Solution -->
              <div class="subsection">
                <h3>La Solución</h3>
                <p>{{ project.solution }}</p>
              </div>

              <!-- Results -->
              <div class="subsection">
                <h3>Resultados</h3>
                <p>{{ project.results }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technical Details -->
      <div class="section technical-section">
        <div class="section-container">
          <h2 class="section-title">Detalles Técnicos</h2>
          <div class="technical-grid">
            <div class="tech-card">
              <h3>Frontend</h3>
              <ul>
                <li v-for="tech in project.frontend" :key="tech">{{ tech }}</li>
              </ul>
            </div>
            <div class="tech-card">
              <h3>Backend</h3>
              <ul>
                <li v-for="tech in project.backend" :key="tech">{{ tech }}</li>
              </ul>
            </div>
            <div class="tech-card">
              <h3>Herramientas</h3>
              <ul>
                <li v-for="tool in project.tools" :key="tool">{{ tool }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="project-navigation">
      <button @click="goToPreviousProject" class="nav-project-btn" :disabled="!previousProject">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span v-if="previousProject">{{ previousProject.title }}</span>
        <span v-else>Proyecto Anterior</span>
      </button>
      
      <button @click="goToNextProject" class="nav-project-btn" :disabled="!nextProject">
        <span v-if="nextProject">{{ nextProject.title }}</span>
        <span v-else>Siguiente Proyecto</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Nuevas variables reactivas para las nuevas secciones
const deviceScreen = ref<HTMLElement | null>(null)
const galleryContainer = ref<HTMLElement | null>(null)
const scrollPosition = ref('top')
const galleryTranslate = ref(0)
const galleryProgress = ref(0)
const currentGalleryIndex = ref(0)
const maxGalleryScroll = ref(0)

// Datos del proyecto (expandidos con nueva información)
const projects = [
  {
    id: 1,
    title: "Quizz Interactivo",
    description: "Una aplicación web interactiva para crear y participar en quizzes educativos con elementos gamificados.",
    image: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
    beforeImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    afterImage: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
    fullScreenshot: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    client: "Institución Educativa",
    year: "2024",
    category: "Aplicación Web",
    liveUrl: "https://example.com",
    overview: "Este proyecto nació de la necesidad de crear una herramienta educativa más atractiva y efectiva para estudiantes de diferentes niveles.",
    challenge: "El principal desafío fue crear una interfaz que fuera tanto educativa como entretenida, manteniendo el equilibrio entre gamificación y aprendizaje efectivo.",
    solution: "Desarrollamos una aplicación con elementos interactivos, sistema de puntuación, y retroalimentación inmediata para mantener el engagement del usuario.",
    results: "La aplicación logró un 85% de engagement estudiantil y mejoró las calificaciones promedio en un 30%.",
    improvements: [
      "Interfaz más intuitiva y atractiva",
      "Sistema de gamificación implementado",
      "Retroalimentación inmediata",
      "Diseño responsive optimizado",
      "Mejor rendimiento y velocidad"
    ],
    technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
    mainFeatures: [
      "Creación de quizzes personalizados",
      "Sistema de puntuación en tiempo real",
      "Multiplayer en línea",
      "Estadísticas detalladas",
      "Interfaz responsive"
    ],
    developmentProcess: [
      {
        title: "Investigación y Análisis",
        description: "Análisis de necesidades educativas y benchmarking de competidores"
      },
      {
        title: "Diseño UX/UI",
        description: "Creación de wireframes, prototipos y sistema de diseño"
      },
      {
        title: "Desarrollo Frontend",
        description: "Implementación de la interfaz con Vue.js y componentes reutilizables"
      },
      {
        title: "Desarrollo Backend",
        description: "API REST con Node.js y base de datos MongoDB"
      },
      {
        title: "Testing y Optimización",
        description: "Pruebas de usabilidad y optimización de rendimiento"
      }
    ],
    gallery: [
      {
        url: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
        title: "Pantalla Principal",
        caption: "Vista principal del quiz con opciones interactivas"
      },
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        title: "Dashboard de Resultados",
        caption: "Panel de estadísticas y progreso del usuario"
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        title: "Vista Mobile",
        caption: "Diseño responsive optimizado para dispositivos móviles"
      },
      {
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2074&auto=format&fit=crop",
        title: "Configuración",
        caption: "Panel de configuración y personalización"
      }
    ],
    frontend: ["Vue.js", "Tailwind CSS", "Vite"],
    backend: ["Node.js", "Express", "MongoDB"],
    tools: ["Figma", "Git", "Docker", "Netlify"]
  }
  // Más proyectos...
]

const project = computed(() => {
  const id = parseInt(route.params.id as string)
  return projects.find(p => p.id === id) || projects[0]
})

const previousProject = computed(() => {
  const currentIndex = projects.findIndex(p => p.id === project.value.id)
  return currentIndex > 0 ? projects[currentIndex - 1] : null
})

const nextProject = computed(() => {
  const currentIndex = projects.findIndex(p => p.id === project.value.id)
  return currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
})

// Métodos para las nuevas funcionalidades
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  const scrollTop = target.scrollTop
  const scrollHeight = target.scrollHeight - target.clientHeight
  const scrollPercent = scrollTop / scrollHeight

  if (scrollPercent < 0.33) {
    scrollPosition.value = 'top'
  } else if (scrollPercent < 0.66) {
    scrollPosition.value = 'middle'
  } else {
    scrollPosition.value = 'bottom'
  }
}

const scrollToTop = () => {
  if (deviceScreen.value) {
    deviceScreen.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const scrollToMiddle = () => {
  if (deviceScreen.value) {
    const scrollHeight = deviceScreen.value.scrollHeight - deviceScreen.value.clientHeight
    deviceScreen.value.scrollTo({ top: scrollHeight / 2, behavior: 'smooth' })
  }
}

const scrollToBottom = () => {
  if (deviceScreen.value) {
    const scrollHeight = deviceScreen.value.scrollHeight - deviceScreen.value.clientHeight
    deviceScreen.value.scrollTo({ top: scrollHeight, behavior: 'smooth' })
  }
}

const handleGalleryWheel = (event: WheelEvent) => {
  event.preventDefault()
  const scrollAmount = event.deltaY * 2
  setGalleryTransform(galleryTranslate.value - scrollAmount)
}

const setGalleryTransform = (translate: number) => {
  galleryTranslate.value = Math.max(Math.min(translate, 0), -maxGalleryScroll.value)
  updateGalleryProgress()
}

const updateGalleryProgress = () => {
  if (maxGalleryScroll.value > 0) {
    galleryProgress.value = Math.abs(galleryTranslate.value) / maxGalleryScroll.value * 100
    
    // Update current gallery index
    const itemWidth = 400 // Approximate width of each gallery item
    currentGalleryIndex.value = Math.round(Math.abs(galleryTranslate.value) / itemWidth)
  }
}

const scrollToGalleryItem = (index: number) => {
  const itemWidth = 400
  const targetTranslate = -index * itemWidth
  setGalleryTransform(targetTranslate)
}

// Métodos existentes
const goBack = () => {
  router.push('/projects')
}

const goToPreviousProject = () => {
  if (previousProject.value) {
    router.push(`/project/${previousProject.value.id}`)
  }
}

const goToNextProject = () => {
  if (nextProject.value) {
    router.push(`/project/${nextProject.value.id}`)
  }
}

onMounted(() => {
  // Calculate max scroll for gallery
  if (galleryContainer.value) {
    const container = galleryContainer.value
    const track = container.querySelector('.gallery-track') as HTMLElement
    if (track) {
      maxGalleryScroll.value = track.offsetWidth - container.offsetWidth
    }
  }
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  background: #F4F9FC;
  position: relative;
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
  z-index: 100;
  transition: all 0.3s ease;
  cursor: pointer;
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

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 6rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-content {
  flex: 1;
}

.project-title {
  font-size: 3rem;
  font-weight: bold;
  color: #4831D4;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.project-description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.project-tag {
  padding: 0.5rem 1rem;
  background: rgba(72, 49, 212, 0.1);
  color: #4831D4;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  gap: 1rem;
}

.info-label {
  font-weight: 600;
  color: #4831D4;
  min-width: 80px;
}

.info-value {
  color: #666;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.action-button.primary {
  background: #4831D4;
  color: white;
}

.action-button.primary:hover {
  background: #3a2aa0;
  transform: translateY(-2px);
}

.action-button.secondary {
  background: transparent;
  color: #4831D4;
  border: 2px solid #4831D4;
}

.action-button.secondary:hover {
  background: #4831D4;
  color: white;
}

.hero-image {
  flex: 1;
  max-width: 500px;
}

.main-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* NUEVOS ESTILOS PARA LAS 3 SECCIONES AGREGADAS */

/* Sección Antes y Después */
.before-after-section {
  padding: 4rem 2rem;
  background: white;
  position: relative;
  z-index: 1;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4831D4;
  text-align: center;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
}

.before-after-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.comparison-item {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.comparison-header h3 {
  font-size: 1.5rem;
  color: #4831D4;
  margin: 0;
}

.comparison-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.comparison-badge.before {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
}

.comparison-badge.after {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.comparison-image-container {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.comparison-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.comparison-item:hover .comparison-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.comparison-item:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
}

.overlay-text {
  font-weight: 600;
  font-size: 1.1rem;
}

.improvements-list {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid #4831D4;
}

.improvements-list h4 {
  color: #4831D4;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.improvements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.improvement-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.improvement-icon {
  width: 24px;
  height: 24px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
}

/* Sección Vista Interactiva */
.interactive-view-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
  position: relative;
  z-index: 1;
}

.interactive-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.device-frame {
  background: #2c3e50;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
}

.device-header {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.device-controls {
  display: flex;
  gap: 0.5rem;
}

.control-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control-dot.red { background: #ff5f57; }
.control-dot.yellow { background: #febc2e; }
.control-dot.green { background: #28c840; }

.device-screen {
  background: white;
  border-radius: 10px;
  height: 500px;
  overflow-y: auto;
  position: relative;
}

.screen-content {
  min-height: 1200px;
}

.full-screenshot {
  width: 100%;
  height: auto;
  display: block;
}

.navigation-controls {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem;
  border-radius: 20px;
}

.nav-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover,
.nav-button.active {
  background: #4831D4;
}

.nav-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

.details-sidebar {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.details-sidebar h3 {
  color: #4831D4;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-item {
  padding: 0.3rem 0.8rem;
  background: rgba(72, 49, 212, 0.1);
  color: #4831D4;
  border-radius: 15px;
  font-size: 0.8rem;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 1.5rem;
}

.features-list li:before {
  content: '•';
  color: #4831D4;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.process-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #4831D4;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content h5 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.step-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Sección Galería de Imágenes */
.image-gallery-section {
  padding: 4rem 2rem;
  background: white;
  position: relative;
  z-index: 1;
}

.gallery-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.gallery-track {
  display: flex;
  height: 100%;
  transition: transform 0.3s ease;
  gap: 2rem;
  padding: 0 2rem;
}

.gallery-item {
  flex-shrink: 0;
  width: 350px;
  height: 100%;
  position: relative;
}

.gallery-image-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.gallery-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
  padding: 2rem 1.5rem 1.5rem;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.image-caption h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.image-caption p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
}

.gallery-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  width: 60%;
  height: 4px;
  background: rgba(72, 49, 212, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4831D4;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-indicators {
  display: flex;
  gap: 0.5rem;
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(72, 49, 212, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: #4831D4;
  transform: scale(1.2);
}

.progress-dot:hover {
  background: #4831D4;
}

/* Estilos existentes continúan... */
.content-sections {
  position: relative;
  z-index: 1;
}

.section {
  padding: 4rem 2rem;
}

.overview-section {
  background: #f8f9fa;
}

.technical-section {
  background: white;
}

.overview-content {
  max-width: 800px;
  margin: 0 auto;
}

.overview-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

.subsection {
  margin: 2rem 0;
}

.subsection h3 {
  color: #4831D4;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.technical-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.tech-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid #4831D4;
}

.tech-card h3 {
  color: #4831D4;
  margin-bottom: 1rem;
}

.tech-card ul {
  list-style: none;
  padding: 0;
}

.tech-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 1.5rem;
}

.tech-card li:before {
  content: '▸';
  color: #4831D4;
  position: absolute;
  left: 0;
}

.project-navigation {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
}

.nav-project-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: white;
  border: 2px solid #4831D4;
  border-radius: 10px;
  color: #4831D4;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  flex: 1;
  max-width: 300px;
}

.nav-project-btn:hover:not(:disabled) {
  background: #4831D4;
  color: white;
  transform: translateY(-2px);
}

.nav-project-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }

  .before-after-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .interactive-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .technical-grid {
    grid-template-columns: 1fr;
  }

  .project-navigation {
    flex-direction: column;
  }

  .nav-project-btn {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .project-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .hero-section,
  .section {
    padding: 2rem 1rem;
  }

  .device-frame {
    padding: 0.5rem;
  }

  .device-screen {
    height: 300px;
  }

  .details-sidebar {
    padding: 1.5rem;
  }

  .gallery-item {
    width: 280px;
  }

  .improvements-grid {
    grid-template-columns: 1fr;
  }
}
</style>