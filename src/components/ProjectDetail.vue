<template>
  <div class="project-detail-container">
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
          <span class="project-category">{{ project.category }}</span>
          <span class="project-year">{{ project.year }}</span>
        </div>
        <h1 class="project-title">{{ project.title }}</h1>
        <p class="project-description">{{ project.description }}</p>
        
        <!-- Project Tags -->
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="project-tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Hero Image or GIF -->
      <div class="hero-section">
        <div v-if="project.gif" class="hero-gif-container">
          <img :src="project.gif" :alt="project.title" class="hero-gif" />
          <div class="gif-overlay">
            <div class="gif-indicator">
              <i class="fas fa-play"></i>
              <span>Demo Interactivo</span>
            </div>
          </div>
        </div>
        <div v-else class="hero-image-container">
          <img :src="project.heroImage" :alt="project.title" class="hero-image" />
        </div>
      </div>

      <!-- Project Details -->
      <div class="project-details">
        <div class="details-grid">
          <div class="detail-item">
            <h3>Cliente</h3>
            <p>{{ project.client }}</p>
          </div>
          <div class="detail-item">
            <h3>Duración</h3>
            <p>{{ project.duration }}</p>
          </div>
          <div class="detail-item">
            <h3>Servicios</h3>
            <p>{{ project.services.join(', ') }}</p>
          </div>
          <div class="detail-item">
            <h3>Tecnologías</h3>
            <p>{{ project.technologies.join(', ') }}</p>
          </div>
        </div>
      </div>

      <!-- Website Gallery Section (Nueva sección) -->
      <div v-if="!project.gif && project.websiteImages" class="website-gallery">
        <h2 class="gallery-title">Capturas del Sitio Web</h2>
        <p class="gallery-subtitle">Explora las diferentes secciones y funcionalidades del proyecto</p>
        
        <div class="gallery-grid">
          <div 
            v-for="(image, index) in project.websiteImages" 
            :key="index"
            class="gallery-item"
            :class="{ 'featured': image.featured }"
            @click="openImageModal(image)"
          >
            <div class="image-container">
              <img :src="image.url" :alt="image.title" class="gallery-image" />
              <div class="image-overlay">
                <div class="overlay-content">
                  <h4>{{ image.title }}</h4>
                  <p>{{ image.description }}</p>
                  <div class="zoom-icon">
                    <i class="fas fa-search-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="image-info">
              <h4 class="image-title">{{ image.title }}</h4>
              <p class="image-description">{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Website Gallery Section (Nueva sección) -->
      <div v-if="!project.gif && project.websiteImages" class="website-gallery">
        <h2 class="gallery-title">Capturas del Sitio Web</h2>
        <p class="gallery-subtitle">Explora las diferentes secciones y funcionalidades del proyecto</p>
        
        <div class="gallery-grid">
          <div 
            v-for="(image, index) in project.websiteImages" 
            :key="index"
            class="gallery-item"
            :class="{ 'featured': image.featured }"
            @click="openImageModal(image)"
          >
            <div class="image-container">
              <img :src="image.url" :alt="image.title" class="gallery-image" />
              <div class="image-overlay">
                <div class="overlay-content">
                  <h4>{{ image.title }}</h4>
                  <p>{{ image.description }}</p>
                  <div class="zoom-icon">
                    <i class="fas fa-search-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="image-info">
              <h4 class="image-title">{{ image.title }}</h4>
              <p class="image-description">{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Process -->
      <div class="project-process">
        <h2>Proceso de Desarrollo</h2>
        <div class="process-steps">
          <div 
            v-for="(step, index) in project.process" 
            :key="index"
            class="process-step"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="project-results">
        <h2>Resultados</h2>
        <div class="results-grid">
          <div 
            v-for="result in project.results" 
            :key="result.metric"
            class="result-item"
          >
            <div class="result-number">{{ result.value }}</div>
            <div class="result-label">{{ result.metric }}</div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="project-navigation">
        <button @click="goToPreviousProject" class="nav-button prev">
          <i class="fas fa-arrow-left"></i>
          <span>Proyecto Anterior</span>
        </button>
        <button @click="goToNextProject" class="nav-button next">
          <span>Siguiente Proyecto</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="selectedImage" class="image-modal" @click="closeImageModal">
      <div class="modal-content" @click.stop>
        <button @click="closeImageModal" class="modal-close">
          <i class="fas fa-times"></i>
        </button>
        <img :src="selectedImage.url" :alt="selectedImage.title" class="modal-image" />
        <div class="modal-info">
          <h3>{{ selectedImage.title }}</h3>
          <p>{{ selectedImage.description }}</p>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="selectedImage" class="image-modal" @click="closeImageModal">
      <div class="modal-content" @click.stop>
        <button @click="closeImageModal" class="modal-close">
          <i class="fas fa-times"></i>
        </button>
        <img :src="selectedImage.url" :alt="selectedImage.title" class="modal-image" />
        <div class="modal-info">
          <h3>{{ selectedImage.title }}</h3>
          <p>{{ selectedImage.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const selectedImage = ref(null)
const selectedImage = ref(null)

// Datos de ejemplo de proyectos
const projects = [
  {
    id: 1,
    title: "Quizz Interactivo",
    category: "Aplicación Web",
    year: "2024",
    description: "Una aplicación interactiva de quiz desarrollada con Vue.js que permite a los usuarios probar sus conocimientos de manera divertida y educativa.",
    client: "EduTech Solutions",
    duration: "3 meses",
    services: ["UX/UI Design", "Desarrollo Frontend", "Testing"],
    technologies: ["Vue.js", "TypeScript", "SCSS", "Firebase"],
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    gif: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg", // Si tiene GIF
    heroImage: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
    process: [
      {
        title: "Investigación",
        description: "Análisis de usuarios y definición de requisitos funcionales"
      },
      {
        title: "Diseño",
        description: "Creación de wireframes y prototipos interactivos"
      },
      {
        title: "Desarrollo",
        description: "Implementación con Vue.js y integración de APIs"
      },
      {
        title: "Testing",
        description: "Pruebas de usabilidad y optimización de rendimiento"
      }
    ],
    results: [
      { metric: "Usuarios Activos", value: "2.5K+" },
      { metric: "Tiempo de Sesión", value: "8 min" },
      { metric: "Tasa de Finalización", value: "85%" }
    ]
  },
  {
    id: 2,
    title: "Website Hotel",
    category: "Sitio Web Corporativo",
    year: "2024",
    description: "Sitio web elegante para hotel boutique con sistema de reservas integrado y experiencia de usuario optimizada para conversión.",
    client: "Hotel Boutique Premium",
    duration: "4 meses",
    services: ["Diseño Web", "Desarrollo", "SEO", "CMS"],
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL"],
    tags: ["Hospitality", "Booking", "Responsive", "CMS"],
    heroImage: "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg",
    websiteImages: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
        title: "Página Principal",
        description: "Hero section con booking widget integrado",
        featured: true
      },
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080",
        title: "Habitaciones",
        description: "Galería de habitaciones con filtros avanzados",
        featured: false
      },
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070",
        title: "Servicios",
        description: "Sección de amenidades y servicios del hotel",
        featured: false
      },
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
        title: "Reservas",
        description: "Sistema de reservas con calendario interactivo",
        featured: true
      },
      {
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
        title: "Contacto",
        description: "Página de contacto con mapa interactivo",
        featured: false
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074",
        title: "Galería",
        description: "Galería de imágenes del hotel y alrededores",
        featured: false
      }
    ],
    websiteImages: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
        title: "Página Principal",
        description: "Hero section con booking widget integrado",
        featured: true
      },
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080",
        title: "Habitaciones",
        description: "Galería de habitaciones con filtros avanzados",
        featured: false
      },
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070",
        title: "Servicios",
        description: "Sección de amenidades y servicios del hotel",
        featured: false
      },
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
        title: "Reservas",
        description: "Sistema de reservas con calendario interactivo",
        featured: true
      },
      {
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
        title: "Contacto",
        description: "Página de contacto con mapa interactivo",
        featured: false
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074",
        title: "Galería",
        description: "Galería de imágenes del hotel y alrededores",
        featured: false
      }
    ],
    process: [
      {
        title: "Análisis",
        description: "Estudio del mercado hotelero y análisis de competencia"
      },
      {
        title: "Estrategia",
        description: "Definición de arquitectura de información y user journey"
      },
      {
        title: "Diseño",
        description: "Creación de diseño visual y sistema de reservas"
      },
      {
        title: "Desarrollo",
        description: "Implementación en WordPress con funcionalidades custom"
      }
    ],
    results: [
      { metric: "Reservas Online", value: "+150%" },
      { metric: "Tiempo de Carga", value: "2.1s" },
      { metric: "Conversión", value: "12.5%" }
    ]
  }
]

