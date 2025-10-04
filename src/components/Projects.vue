<template>
  <div class="scene">
    <!-- Header Section with Filters -->
    <div class="header-section">
      <!-- Filter Section -->
      <div class="filter-section">
        <div class="filter-container">
          <span class="filter-label">Tipo de Proyecto</span>
          <div class="filter-buttons">
            <button 
              v-for="filter in activeFilters" 
              :key="filter.id"
              @click="filter.active = !filter.active"
              :class="['filter-btn', { active: filter.active }]"
            >
              {{ filter.name }}
            </button>
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



const currentTranslate = ref(0)
const progressWidth = ref(0)
const maxScroll = ref(0)
const hoveredProject = ref<number | null>(null)

const projects = [
  { 
    id: 1, 
    title: "Website Hotel", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359521/Hotel_Amazon_proyecto_oswal.png", 
    category: "website",
    client: "Hotel Amazon",
    tags: ["Hospitality", "Booking", "Responsive", "CMS"],
    order: 1
  },
  { 
    id: 2, 
    title: "Web centro comercial", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png", 
    category: "ecommerce",
    client: "Micentro Comercial",
    tags: ["Shopping", "Directory", "Catalog", "Payment"],
    order: 2
  },
  { 
    id: 3, 
    title: "Website portal", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757361622/Redise%C3%B1o_web_Proyecto_oswal.png", 
    category: "website",
    client: "AXA Colpatria",
    tags: ["Portal", "Corporate", "Multi-page", "Professional"],
    order: 3
  },
  { 
    id: 4, 
    title: "Quizz Interactivo", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757370425/Quizz_website_proyectos_Oswal.png", 
    category: "interfaz",
    client: "Acueducto Bogotá",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    order: 4
  },
  { 
    id: 5, 
    title: "Bunker de libros", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371705/Bestyle_website_proyectos_Oswal.png", 
    category: "ecommerce",
    client: "Bestyle",
    tags: ["Catalog", "Products", "Search", "Filter"],
    order: 5
  },
  { 
    id: 6, 
    title: "Website Clínica Dental", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757362220/Clinica_odontologica_proyecto_web_oswal.png", 
    category: "website",
    client: "kliniken Schröder",
    tags: ["Healthcare", "Medical", "Appointments", "Services"],
    order: 6
  },
  { 
    id: 7, 
    title: "Catálogo digital", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371705/Bestyle_website_proyectos_Oswal.png", 
    category: "ecommerce",
    client: "Bestyle",
    tags: ["Catalog", "Products", "Search", "Filter"],
    order: 7
  },
  { 
    id: 8, 
    title: "Landing page Intermediarios", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359522/Landing_Pages_seguros.png", 
    category: "landing",
    client: "AXA Colpatria",
    tags: ["Insurance", "Corporate", "Lead Gen", "Forms"],
    order: 8
  },
  { 
    id: 9, 
    title: "Clínica Cirugías Betterme", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757375618/Clinica_Betterme_proyecto_web_oswal.png", 
    category: "interfaz",
    client: "Betterme",
    tags: ["Dashboard", "Analytics", "Data Viz", "Admin"],
    order: 9
  },
  { 
    id: 10, 
    title: "Dedicador canciones", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757372516/Dedicandote_proyecto_oswal_music.png", 
    category: "landing",
    client: "Dedicandote",
    tags: ["Startup", "Business", "CTA", "Modern"],
    order: 10
  },
  { 
    id: 11, 
    title: "Website venta café", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373361/Website_cafe_proyecto_oswal_col.png", 
    category: "ecommerce",
    client: "Café cumbre",
    tags: ["Coffee", "Retail", "Online Store", "Products"],
    order: 11
  },
  { 
    id: 12,
    title: "Website Centro Comercial", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png ", 
    category: "ecommerce",
    client: "Micentro Comercial",
    tags: ["Shopping", "Directory", "Catalog", "Payment"],
    order: 4
  },
  { 
    id: 13, 
    title: "Landing page", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359522/Landing_Pages_seguros.png", 
    category: "landing",
    client: "AXA Colpatria",
    tags: ["Insurance", "Corporate", "Lead Gen", "Forms"],
    order: 1
  },
  { 
    id: 14, 
    title: "Catálogo Online", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371705/Bestyle_website_proyectos_Oswal.png", 
    category: "ecommerce",
    client: "Bestyle",
    tags: ["Catalog", "Products", "Search", "Filter"],
    order: 5
  },
  { 
    id: 15, 
    title: "Web Clinica", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757375618/Clinica_Betterme_proyecto_web_oswal.png", 
    category: "interfaz",
    client: "Betterme",
    tags: ["Dashboard", "Analytics", "Data Viz", "Admin"],
    order: 6
  },
  { 
    id: 16, 
    title: "Landing page", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757372516/Dedicandote_proyecto_oswal_music.png", 
    category: "landing",
    client: "Dedicandote",
    tags: ["Startup", "Business", "CTA", "Modern"],
    order: 7
  },
  { 
    id: 17, 
    title: "Re diseño web", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757361622/Redise%C3%B1o_web_Proyecto_oswal.png", 
    category: "website",
    client: "AXA Colpatria",
    tags: ["Portal", "Corporate", "Multi-page", "Professional"],
    order: 8
  },
  { 
    id: 18, 
    title: "Website Odontológica", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757362220/Clinica_odontologica_proyecto_web_oswal.png", 
    category: "website",
    client: "kliniken Schröder",
    tags: ["Healthcare", "Medical", "Appointments", "Services"]
  },
  { 
    id: 19, 
    title: "Website Café", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373361/Website_cafe_proyecto_oswal_col.png", 
    category: "ecommerce",
    client: "Café cumbre",
    tags: ["Coffee", "Retail", "Online Store", "Products"]
  },
  { 
    id: 20, 
    title: "Landing page ", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373349/Landing_Pages_inter_oswal.png", 
    category: "landing",
    client: "AXA Colpatria",
    tags: ["Healthcare", "Dental", "Conversion", "Contact"]
  },
  { 
    id: 21, 
    title: "Mapa Interactivo Amazon", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/mapa-amazon.jpg", 
    category: "interfaz",
    client: "Cliente L",
    tags: ["Interactive", "Maps", "Environmental", "Data"]
  },
  { 
    id: 22, 
    title: "Rediseño APP AXA", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/App-axa.jpg", 
    category: "interfaz",
    client: "Cliente M",
    tags: ["Mobile App", "Redesign", "UX/UI", "Insurance"]
  },
  { 
    id: 23, 
    title: "Website Cirugía Plástica", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/betterme.jpg", 
    category: "website",
    client: "Betterme",
    tags: ["Medical", "Aesthetic", "Gallery", "Consultation"]
  },
  { 
    id: 24, 
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
  
  // Filtrar y luego ordenar por la propiedad 'order'
  return projects
    .filter(project => activeCategories.includes(project.category))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
})


