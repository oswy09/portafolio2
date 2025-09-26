<template>
  <div class="projects2-container">
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
        <h1 class="main-title">Galería de Proyectos</h1>
        
        <!-- Filter Section -->
        <div class="filter-section">
          <div class="filter-container">
            <span class="filter-label">Tipo de Proyecto</span>
            <div class="filter-buttons">
              <button 
                v-for="filter in filters" 
                :key="filter.id"
                @click="setActiveFilter(filter.id)"
                :class="['filter-btn', { active: activeFilter === filter.id }]"
              >
                {{ filter.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Gallery Section -->
      <div class="gallery-section">
        <!-- Message with Arrow -->
        <div class="gallery-message">
          <div class="message-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 100 50" fill="none">
              <path d="M10 25 Q30 5, 50 25 Q70 45, 90 25" stroke="#4831D4" stroke-width="3" fill="none"/>
              <path d="M85 20 L90 25 L85 30" stroke="#4831D4" stroke-width="3" fill="none"/>
            </svg>
          </div>
          <p class="message-text">desliza para ver contenido</p>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="artwork-frame"
            @click="navigateToProject(project.id)"
          >
            <!-- Hanging Wire -->
            <div class="hanging-wire"></div>
            
            <!-- Lamp -->
            <div class="gallery-lamp">
              <div class="lamp-wire"></div>
              <div class="lamp-shade"></div>
              <div class="lamp-light"></div>
            </div>

            <!-- Artwork -->
            <div class="artwork-container">
              <div class="artwork-border">
                <div class="artwork-content">
                  <img :src="project.image" :alt="project.title" class="project-image">
                  <div class="artwork-overlay">
                    <div class="overlay-content">
                      <h3 class="project-title">{{ project.title }}</h3>
                      <div class="project-tags">
                        <span v-for="tag in project.tags" :key="tag" class="project-tag">
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Plaque -->
              <div class="artwork-plaque">
                <span class="plaque-text">{{ project.title }}</span>
                <span class="plaque-year">{{ project.year }}</span>
              </div>
            </div>

            <!-- Progress Indicator -->
            <div class="progress-indicator"></div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="navigation-dots">
          <div 
            v-for="index in Math.ceil(filteredProjects.length / 4)" 
            :key="index"
            :class="['nav-dot', { active: index === 0 }]"
          ></div>
        </div>
      </div>

      <!-- Back Section -->
      <div class="back-section">
        <button @click="goBack" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Volver a Proyectos</span>
        </button>
      </div>

      <!-- Bottom spacing -->
      <div class="bottom-spacing"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeFilter = ref('todos')

const filters = [
  { id: 'todos', name: 'Todos' },
  { id: 'interactivo', name: 'Interactivo' },
  { id: 'web', name: 'Web' },
  { id: 'landing', name: 'Landing' },
  { id: 'ecommerce', name: 'E-commerce' }
]

const projects = [
  { 
    id: 1, 
    title: "Quizz Interactivo", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
    year: "2024",
    tags: ["Vue.js", "Interactive", "Gaming"],
    category: "interactivo"
  },
  { 
    id: 2, 
    title: "Website Hotel", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg",
    year: "2024",
    tags: ["Hospitality", "Booking", "Responsive"],
    category: "web"
  },
  { 
    id: 3, 
    title: "Website Centro Comercial", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/p4.jpg",
    year: "2024",
    tags: ["E-commerce", "Shopping", "Directory"],
    category: "ecommerce"
  },
  { 
    id: 4, 
    title: "Landing Page Seguros", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/axa.jpg",
    year: "2024",
    tags: ["Insurance", "Landing", "Corporate"],
    category: "landing"
  },
  { 
    id: 5, 
    title: "Catálogo Online", 
    image: "https://oswal.com.co/wp-content/uploads/2025/04/P3.jpg",
    year: "2024",
    tags: ["Catalog", "Products", "E-commerce"],
    category: "ecommerce"
  },
  { 
    id: 6, 
    title: "Dashboard Corporativo", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/Dashboard.jpg",
    year: "2024",
    tags: ["Dashboard", "Analytics", "Corporate"],
    category: "web"
  },
  { 
    id: 7, 
    title: "Landing Page Emprendimiento", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/p09.jpg",
    year: "2024",
    tags: ["Startup", "Landing", "Business"],
    category: "landing"
  },
  { 
    id: 8, 
    title: "Website AXA Portal", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/AXA-portal.jpg",
    year: "2024",
    tags: ["Portal", "Insurance", "Corporate"],
    category: "web"
  },
  { 
    id: 9, 
    title: "Website Clínica Odontológica", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/clinica-suecia.jpg",
    year: "2024",
    tags: ["Healthcare", "Dental", "Medical"],
    category: "web"
  },
  { 
    id: 10, 
    title: "Website Venta Café", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/cafe-cumbre.jpg",
    year: "2024",
    tags: ["E-commerce", "Coffee", "Retail"],
    category: "ecommerce"
  },
  { 
    id: 11, 
    title: "Landing Page Dental", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    year: "2024",
    tags: ["Healthcare", "Dental", "Landing"],
    category: "landing"
  },
  { 
    id: 12, 
    title: "Mapa Interactivo Amazon", 
    image: "https://oswal.com.co/wp-content/uploads/2025/05/mapa-amazon.jpg",
    year: "2024",
    tags: ["Interactive", "Maps", "Environmental"],
    category: "interactivo"
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'todos') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
})

const setActiveFilter = (filterId: string) => {
  activeFilter.value = filterId
}

const navigateToProject = (id: number) => {
  router.push({ name: 'project-detail', params: { id: id.toString() } })
}

const goBack = () => {
  router.push('/projects')
}
</script>

<style scoped>
.projects2-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #F4F9FC;
  overflow: hidden;
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
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  scroll-behavior: smooth;
}

