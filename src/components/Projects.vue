<template>
  <div class="scene">
    <!-- Close Button -->
    <router-link to="/" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <!-- Header Section with Filters -->
    <div class="header-section">
      <!-- Filter Section -->
      <div class="filter-section">
        <div class="filter-container">
          <span class="filter-label">Tipo de Proyecto</span>
          <div class="filter-buttons">
            <div 
              v-for="filter in activeFilters" 
              :key="filter.id"
              class="filter-switch"
            >
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="filter.active"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                <span class="switch-text">{{ filter.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floor -->
    <div class="floor" id="floor">
      <div class="lines"></div>
      <div class="diagonal-lines"></div>
      <div class="perspective-lines">
        <div v-for="n in 15" :key="n" class="perspective-line"></div>
      </div>
      <div class="horizontal-lines">
        <div v-for="n in 10" :key="n" class="horizontal-line"></div>
      </div>
      <div class="overlay"></div>
    </div>

    <!-- Wall -->
    <div class="wall" id="wall">
      <div class="brick-pattern"></div>
      <div class="brick-overlay"></div>
      
      <!-- Gallery with horizontal scrolling -->
      <div class="gallery-section">
        <!-- Message with Arrow -->
        <div class="gallery-message">
          <div class="message-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" viewBox="0 0 120 60" fill="none">
              <path d="M15 30 Q40 10, 70 30 Q90 50, 105 30" stroke="#4831D4" stroke-width="3" fill="none"/>
              <path d="M100 25 L105 30 L100 35" stroke="#4831D4" stroke-width="3" fill="none"/>
            </svg>
          </div>
          <p class="message-text">desliza para ver contenido</p>
        </div>

        <div class="gallery-container" id="galleryContainer" @wheel="handleWheel">
          <div class="gallery-track" id="galleryTrack" 
               :style="{ transform: `translateX(${currentTranslate}px)` }">
            <div v-for="project in filteredProjects" :key="project.id" class="artwork-unit">
              <div class="lamp" :class="{ 'lamp-hover': hoveredProject === project.id }">
                <div class="lamp-wire"></div>
                <div class="lamp-shade"></div>
                <div class="lamp-light"></div>
              </div>
              <div class="artwork-wrapper">
                <div class="artwork" 
                     @click="navigateToProject(project.id)"
                     @mouseenter="hoveredProject = project.id"
                     @mouseleave="hoveredProject = null">
                  <div class="plaque">
                    <span>{{ project.title }}</span>
                  </div>
                  <div class="artwork-content">
                    <img :src="project.image" :alt="project.title" class="project-image">
                    
                    <!-- Tags overlay on hover -->
                    <div class="tags-overlay">
                      <div class="tags-container">
                        <span 
                          v-for="tag in project.tags" 
                          :key="tag" 
                          class="project-tag"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Progress Indicator -->
              <div class="progress-indicator"></div>
            </div>
          </div>
        </div>
        
        <!-- Progress bar -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Button to Projects2 -->
    <div class="projects2-button-container">
      <button @click="goToProjects2" class="projects2-button">
        <span>Ver Galería Completa</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 17L17 7M17 7H7M17 7V17"/>
        </svg>
      </button>
    </div>

    <!-- Add Floor Buttons -->
    <div class="floor-buttons">
      <div class="button-panel">
        <button
          v-for="section in sections"
          :key="section.floor"
          @click="goToFloor(section)"
          :class="{ active: currentFloor === section.floor }"
          class="floor-button"
        >
          <div class="button-light" :class="{ 'is-active': currentFloor === section.floor }"></div>
          <span class="floor-number">{{ section.floor }}</span>
          <span class="floor-name">{{ section.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentFloor = ref(3) // Projects is on floor 3

interface Section {
  floor: number
  name: string
  route: string
}

const sections: Section[] = [
  { floor: 1, name: 'SobreMi', route: '/about' },
  { floor: 2, name: 'Servicios', route: '/services' },
  { floor: 3, name: 'Proyectos', route: '/projects' },
  { floor: 4, name: 'Contacto', route: '/contact' }
]

const filters = [
  { id: 'website', name: 'Website', active: true },
  { id: 'landing', name: 'Landing', active: true },
  { id: 'interfaz', name: 'Interfaz', active: true },
  { id: 'ecommerce', name: 'E-commerce', active: true }
]

const activeFilters = ref(filters.map(f => ({ ...f })))

const goToFloor = (section: Section) => {
  router.push(section.route)
}

const goToProjects2 = () => {
  router.push('/projects2')
}

const currentTranslate = ref(0)
const progressWidth = ref(0)
const maxScroll = ref(0)
const hoveredProject = ref<number | null>(null)

const projects = [
  { 
    id: 1, 
    title: "Quizz interactivo", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg", 
    category: "interfaz",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"]
  },
  { 
    id: 2, 
    title: "Website Hotel", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg", 
    category: "website",
    tags: ["Hospitality", "Booking", "Responsive", "CMS"]
  },
  { 
    id: 3, 
    title: "Website Centro Comercial", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/p4.jpg", 
    category: "ecommerce",
    tags: ["Shopping", "Directory", "Catalog", "Payment"]
  },
  { 
    id: 4, 
    title: "Landing page seguros", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/axa.jpg", 
    category: "landing",
    tags: ["Insurance", "Corporate", "Lead Gen", "Forms"]
  },
  { 
    id: 5, 
    title: "Catálogo Online", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/P3.jpg", 
    category: "ecommerce",
    tags: ["Catalog", "Products", "Search", "Filter"]
  },
  { 
    id: 6, 
    title: "Dashboard Corporativo", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/Dashboard.jpg", 
    category: "interfaz",
    tags: ["Dashboard", "Analytics", "Data Viz", "Admin"]
  },
  { 
    id: 7, 
    title: "Landing page Emprendimiento", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/p09.jpg", 
    category: "landing",
    tags: ["Startup", "Business", "CTA", "Modern"]
  },
  { 
    id: 8, 
    title: "Website AXA Portal", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/AXA-portal.jpg", 
    category: "website",
    tags: ["Portal", "Corporate", "Multi-page", "Professional"]
  },
  { 
    id: 9, 
    title: "Website Clínica Odontológica", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/clinica-suecia.jpg", 
    category: "website",
    tags: ["Healthcare", "Medical", "Appointments", "Services"]
  },
  { 
    id: 10, 
    title: "Website Venta Café", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/cafe-cumbre.jpg", 
    category: "ecommerce",
    tags: ["Coffee", "Retail", "Online Store", "Products"]
  },
  { 
    id: 11, 
    title: "Landing page Dental", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", 
    category: "landing",
    tags: ["Healthcare", "Dental", "Conversion", "Contact"]
  },
  { 
    id: 12, 
    title: "Mapa Interactivo Amazon", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/mapa-amazon.jpg", 
    category: "interfaz",
    tags: ["Interactive", "Maps", "Environmental", "Data"]
  },
  { 
    id: 13, 
    title: "Rediseño APP AXA", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/App-axa.jpg", 
    category: "interfaz",
    tags: ["Mobile App", "Redesign", "UX/UI", "Insurance"]
  },
  { 
    id: 14, 
    title: "Website Cirugía Plástica", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/betterme.jpg", 
    category: "website",
    tags: ["Medical", "Aesthetic", "Gallery", "Consultation"]
  },
  { 
    id: 15, 
    title: "Tienda Online Moda", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", 
    category: "ecommerce",
    tags: ["Fashion", "E-commerce", "Cart", "Checkout"]
  }
]

const filteredProjects = computed(() => {
  const activeCategories = activeFilters.value
    .filter(filter => filter.active)
    .map(filter => filter.id)
  
  if (activeCategories.length === 0) {
    return []
  }
  
  return projects.filter(project => activeCategories.includes(project.category))
})

const toggleFilter = (filterId: string) => {
  const filter = activeFilters.value.find(f => f.id === filterId)
  if (filter) {
    filter.active = !filter.active
  }
  currentTranslate.value = 0 // Reset scroll position when filtering
  updateProgressBar()
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  const scrollAmount = e.deltaY * 2
  setTransform(currentTranslate.value - scrollAmount)
}

const setTransform = (translate: number) => {
  currentTranslate.value = Math.max(Math.min(translate, 0), -maxScroll.value)
  updateProgressBar()
}

const updateProgressBar = () => {
  if (maxScroll.value > 0) {
    progressWidth.value = Math.abs(currentTranslate.value) / maxScroll.value * 100
  }
}

const navigateToProject = (id: number) => {
  router.push({ name: 'project-detail', params: { id: id.toString() } })
}

onMounted(() => {
  const container = document.getElementById('galleryContainer')
  const track = document.getElementById('galleryTrack')
  
  if (container && track) {
    maxScroll.value = track.offsetWidth - container.offsetWidth
    updateProgressBar()
  }
  
  window.addEventListener('resize', () => {
    if (container && track) {
      maxScroll.value = track.offsetWidth - container.offsetWidth
      if (currentTranslate.value < -maxScroll.value) {
        setTransform(-maxScroll.value)
      }
    }
  })
  
  // Watch for filter changes
  watch(activeFilters, () => {
    // Recalculate maxScroll when filters change
    setTimeout(() => {
      if (container && track) {
        maxScroll.value = track.offsetWidth - container.offsetWidth
        currentTranslate.value = 0
        updateProgressBar()
      }
    }, 100)
  }, { deep: true })
})
</script>

<style scoped>
.scene {
  width: 100%;
  height: 100vh;
  position: relative;
  perspective: 800px;
  overflow: hidden;
  background: #F4F9FC;
}

/* Header Section */
.header-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 1rem 2rem;
  text-align: center;
}

/* Filter Section */
.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.filter-container {
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.filter-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4831D4;
  white-space: nowrap;
}

.filter-buttons {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-switch {
  display: flex;
  align-items: center;
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.8rem;
  font-weight: 500;
  color: #666;
}

.switch-input {
  display: none;
}

.switch-slider {
  position: relative;
  width: 40px;
  height: 20px;
  background: #e9ecef;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.switch-slider::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.switch-input:checked + .switch-slider {
  background: #4831D4;
}

.switch-input:checked + .switch-slider::before {
  transform: translateX(20px);
}

.switch-label:hover .switch-slider {
  background: #d1d5db;
}

.switch-input:checked + .switch-slider:hover {
  background: #3a2aa0;
}

.switch-label:hover .switch-text {
  color: #4831D4;
}

.switch-input:checked ~ .switch-text {
  color: #4831D4;
  font-weight: 600;
}

/* Close Button Styles */
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

.close-button svg {
  width: 1.5rem;
  height: 1.5rem;
}

.floor {
  position: absolute;
  width: 150%;
  height: 100%;
  left: -25%;
  bottom: -30%;
  transform: rotateX(60deg);
  background: linear-gradient(90deg, 
    rgba(142, 170, 180, 0.8) 0%, 
    rgba(172, 196, 204, 0.8) 25%, 
    rgba(142, 170, 180, 0.8) 50%, 
    rgba(172, 196, 204, 0.8) 75%, 
    rgba(142, 170, 180, 0.8) 100%);
  z-index: 1;
}

.lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(100, 130, 140, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100, 130, 140, 0.3) 1px, transparent 1px);
  background-size: 10% 10%;
}

.diagonal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(135deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(225deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(315deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(45deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%);
  background-size: 20% 20%;
  opacity: 0.5;
}

.perspective-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.perspective-line {
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 100%);
  transform-origin: bottom;
}

.perspective-line:nth-child(odd) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.2);
}

.perspective-line:nth-child(even) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.1);
}

