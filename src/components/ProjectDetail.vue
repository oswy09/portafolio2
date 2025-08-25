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

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">
          <i class="fas fa-times"></i>
        </button>
        <img
          :src="project?.gallery[currentImageIndex]"
          :alt="`Imagen ${currentImageIndex + 1}`"
          class="lightbox-image"
        />
        <div class="lightbox-nav">
          <button
            @click="prevImage"
            class="lightbox-nav-btn"
            :disabled="currentImageIndex === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="lightbox-counter">
            {{ currentImageIndex + 1 }} / {{ project?.gallery?.length }}
          </span>
          <button
            @click="nextImage"
            class="lightbox-nav-btn"
            :disabled="currentImageIndex === (project?.gallery?.length || 0) - 1"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Props and reactive data
const route = useRoute()
const router = useRouter()

// Lightbox functionality
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

const openLightbox = (index: number) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextImage = () => {
  if (currentImageIndex.value < (project.value?.gallery?.length || 0) - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Project data and navigation
const project = ref(null)
const projects = ref([])

const currentProjectIndex = computed(() => {
  return projects.value.findIndex(p => p.id === route.params.id)
})

const prevProjectId = computed(() => {
  const prevIndex = currentProjectIndex.value - 1
  return prevIndex >= 0 ? projects.value[prevIndex]?.id : null
})

const nextProjectId = computed(() => {
  const nextIndex = currentProjectIndex.value + 1
  return nextIndex < projects.value.length ? projects.value[nextIndex]?.id : null
})

const navigateToProject = (projectId: string) => {
  if (projectId) {
    router.push(`/project/${projectId}`)
  }
}

const backToGallery = () => {
  router.push('/')
}

// Load project data
onMounted(() => {
  // Load project data here
  // This would typically come from a store or API
})
</script>