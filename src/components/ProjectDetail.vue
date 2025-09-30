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

      <!-- Project Content -->
      <div class="project-content">
        <!-- Main Image -->
        <div class="project-image-container">
          <img :src="project?.image" :alt="project?.title" class="project-main-image">
        </div>

        <!-- Project Details -->
        <div class="project-details">
          <div class="detail-section">
            <h3>Desafío</h3>
            <p>{{ project?.challenge }}</p>
          </div>

          <div class="detail-section">
            <h3>Solución</h3>
            <p>{{ project?.solution }}</p>
          </div>

          <div class="detail-section">
            <h3>Tecnologías</h3>
            <div class="tech-list">
              <span v-for="tech in project?.technologies" :key="tech" class="tech-item">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Gallery Section -->
          <div v-if="project?.gallery" class="gallery-section">
            <h3>Galería del Proyecto</h3>
            <div class="gallery-grid">
              <div v-for="(image, index) in project.gallery" :key="index" class="gallery-item">
                <img :src="image.url" :alt="image.alt" class="gallery-image">
              </div>
            </div>
          </div>

          <!-- Results Section -->
          <div v-if="project?.results" class="results-section">
            <h3>Resultados</h3>
            <div class="results-grid">
              <div v-for="result in project.results" :key="result.metric" class="result-item">
                <div class="result-value">{{ result.value }}</div>
                <div class="result-metric">{{ result.metric }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="project-navigation">
        <button v-if="prevProject" @click="navigateToProject(prevProject.id)" class="nav-button prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>{{ prevProject.title }}</span>
        </button>
        
        <button v-if="nextProject" @click="navigateToProject(nextProject.id)" class="nav-button next">
          <span>{{ nextProject.title }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const project = ref(null)

// Datos de proyectos con IDs secuenciales del 1 al 10
const projects = [
  {
    id: 1,
    title: "Quizz Interactivo",
    category: "Interfaz Interactiva",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg",
    description: "Una aplicación de quiz interactiva desarrollada con Vue.js que combina gamificación con aprendizaje, ofreciendo una experiencia de usuario envolvente y educativa.",
    challenge: "Crear una experiencia de quiz que fuera tanto educativa como entretenida, manteniendo a los usuarios comprometidos a través de múltiples sesiones mientras se aseguraba la accesibilidad en diferentes dispositivos.",
    solution: "Desarrollé una aplicación Vue.js con animaciones fluidas, sistema de puntuación en tiempo real, y diseño responsive. Implementé mecánicas de gamificación como logros, niveles de dificultad progresiva y feedback visual inmediato.",
    technologies: ["Vue.js", "JavaScript", "CSS3", "HTML5", "Anime.js"],
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/04/Proyect01.jpg", alt: "Vista principal del quiz" },
      { url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2426", alt: "Interfaz de preguntas" }
    ],
    results: [
      { value: "85%", metric: "Tasa de finalización" },
      { value: "4.8/5", metric: "Satisfacción del usuario" },
      { value: "40%", metric: "Aumento en engagement" }
    ]
  },
  {
    id: 2,
    title: "Website Hotel",
    category: "Sitio Web Corporativo",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg",
    description: "Sitio web elegante y funcional para un hotel boutique, enfocado en la experiencia del usuario y la conversión de reservas directas.",
    challenge: "Diseñar un sitio web que transmitiera la elegancia y exclusividad del hotel mientras optimizaba el proceso de reservas y reducía la dependencia de plataformas externas.",
    solution: "Creé un diseño minimalista y sofisticado con fotografía de alta calidad, sistema de reservas integrado, y experiencia de usuario optimizada para dispositivos móviles. Implementé técnicas de SEO local para mejorar la visibilidad.",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "SCSS"],
    tags: ["Hospitality", "Booking", "Responsive", "CMS"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/04/p6.jpg", alt: "Página principal del hotel" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2426", alt: "Sistema de reservas" }
    ],
    results: [
      { value: "60%", metric: "Aumento en reservas directas" },
      { value: "3.2s", metric: "Tiempo de carga promedio" },
      { value: "25%", metric: "Reducción en tasa de rebote" }
    ]
  },
  {
    id: 3,
    title: "Website Centro Comercial",
    category: "E-commerce",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/04/p4.jpg",
    description: "Plataforma digital completa para centro comercial con directorio de tiendas, promociones y sistema de navegación interior.",
    challenge: "Crear una experiencia digital que reflejara la diversidad del centro comercial y facilitara la navegación tanto física como digital de los visitantes.",
    solution: "Desarrollé una plataforma con mapa interactivo, sistema de búsqueda avanzado por categorías, integración con redes sociales de las tiendas, y sistema de notificaciones para promociones especiales.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Mapbox API"],
    tags: ["Shopping", "Directory", "Catalog", "Payment"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/04/p4.jpg", alt: "Directorio principal" },
      { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2426", alt: "Mapa interactivo" }
    ],
    results: [
      { value: "150%", metric: "Aumento en visitas web" },
      { value: "45%", metric: "Mejora en tiempo de permanencia" },
      { value: "200+", metric: "Tiendas registradas" }
    ]
  },
  {
    id: 4,
    title: "Landing Page Seguros AXA",
    category: "Landing Page",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/05/axa.jpg",
    description: "Landing page de alta conversión para productos de seguros, optimizada para generar leads calificados y mejorar la experiencia del cliente.",
    challenge: "Simplificar la comunicación de productos de seguros complejos y crear un flujo de conversión efectivo que generara confianza en los usuarios.",
    solution: "Diseñé una landing page con storytelling visual, calculadora de seguros interactiva, testimonios de clientes reales, y formularios optimizados con validación en tiempo real.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "Google Analytics"],
    tags: ["Insurance", "Corporate", "Lead Gen", "Forms"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/05/axa.jpg", alt: "Hero section" },
      { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2426", alt: "Calculadora de seguros" }
    ],
    results: [
      { value: "320%", metric: "Aumento en conversiones" },
      { value: "12%", metric: "Tasa de conversión" },
      { value: "2.1s", metric: "Tiempo de carga" }
    ]
  },
  {
    id: 5,
    title: "Catálogo Online",
    category: "E-commerce",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/04/P3.jpg",
    description: "Catálogo digital interactivo con sistema de filtros avanzados, comparación de productos y experiencia de compra optimizada.",
    challenge: "Organizar un extenso catálogo de productos de manera intuitiva y crear una experiencia de búsqueda que facilitara la toma de decisiones de compra.",
    solution: "Implementé un sistema de filtros multicapa, búsqueda con autocompletado, comparador de productos lado a lado, y wishlist personalizada con notificaciones de precio.",
    technologies: ["Vue.js", "Nuxt.js", "Strapi", "PostgreSQL", "Algolia"],
    tags: ["Catalog", "Products", "Search", "Filter"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/04/P3.jpg", alt: "Vista del catálogo" },
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2426", alt: "Sistema de filtros" }
    ],
    results: [
      { value: "180%", metric: "Aumento en ventas online" },
      { value: "65%", metric: "Mejora en UX score" },
      { value: "8.5min", metric: "Tiempo promedio en sitio" }
    ]
  },
  {
    id: 6,
    title: "Dashboard Corporativo",
    category: "Interfaz Web",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/05/Dashboard.jpg",
    description: "Dashboard ejecutivo con visualización de datos en tiempo real, reportes automatizados y panel de control integral para toma de decisiones.",
    challenge: "Transformar grandes volúmenes de datos complejos en visualizaciones comprensibles y accionables para ejecutivos con diferentes niveles técnicos.",
    solution: "Creé un dashboard modular con widgets personalizables, gráficos interactivos, alertas automáticas, y sistema de reportes programables con exportación a múltiples formatos.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Redis"],
    tags: ["Dashboard", "Analytics", "Data Viz", "Admin"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/05/Dashboard.jpg", alt: "Vista principal del dashboard" },
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2426", alt: "Gráficos interactivos" }
    ],
    results: [
      { value: "50%", metric: "Reducción en tiempo de análisis" },
      { value: "95%", metric: "Precisión de datos" },
      { value: "30+", metric: "KPIs monitoreados" }
    ]
  },
  {
    id: 7,
    title: "Landing Page Emprendimiento",
    category: "Landing Page",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/05/p09.jpg",
    description: "Landing page moderna para startup tecnológica, enfocada en captar inversores y early adopters con storytelling compelling.",
    challenge: "Comunicar la propuesta de valor de una startup en etapa temprana y generar interés tanto en inversores como en usuarios potenciales.",
    solution: "Desarrollé una landing page con narrativa visual progresiva, demo interactivo del producto, sección de métricas de tracción, y formularios segmentados para diferentes tipos de audiencia.",
    technologies: ["Astro", "TypeScript", "Tailwind CSS", "Framer Motion", "Netlify"],
    tags: ["Startup", "Business", "CTA", "Modern"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/05/p09.jpg", alt: "Hero section startup" },
      { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2426", alt: "Demo del producto" }
    ],
    results: [
      { value: "400%", metric: "Aumento en signups" },
      { value: "15%", metric: "Tasa de conversión" },
      { value: "25", metric: "Leads de inversores" }
    ]
  },
  {
    id: 8,
    title: "AXA Colpatria - Rediseño Estratégico",
    category: "Rediseño Web",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/05/AXA-portal.jpg",
    description: "Rediseño completo del portal público de AXA Colpatria, enfocado en mejorar la experiencia del usuario y la accesibilidad según estándares WCAG 2.1 AA.",
    challenge: "Modernizar una plataforma legacy manteniendo la confianza de la marca mientras se mejoraba significativamente la usabilidad y accesibilidad para todos los usuarios.",
    solution: "Realicé un rediseño centrado en el usuario con arquitectura de información optimizada, sistema de diseño escalable, mejoras en accesibilidad, y optimización de performance. Incluí pruebas A/B para validar mejoras.",
    technologies: ["React", "TypeScript", "Styled Components", "Jest", "Storybook"],
    tags: ["Portal", "Corporate", "Multi-page", "Professional"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/05/AXA-portal.jpg", alt: "Nueva homepage" },
      { url: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2426", alt: "Antes vs Después" }
    ],
    results: [
      { value: "45%", metric: "Mejora en usabilidad" },
      { value: "AA", metric: "Nivel WCAG alcanzado" },
      { value: "35%", metric: "Reducción en tiempo de carga" }
    ]
  },
  {
    id: 9,
    title: "Clínica Odontológica en Suecia",
    category: "Website Médico",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/05/clinica-suecia.jpg",
    description: "Website profesional para clínica dental en Estocolmo, con diseño minimalista sueco, sistema de citas online y contenido multiidioma.",
    challenge: "Crear una presencia digital que transmitiera profesionalismo y confianza en el mercado sueco, cumpliendo con regulaciones locales de salud y privacidad (GDPR).",
    solution: "Diseñé un sitio web con estética nórdica minimalista, sistema de reservas integrado con calendario, galería de casos antes/después, y contenido optimizado para SEO local en sueco e inglés.",
    technologies: ["WordPress", "PHP", "MySQL", "WPML", "Booking Calendar"],
    tags: ["Healthcare", "Medical", "Appointments", "Services"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/05/clinica-suecia.jpg", alt: "Homepage clínica" },
      { url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2426", alt: "Sistema de citas" }
    ],
    results: [
      { value: "200%", metric: "Aumento en citas online" },
      { value: "4.9/5", metric: "Rating de pacientes" },
      { value: "80%", metric: "Tráfico desde búsqueda local" }
    ]
  },
  {
    id: 10,
    title: "Café Cumbre Real",
    category: "E-commerce Artesanal",
    year: "2024",
    image: "https://oswal.com.co/wp-content/uploads/2025/05/cafe-cumbre.jpg",
    description: "Website para marca de café artesanal colombiano con storytelling del proceso, tienda online y suscripciones mensuales.",
    challenge: "Comunicar la historia y calidad del café artesanal mientras se creaba una experiencia de compra que reflejara los valores de sostenibilidad y tradición de la marca.",
    solution: "Desarrollé un sitio web con storytelling visual del proceso del café, desde la finca hasta la taza, tienda online con suscripciones personalizables, blog educativo sobre café, y integración con redes sociales.",
    technologies: ["Shopify", "Liquid", "JavaScript", "Shopify Plus", "Klaviyo"],
    tags: ["Coffee", "Retail", "Online Store", "Products"],
    gallery: [
      { url: "https://oswal.com.co/wp-content/uploads/2025/05/cafe-cumbre.jpg", alt: "Homepage café" },
      { url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2426", alt: "Proceso del café" }
    ],
    results: [
      { value: "300%", metric: "Aumento en ventas online" },
      { value: "150", metric: "Suscriptores mensuales" },
      { value: "4.8/5", metric: "Satisfacción del cliente" }
    ]
  }
]

const currentProject = computed(() => {
  const id = parseInt(route.params.id as string)
  return projects.find(p => p.id === id)
})

const prevProject = computed(() => {
  const currentId = parseInt(route.params.id as string)
  const currentIndex = projects.findIndex(p => p.id === currentId)
  return currentIndex > 0 ? projects[currentIndex - 1] : null
})

const nextProject = computed(() => {
  const currentId = parseInt(route.params.id as string)
  const currentIndex = projects.findIndex(p => p.id === currentId)
  return currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
})

const navigateToProject = (id: number) => {
  router.push({ name: 'project-detail', params: { id: id.toString() } })
}

onMounted(() => {
  project.value = currentProject.value
})
</script>

<style scoped>
.project-detail-container {
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

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
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

.project-category {
  background: #4831D4;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.project-year {
  background: #CCF381;
  color: #4831D4;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.project-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #4831D4;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.project-description {
  font-size: 1.3rem;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 2rem;
}

.project-tags {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.project-tag {
  background: rgba(72, 49, 212, 0.1);
  color: #4831D4;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(72, 49, 212, 0.2);
}

/* Project Content */
.project-content {
  display: grid;
  gap: 4rem;
}

.project-image-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.project-main-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Project Details */
.project-details {
  display: grid;
  gap: 3rem;
}

.detail-section {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.detail-section h3 {
  font-size: 1.8rem;
  color: #4831D4;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.detail-section p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
}

/* Tech List */
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tech-item {
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(72, 49, 212, 0.3);
}

/* Gallery Section */
.gallery-section {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.gallery-section h3 {
  font-size: 1.8rem;
  color: #4831D4;
  margin-bottom: 2rem;
  font-weight: 700;
  text-align: center;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.gallery-item {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

/* Results Section */
.results-section {
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  padding: 2.5rem;
  border-radius: 20px;
  color: white;
}

.results-section h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
  text-align: center;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.result-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.result-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #CCF381;
  margin-bottom: 0.5rem;
}

.result-metric {
  font-size: 1rem;
  opacity: 0.9;
}

/* Project Navigation */
.project-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  gap: 2rem;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: white;
  border: 2px solid #4831D4;
  border-radius: 15px;
  color: #4831D4;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  max-width: 300px;
}

.nav-button:hover {
  background: #4831D4;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.3);
}

.nav-button.prev {
  justify-content: flex-start;
}

.nav-button.next {
  justify-content: flex-end;
  margin-left: auto;
}

.nav-button span {
  font-size: 0.9rem;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 2rem 1rem;
  }

  .project-title {
    font-size: 2.5rem;
  }

  .project-description {
    font-size: 1.1rem;
  }

  .project-meta {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .detail-section {
    padding: 2rem;
  }

  .results-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .result-value {
    font-size: 2rem;
  }

  .project-navigation {
    flex-direction: column;
  }

  .nav-button {
    max-width: none;
  }

  .nav-button.next {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 2rem;
  }

  .project-tags {
    gap: 0.5rem;
  }

  .project-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>