.horizontal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.horizontal-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 50%,
    rgba(100, 130, 140, 0.1) 100%);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(142, 170, 180, 0) 0%, 
    rgba(142, 170, 180, 0.3) 100%);
}

.wall {
  position: absolute;
  width: 100%;
  height: 80%;
  top: 0;
  background-color: #e8e5de;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2;
}

.brick-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 20px;
  opacity: 0.8;
}

.brick-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 30px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 10px);
  background-size: 80px 40px;
  opacity: 0.7;
}

.gallery-section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 2rem;
}

/* Message with Arrow */
.gallery-message {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-left: 2rem;
  align-self: flex-start;
}

.message-arrow {
  flex-shrink: 0;
}

.message-text {
  font-size: 1rem;
  color: #666;
  font-style: italic;
  margin: 0;
}

.gallery-container {
  position: relative;
  width: 95%;
  height: 70%;
  overflow: hidden;
  margin-bottom: 20px;
}

.gallery-track {
  display: flex;
  position: absolute;
  left: 0;
  height: 100%;
  padding: 0 2rem;
  gap: 3rem;
  transition: transform 0.3s ease;
}

.artwork-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
}

.lamp {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.lamp-wire {
  width: 2px;
  height: 60px;
  background-color: #333;
}

.lamp-shade {
  width: 35px;
  height: 22px;
  background-color: #2c3e50;
  border-radius: 50% 50% 0 0;
  position: relative;
}

.lamp-shade::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35px;
  height: 4px;
  background-color: #1a2530;
  border-radius: 0 0 4px 4px;
}

