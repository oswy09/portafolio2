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
      <!-- Header Section -->
      <div class="header-section">
        <h1 class="project-title">{{ project.title }}</h1>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="project-tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Website Showcase Section -->
      <div class="website-showcase">
        <h2 class="section-title">Vista del Sitio Web</h2>
        <div class="showcase-grid">
          <div class="showcase-item" v-for="(image, index) in project.websiteImages" :key="index">
            <div class="image-frame">
              <div class="browser-mockup">
                <div class="browser-header">
                  <div class="browser-dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                  </div>
                  <div class="browser-url">{{ project.url || 'www.ejemplo.com' }}</div>
                </div>
                <div class="browser-content">
                  <img :src="image" :alt="`${project.title} - Vista ${index + 1}`" class="website-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Preview Section -->
      <div class="interactive-preview">
        <h2 class="section-title">Vista Interactiva</h2>
        <div class="preview-container">
          <div class="device-mockup">
            <div class="device-frame">
              <div class="device-screen" ref="deviceScreen">
                <div class="preview-content" :style="{ transform: `translateY(${scrollPosition}px)` }">
                  <img :src="project.fullPageImage" :alt="`${project.title} - Página completa`" class="full-page-image" />
                </div>
              </div>
              <div class="scroll-controls">
                <button @click="scrollUp" class="scroll-btn" :disabled="scrollPosition >= 0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 15l-6-6-6 6"/>
                  </svg>
                </button>
                <div class="scroll-indicator">
                  <div class="scroll-thumb" :style="{ top: scrollThumbPosition + '%' }"></div>
                </div>
                <button @click="scrollDown" class="scroll-btn" :disabled="scrollPosition <= maxScroll">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Before/After Section (conditional) -->
      <div v-if="project.beforeAfter" class="before-after-section">
        <h2 class="section-title">Antes y Después</h2>
        <div class="comparison-container">
          <div class="comparison-slider" ref="comparisonSlider">
            <div class="before-image-container">
              <img :src="project.beforeAfter.before" :alt="`${project.title} - Antes`" class="comparison-image" />
              <div class="image-label before-label">ANTES</div>
            </div>
            <div class="after-image-container" :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }">
              <img :src="project.beforeAfter.after" :alt="`${project.title} - Después`" class="comparison-image" />
              <div class="image-label after-label">DESPUÉS</div>
            </div>
            <div 
              class="slider-handle" 
              :style="{ left: sliderPosition + '%' }"
              @mousedown="startDrag"
              @touchstart="startDrag"
            >
              <div class="handle-line"></div>
              <div class="handle-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8L22 12L18 16"/>
                  <path d="M6 8L2 12L6 16"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Details -->
      <div class="project-details">
        <h2 class="section-title">Detalles del Proyecto</h2>
        <div class="details-grid">
          <div class="detail-item">
            <h3>Tecnologías</h3>
            <div class="tech-list">
              <span v-for="tech in project.technologies" :key="tech" class="tech-item">
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="detail-item">
            <h3>Duración</h3>
            <p>{{ project.duration || '2-4 semanas' }}</p>
          </div>
          <div class="detail-item">
            <h3>Cliente</h3>
            <p>{{ project.client || 'Proyecto Personal' }}</p>
          </div>
          <div class="detail-item">
            <h3>Año</h3>
            <p>{{ project.year || '2024' }}</p>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="back-section">
        <button @click="goBack" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Volver a Proyectos</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Scroll functionality for interactive preview
const scrollPosition = ref(0)
const maxScroll = ref(-800)
const deviceScreen = ref(null)

// Before/After slider functionality
const sliderPosition = ref(50)
const isDragging = ref(false)
const comparisonSlider = ref(null)

// Mock project data - in a real app, this would come from an API or store
const projects = {
  1: {
    title: "Quizz Interactivo",
    description: "Una aplicación web interactiva de preguntas y respuestas con gamificación, diseñada para mejorar el engagement del usuario a través de elementos visuales atractivos y mecánicas de juego.",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    technologies: ["Vue.js", "GSAP", "CSS3", "JavaScript"],
    websiteImages: [
      "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
      "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg"
    ],
    fullPageImage: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
    url: "quiz.ejemplo.com",
    duration: "3 semanas",
    client: "Empresa Educativa",
    year: "2024"
  },
  2: {
    title: "Website Hotel",
    description: "Sitio web completo para hotel boutique con sistema de reservas integrado, galería de imágenes y información detallada de servicios.",
    tags: ["Hospitality", "Booking", "Responsive", "CMS"],
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    websiteImages: [
      "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg",
      "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg"
    ],
    fullPageImage: "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      after: "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg"
    },
    url: "hotel-boutique.com",
    duration: "4 semanas",
    client: "Hotel Boutique",
    year: "2024"
  }
}