/* Header Section */
.header-section {
  text-align: center;
  padding: 4rem 2rem 2rem;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: #4831D4;
  margin-bottom: 3rem;
  line-height: 1.2;
}

/* Filter Section */
.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
}

.filter-container {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filter-label {
  font-size: 1rem;
  font-weight: 600;
  color: #4831D4;
  white-space: nowrap;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  background: transparent;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-btn:hover {
  border-color: #4831D4;
  color: #4831D4;
}

.filter-btn.active {
  background: #4831D4;
  border-color: #4831D4;
  color: white;
}

/* Gallery Section */
.gallery-section {
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Message with Arrow */
.gallery-message {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
  padding-left: 2rem;
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

/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem 2rem;
  margin-bottom: 3rem;
}

/* Artwork Frame - Reduced Size */
.artwork-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease;
}

.artwork-frame:hover {
  transform: translateY(-8px);
}

/* Hanging Wire */
.hanging-wire {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 50px;
  background: #666;
  z-index: 1;
}

/* Gallery Lamp - Smaller */
.gallery-lamp {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.lamp-wire {
  width: 2px;
  height: 30px;
  background-color: #333;
}

.lamp-shade {
  width: 40px;
  height: 25px;
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  border-radius: 50% 50% 0 0;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.lamp-shade::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 5px;
  background-color: #1a252f;
  border-radius: 0 0 5px 5px;
}

.lamp-light {
  position: absolute;
  top: 25px;
  width: 200px;
  height: 120px;
  background: radial-gradient(ellipse at center, 
    rgba(255, 255, 200, 0.3) 0%, 
    rgba(255, 255, 200, 0.1) 40%,
    rgba(255, 255, 200, 0) 70%);
  border-radius: 50%;
  transform: translateX(-50%);
  left: 50%;
  pointer-events: none;
  filter: blur(6px);
  transition: all 0.4s ease;
}

.artwork-frame:hover .lamp-light {
  background: radial-gradient(ellipse at center, 
    rgba(255, 255, 200, 0.5) 0%, 
    rgba(255, 255, 200, 0.3) 40%,
    rgba(255, 255, 200, 0) 70%);
  filter: blur(4px);
}

/* Artwork Container - Smaller */
.artwork-container {
  position: relative;
  margin-top: 1.5rem;
}

.artwork-border {
  background: #2c3e50;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 2px 5px rgba(255, 255, 255, 0.1);
}

.artwork-content {
  position: relative;
  width: 250px;
  height: 200px;
  background: white;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.artwork-frame:hover .project-image {
  transform: scale(1.05);
}

/* Artwork Overlay */
.artwork-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: all 0.4s ease;
}

.artwork-frame:hover .artwork-overlay {
  opacity: 1;
}

.overlay-content {
  width: 100%;
}

.project-title {
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-tag {
  padding: 0.2rem 0.6rem;
  background: rgba(72, 49, 212, 0.9);
  color: white;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
}

/* Artwork Plaque - Smaller */
.artwork-plaque {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  min-width: 160px;
}

.plaque-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #2d3748;
  text-align: center;
  line-height: 1.2;
}

.plaque-year {
  font-size: 0.7rem;
  color: #666;
  font-style: italic;
}

/* Progress Indicator */
.progress-indicator {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: #4831D4;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.artwork-frame:hover .progress-indicator {
  opacity: 1;
}

/* Navigation Dots */
.navigation-dots {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 4rem;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(72, 49, 212, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: #4831D4;
  transform: scale(1.2);
}

.nav-dot:hover {
  background: #4831D4;
}

/* Back Section */
.back-section {
  text-align: center;
  padding: 2rem;
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

.bottom-spacing {
  height: 2rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .filter-section {
    margin-bottom: 3rem;
  }

  .filter-container {
    background: transparent;
    box-shadow: none;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0;
  }

  .filter-label {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .filter-buttons {
    justify-content: center;
    gap: 0.8rem;
  }

  .filter-btn {
    padding: 1rem 1.8rem;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: 600;
    border: 2px solid #e9ecef;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    min-width: 120px;
  }

  .filter-btn:hover,
  .filter-btn.active {
    background: #4831D4;
    border-color: #4831D4;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(72, 49, 212, 0.3);
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem 1rem;
  }

  .artwork-content {
    width: 220px;
    height: 180px;
  }

  .gallery-lamp {
    top: -80px;
  }

  .lamp-shade {
    width: 35px;
    height: 22px;
  }

  .lamp-light {
    width: 160px;
    height: 100px;
  }

  .header-section {
    padding: 2rem 1rem 1rem;
  }

  .gallery-message {
    padding-left: 1rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .artwork-content {
    width: 200px;
    height: 160px;
  }

  .project-title {
    font-size: 1rem;
  }

  .artwork-overlay {
    padding: 1rem;
  }

  .plaque-text {
    font-size: 0.75rem;
  }

  .main-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .filter-container {
    padding: 0 1rem;
  }

  .filter-buttons {
    gap: 0.6rem;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }

  .filter-btn {
    padding: 1.2rem 2rem;
    font-size: 1rem;
    width: 100%;
    min-width: auto;
    border-radius: 20px;
  }

  .filter-label {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}
</style>