const project = computed(() => {
  const id = parseInt(route.params.id as string)
  return projects.find(p => p.id === id) || projects[0]
})

const openImageModal = (image: any) => {
  selectedImage.value = image
}

const closeImageModal = () => {
  selectedImage.value = null
}

const openImageModal = (image: any) => {
  selectedImage.value = image
}

const closeImageModal = () => {
  selectedImage.value = null
}

const goToPreviousProject = () => {
  const currentId = project.value.id
  const prevId = currentId > 1 ? currentId - 1 : projects.length
  router.push(`/project/${prevId}`)
}

const goToNextProject = () => {
  const currentId = project.value.id
  const nextId = currentId < projects.length ? currentId + 1 : 1
  router.push(`/project/${nextId}`)
}

onMounted(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.project-detail-container {
  min-height: 100vh;
  background: #F4F9FC;
  position: relative;
  overflow-x: hidden;
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
  transform: rotate(45deg);
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
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-title {
  font-size: 3.5rem;
  font-weight: 800;
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
  padding: 0.5rem 1rem;
  background: rgba(72, 49, 212, 0.1);
  color: #4831D4;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Hero Section */
.hero-section {
  margin-bottom: 4rem;
}

.hero-gif-container,
.hero-image-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.hero-gif,
.hero-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.gif-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.gif-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

/* Project Details */
.project-details {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.detail-item h3 {
  color: #4831D4;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-item p {
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

/* Website Gallery */
.website-gallery {
  margin-bottom: 4rem;
}

.gallery-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4831D4;
  text-align: center;
  margin-bottom: 1rem;
}

.gallery-subtitle {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.gallery-item {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(72, 49, 212, 0.15);
}

.gallery-item.featured {
  grid-column: span 2;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item.featured .gallery-image {
  height: 350px;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  width: 100%;
}

.overlay-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.overlay-content p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.zoom-icon {
  position: absolute;
  top: -2rem;
  right: 0;
  width: 40px;
  height: 40px;
  background: #4831D4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.image-info {
  padding: 1.5rem;
}

.image-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.image-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

/* Project Process */
.project-process {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-process h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #4831D4;
  text-align: center;
  margin-bottom: 3rem;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.process-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #4831D4;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h3 {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Results Section */
.project-results {
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  color: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
}

.project-results h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.result-item {
  text-align: center;
}

.result-number {
  font-size: 3rem;
  font-weight: 800;
  color: #CCF381;
  margin-bottom: 0.5rem;
}

.result-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* Navigation */
.project-navigation {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 4rem;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: white;
  border: 2px solid #4831D4;
  border-radius: 10px;
  color: #4831D4;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  max-width: 250px;
}

.nav-button:hover {
  background: #4831D4;
  color: white;
  transform: translateY(-2px);
}

.nav-button.prev {
  justify-content: flex-start;
}

.nav-button.next {
  justify-content: flex-end;
}

/* Image Modal */
.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}

.modal-info {
  padding: 2rem;
}

.modal-info h3 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-info p {
  color: #666;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .gallery-item.featured {
    grid-column: span 1;
  }
  
  .project-navigation {
    flex-direction: column;
  }
  
  .nav-button {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 2rem 1rem;
  }
  
  .project-title {
    font-size: 2.5rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .project-tags {
    justify-content: center;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .process-steps {
    grid-template-columns: 1fr;
  }
  
  .results-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 2rem;
  }
  
  .hero-gif,
  .hero-image {
    height: 300px;
  }
  
  .project-details,
  .project-process {
    padding: 2rem;
  }
  
  .result-number {
    font-size: 2rem;
  }
}
</style>