const project = computed(() => {
  const id = parseInt(route.params.id as string)
  return projects[id] || projects[1]
})

const scrollThumbPosition = computed(() => {
  const range = Math.abs(maxScroll.value)
  const position = Math.abs(scrollPosition.value)
  return (position / range) * 80 // 80% is the available space for the thumb
})

const scrollUp = () => {
  scrollPosition.value = Math.min(scrollPosition.value + 100, 0)
}

const scrollDown = () => {
  scrollPosition.value = Math.max(scrollPosition.value - 100, maxScroll.value)
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', handleDrag)
  document.addEventListener('touchend', stopDrag)
}

const handleDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !comparisonSlider.value) return
  
  const rect = comparisonSlider.value.getBoundingClientRect()
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  const x = clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  
  sliderPosition.value = percentage
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('touchend', stopDrag)
}

const goBack = () => {
  router.push('/projects')
}

onMounted(() => {
  // Calculate max scroll based on image height
  if (deviceScreen.value) {
    const screenHeight = deviceScreen.value.offsetHeight
    const imageHeight = screenHeight * 2 // Assuming image is 2x the screen height
    maxScroll.value = -(imageHeight - screenHeight)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('touchend', stopDrag)
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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 2rem;
}

.project-title {
  font-size: 3rem;
  font-weight: bold;
  color: #4831D4;
  margin-bottom: 1rem;
}

.project-description {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 2rem;
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

/* Section Titles */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #4831D4;
  text-align: center;
  margin-bottom: 2rem;
}

/* Website Showcase Section */
.website-showcase {
  margin-bottom: 4rem;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.showcase-item {
  position: relative;
}

.image-frame {
  background: white;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-frame:hover {
  transform: translateY(-5px);
}

.browser-mockup {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.browser-header {
  background: #f0f0f0;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
}

.browser-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.browser-url {
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #666;
  border: 1px solid #ddd;
  flex: 1;
}

.browser-content {
  background: white;
  overflow: hidden;
}

.website-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 600px;
  object-fit: cover;
}

/* Interactive Preview Section */
.interactive-preview {
  margin-bottom: 4rem;
}

.preview-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.device-mockup {
  background: #333;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.device-frame {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.device-screen {
  width: 300px;
  height: 500px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 2px solid #666;
}

.preview-content {
  transition: transform 0.3s ease;
  width: 100%;
}

.full-page-image {
  width: 100%;
  height: auto;
  display: block;
}

.scroll-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
}

.scroll-btn {
  background: #4831D4;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-btn:hover:not(:disabled) {
  background: #3a2aa0;
  transform: scale(1.1);
}

.scroll-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.scroll-indicator {
  width: 4px;
  height: 200px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  position: relative;
}

.scroll-thumb {
  position: absolute;
  width: 100%;
  height: 20%;
  background: #CCF381;
  border-radius: 2px;
  transition: top 0.3s ease;
}

/* Before/After Section */
.before-after-section {
  margin-bottom: 4rem;
}

.comparison-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.comparison-slider {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  cursor: ew-resize;
}

.before-image-container,
.after-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.comparison-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-label {
  position: absolute;
  top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 5px;
}

.before-label {
  left: 1rem;
}

.after-label {
  right: 1rem;
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
  cursor: ew-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
}

.handle-line {
  position: absolute;
  width: 4px;
  height: 100%;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.handle-circle {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  color: #4831D4;
}

/* Project Details */
.project-details {
  margin-bottom: 4rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.detail-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.detail-item h3 {
  color: #4831D4;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech-item {
  padding: 0.25rem 0.75rem;
  background: rgba(204, 243, 129, 0.2);
  color: #4831D4;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Back Section */
.back-section {
  text-align: center;
  margin-bottom: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  color: #4831D4;
  border: 2px solid #4831D4;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #4831D4;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-title {
    font-size: 2rem;
  }

  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .device-frame {
    flex-direction: column;
    align-items: center;
  }

  .device-screen {
    width: 250px;
    height: 400px;
  }

  .scroll-controls {
    flex-direction: row;
    justify-content: center;
  }

  .scroll-indicator {
    width: 200px;
    height: 4px;
  }

  .comparison-slider {
    height: 300px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 1rem;
  }

  .project-title {
    font-size: 1.8rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .device-screen {
    width: 200px;
    height: 320px;
  }
}
</style>