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
                <span class="switch-text" :data-type="filter.name">{{ filter.name }}</span>
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
                    <div class="image-client-container" style="position:relative; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                      <img :src="project.image" :alt="project.title" class="project-image" style="display:block; width:100%; height:200px; object-fit:cover;">
                      <div class="client-name" style="position:absolute; left:0; right:0; bottom:0; background:rgba(255,255,255,0.92); text-align:center; font-weight:600; color:#4831D4; padding:7px 0 5px 0; font-size:1rem;">
                        {{ project.client || 'Cliente' }}
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
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757370425/Quizz_website_proyectos_Oswal.png", 
    category: "interfaz",
    client: "Acueducto Bogotá",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"]
  },
  { 
    id: 2, 
    title: "Website Hotel", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359521/Hotel_Amazon_proyecto_oswal.png", 
    category: "website",
    client: "Hotel Amazon",
    tags: ["Hospitality", "Booking", "Responsive", "CMS"]
  },
  { 
    id: 3, 
    title: "Website Centro Comercial", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png ", 
    category: "ecommerce",
    client: "Micentro Comercial",
    tags: ["Shopping", "Directory", "Catalog", "Payment"]
  },
  { 
    id: 4, 
    title: "Landing page", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359522/Landing_Pages_seguros.png", 
    category: "landing",
    client: "AXA Colpatria",
    tags: ["Insurance", "Corporate", "Lead Gen", "Forms"]
  },
  { 
    id: 5, 
    title: "Catálogo Online", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371705/Bestyle_website_proyectos_Oswal.png", 
    category: "ecommerce",
    client: "Bestyle",
    tags: ["Catalog", "Products", "Search", "Filter"]
  },
  { 
    id: 6, 
    title: "Web Clinica", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757375618/Clinica_Betterme_proyecto_web_oswal.png", 
    category: "interfaz",
    client: "Betterme",
    tags: ["Dashboard", "Analytics", "Data Viz", "Admin"]
  },
  { 
    id: 7, 
    title: "Landing page", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757372516/Dedicandote_proyecto_oswal_music.png", 
    category: "landing",
    client: "Dedicandote",
    tags: ["Startup", "Business", "CTA", "Modern"]
  },
  { 
    id: 8, 
    title: "Re diseño web", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757361622/Redise%C3%B1o_web_Proyecto_oswal.png", 
    category: "website",
    client: "AXA Colpatria",
    tags: ["Portal", "Corporate", "Multi-page", "Professional"]
  },
  { 
    id: 9, 
    title: "Website Odontológica", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757362220/Clinica_odontologica_proyecto_web_oswal.png", 
    category: "website",
    client: "kliniken Schröder",
    tags: ["Healthcare", "Medical", "Appointments", "Services"]
  },
  { 
    id: 10, 
    title: "Website Café", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373361/Website_cafe_proyecto_oswal_col.png", 
    category: "ecommerce",
    client: "Café cumbre",
    tags: ["Coffee", "Retail", "Online Store", "Products"]
  },
  { 
    id: 11, 
    title: "Landing page ", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373349/Landing_Pages_inter_oswal.png", 
    category: "landing",
    client: "AXA Colpatria",
    tags: ["Healthcare", "Dental", "Conversion", "Contact"]
  },
  { 
    id: 12, 
    title: "Mapa Interactivo Amazon", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/mapa-amazon.jpg", 
    category: "interfaz",
    client: "Cliente L",
    tags: ["Interactive", "Maps", "Environmental", "Data"]
  },
  { 
    id: 13, 
    title: "Rediseño APP AXA", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/App-axa.jpg", 
    category: "interfaz",
    client: "Cliente M",
    tags: ["Mobile App", "Redesign", "UX/UI", "Insurance"]
  },
  { 
    id: 14, 
    title: "Website Cirugía Plástica", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/betterme.jpg", 
    category: "website",
    client: "Betterme",
    tags: ["Medical", "Aesthetic", "Gallery", "Consultation"]
  },
  { 
    id: 15, 
    title: "Tienda Online Moda", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", 
    category: "ecommerce",
    client: "Cliente O",
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
  background: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  box-shadow: 0 4px 18px rgba(72,49,212,0.08);
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border: none;
}