.lamp-light {
  position: absolute;
  bottom: -60px;
  width: 160px;
  height: 120px;
  background: radial-gradient(ellipse at center, rgba(255, 255, 200, 0.6) 0%, rgba(255, 255, 200, 0) 70%);
  border-radius: 50%;
  transform: translateX(-50%);
  left: 50%;
  pointer-events: none;
  opacity: 0.8;
  filter: blur(5px);
}

.lamp-hover .lamp-light {
  opacity: 1;
  background: radial-gradient(ellipse at center, 
    rgba(255, 255, 200, 0.9) 0%, 
    rgba(255, 255, 200, 0.6) 30%,
    rgba(255, 255, 200, 0) 70%);
  filter: blur(3px);
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from {
    filter: blur(3px);
    opacity: 0.8;
  }
  to {
    filter: blur(5px);
    opacity: 1;
  }
}

.artwork-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.artwork {
  width: 220px;
  height: 250px;
  background-color: white;
  border: 6px solid #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.artwork:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.plaque {
  width: 100%;
  height: 35px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.8rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.plaque span {
  color: #373737;
  font-weight: 600;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artwork-content {
  flex: 1;
  position: relative;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.artwork:hover .project-image {
  transform: scale(1.05);
}

/* Tags overlay */
.tags-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.artwork:hover .tags-overlay {
  opacity: 1;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
}

.project-tag {
  padding: 0.3rem 0.6rem;
  background: rgba(72, 49, 212, 0.9);
  color: white;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.project-tag:hover {
  background: rgba(204, 243, 129, 0.9);
  color: #4831D4;
  transform: translateY(-2px);
}

/* Progress Indicator */
.progress-indicator {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: #4831D4;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.artwork:hover + .progress-indicator,
.artwork-unit:hover .progress-indicator {
  opacity: 1;
}

.progress-container {
  position: relative;
  width: 70%;
  height: 4px;
  background-color: rgba(44, 62, 80, 0.2);
  border-radius: 2px;
  margin-top: 20px;
}

.progress-bar {
  position: absolute;
  height: 100%;
  background-color: #4831D4;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.floor-buttons {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(to right, #2A2356, #1F1A40);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 2px 10px rgba(255, 255, 255, 0.05);
  z-index: 50;
}

.button-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.floor-button {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.2),
    inset 0 2px 5px rgba(255, 255, 255, 0.1);
}

.button-light {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.button-light.is-active {
  background: #CCF381;
  box-shadow: 0 0 10px #CCF381;
}

.floor-button:hover {
  transform: scale(1.1);
}

.floor-button.active {
  background: white;
  color: #4831D4;
  box-shadow: 
    0 0 0 3px #4831D4,
    0 4px 15px rgba(0, 0, 0, 0.2);
}

.floor-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.floor-name {
  font-size: 0.7rem;
  opacity: 0.8;
}

/* Projects2 Button */
.projects2-button-container {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.projects2-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #4831D4;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(72, 49, 212, 0.3);
}

.projects2-button:hover {
  background: #3a2aa0;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.4);
}

.projects2-button svg {
  transition: transform 0.3s ease;
}

.projects2-button:hover svg {
  transform: rotate(45deg);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .filter-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .filter-buttons {
    justify-content: center;
  }

  .artwork {
    width: 200px;
    height: 230px;
  }

  .artwork-unit {
    margin: 0 1.5rem;
  }

  .gallery-track {
    gap: 2rem;
  }

  .floor-buttons {
    right: 1rem;
  }

  .gallery-section {
    padding: 6rem 0 2rem;
  }

  .gallery-message {
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .artwork {
    width: 180px;
    height: 210px;
  }

  .filter-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .main-title {
    font-size: 1.8rem;
  }
}
</style>