const handleWheel = (e: WheelEvent) => {
  // Only handle horizontal scroll on desktop (width > 768px)
  if (window.innerWidth > 768) {
    e.preventDefault()
    const scrollAmount = e.deltaY * 2
    setTransform(currentTranslate.value - scrollAmount)
  }
  // On mobile, let the default vertical scroll behavior work
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
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-btn {
  padding: 0.4rem 1rem;
  border: 1.5px solid #e9ecef;
  border-radius: 16px;
  background: white;
  color: #666;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.filter-btn:hover {
  border-color: #4831D4;
  color: #4831D4;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(72, 49, 212, 0.15);
}

.filter-btn.active {
  background: #4831D4;
  border-color: #4831D4;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(72, 49, 212, 0.25);
}

/* Filter button animations */
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

  .header-section {
    padding: 1rem 1rem;
  }

  /* FILTRO TEMPORALMENTE OCULTO EN MOBILE - COLOCAR DESPUÉS */
  .filter-section {
    display: none;
    /* margin-bottom: 1rem; */
  }

  .filter-container {
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.5rem 1rem;
    margin: 0 1rem;
  }

  .filter-label {
    font-size: 0.9rem;
    text-align: center;
  }

  .filter-buttons {
    justify-content: center;
    gap: 0.4rem;
  }

  .filter-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 14px;
    min-width: 70px;
  }

  .artwork {
    width: 200px;
    height: 230px;
  }

  .gallery-container {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 60vh;
  }

  .gallery-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: static;
    gap: 3rem;
    padding: 2rem 1rem;
    transform: none !important;
  }

  .artwork-unit {
    margin: 0;
    width: 100%;
    max-width: 280px;
    height: auto;
  }

  .gallery-section {
    padding: 2rem 0 2rem;
  }

  /* Hide progress bar on mobile since we use vertical scroll */
  .progress-container {
    display: none;
  }

  /* Style the scrollbar */
  .gallery-container::-webkit-scrollbar {
    width: 4px;
  }

  .gallery-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  .gallery-container::-webkit-scrollbar-thumb {
    background: #4831D4;
    border-radius: 2px;
  }

  .gallery-container::-webkit-scrollbar-thumb:hover {
    background: #6a5ae0;
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

  .gallery-container {
    max-height: 55vh;
  }

  .gallery-track {
    gap: 2.5rem;
    padding: 1.5rem 0.5rem;
  }

  .artwork-unit {
    max-width: 200px;
  }

  .header-section {
    padding: 1rem 1rem;
  }

  /* FILTRO OCULTO EN MOBILE PEQUEÑO TAMBIÉN */
  .filter-container {
    padding: 1.2rem 0.8rem;
    margin: 0 0.5rem;
    border-radius: 16px;
  }

  .filter-label {
    font-size: 0.85rem;
  }

  .filter-buttons {
    gap: 0.3rem;
  }

  .filter-btn {
    padding: 0.4rem 0.7rem;
    font-size: 0.75rem;
    border-radius: 12px;
    min-width: 60px;
  }

  .main-title {
    font-size: 1.8rem;
  }
}
</style>