.filter-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #4831D4;
  letter-spacing: 0.02em;
  margin-right: 0.8rem;
}

.filter-buttons {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-switch {
  display: flex;
  align-items: center;
  background: #f4f4fa;
  border-radius: 1.5rem;
  padding: 0.2rem 0.9rem 0.2rem 0.5rem;
  box-shadow: 0 2px 8px rgba(72,49,212,0.04);
  transition: background 0.2s;
}
.filter-switch:has(.switch-input:checked) {
  background: #edeaff;
  box-shadow: 0 2px 12px rgba(72,49,212,0.10);
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4831D4;
}

.switch-input {
  display: none;
}

.switch-slider {
  position: relative;
  width: 32px;
  height: 18px;
  background: #d1d5db;
  border-radius: 18px;
  transition: background 0.3s;
  margin-right: 0.3rem;
}
.switch-slider::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 1px 3px rgba(72,49,212,0.10);
}
.switch-input:checked + .switch-slider {
  background: #4831D4;
}
.switch-input:checked + .switch-slider::before {
  transform: translateX(14px);
}
.switch-label:hover .switch-slider {
  background: #bdb7f6;
}
.switch-input:checked + .switch-slider:hover {
  background: #6a5ae0;
}
.switch-text {
  color: #4831D4;
  font-weight: 600;
  font-size: 0.97rem;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Optional: Add icons for each filter type */
.switch-text[data-type="Website"]::before {
  content: '\1F310'; /* 🌐 */
  font-size: 1.1em;
  margin-right: 0.2em;
}
.switch-text[data-type="Landing"]::before {
  content: '\1F3E0'; /* 🏠 */
  font-size: 1.1em;
  margin-right: 0.2em;
}
.switch-text[data-type="Interfaz"]::before {
  content: '\1F5A5'; /* 🖥 */
  font-size: 1.1em;
  margin-right: 0.2em;
}
.switch-text[data-type="E-commerce"]::before {
  content: '\1F6D2'; /* 🛒 */
  font-size: 1.1em;
  margin-right: 0.2em;
}

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
  height: 48px;
  background: linear-gradient(90deg, #edeaff 0%, #fff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.2rem;
  border-bottom: 2.5px solid #4831D4;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 2px 8px rgba(72,49,212,0.07);
  position: relative;
  z-index: 2;
}

.plaque span {
  color: #4831D4;
  font-weight: 800;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 0 #fff, 0 2px 6px rgba(72,49,212,0.08);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.1em 0.5em;
  border-radius: 6px;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 1px 2px rgba(72,49,212,0.03);
}

.artwork-content {
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

/* Cliente overlay */
.client-overlay {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 16px);
  background: rgba(72,49,212,0.08);
  color: #4831D4;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  padding: 0.5em 0;
  border-radius: 0 0 12px 12px;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(72,49,212,0.07);
  pointer-events: none;
}

.client-name {
  background: rgba(255,255,255,0.8);
  padding: 0.2em 0.8em;
  border-radius: 6px;
  display: inline-block;
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
  .floor-buttons {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    right: auto;
    top: auto;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 2rem;
  }

  .button-panel {
    flex-direction: row;
    gap: 0.8rem;
  }

  .floor-button {
    width: 3.5rem;
    height: 3.5rem;
  }

  .floor-number {
    font-size: 1rem;
  }

  .floor-name {
    font-size: 0.6rem;
  }

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


  .gallery-section {
    padding: 6rem 0 2rem;
  }

  .gallery-message {
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .floor-buttons {
    bottom: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .floor-button {
    width: 3rem;
    height: 3rem;
  }

  .floor-number {
    font-size: 0.9rem;
  }

  .floor-name {
    font-size: 0.55rem;
  }

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