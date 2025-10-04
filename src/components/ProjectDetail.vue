<template>
  <div class="project-detail">
    <!-- Top Navigation -->
    <div class="top-navigation-static">
      <button @click="goBack" class="back-to-gallery-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Volver a Galería</span>
      </button>
    </div>

    <!-- Close Button -->
    <router-link to="/projects" class="close-button-x">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Hero Section -->
      <div v-if="project" class="hero-section">
        <div class="hero-background">
          <img :src="project.image" :alt="project.title" class="hero-image">
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <h1 class="hero-title">{{ project.title }}</h1>
          <p class="hero-description">{{ project.keyAchievement }}</p>
          <div class="hero-meta">
            <div class="meta-item">
              <div class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span class="meta-label">Cliente</span>
              <span class="meta-value">{{ project.client }}</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
              </div>
              <span class="meta-label">Mi Rol</span>
              <span class="meta-value">{{ project.myRole }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Section -->
      <div v-if="project && project.challenge" class="section challenge-section">
        <h2 class="section-title">El Reto</h2>
        <p class="section-content">{{ project.challenge }}</p>
      </div>

      <!-- Process Section -->
      <div v-if="project && project.process" class="section process-section">
        <h2 class="section-title">El Proceso</h2>
        
        <!-- Research -->
        <div v-if="project.process.research" class="process-step">
          <div class="step-header">
            <div class="step-icon">🔍</div>
            <h3 class="step-title">Investigación / UX</h3>
          </div>
          <ul class="step-list">
            <li v-for="item in project.process.research" :key="item">{{ item }}</li>
          </ul>
        </div>

        <!-- Design -->
        <div v-if="project.process.design" class="process-step">
          <div class="step-header">
            <div class="step-icon">🎨</div>
            <h3 class="step-title">Diseño / UI</h3>
          </div>
          <ul class="step-list">
            <li v-for="activity in project.process.design.activities" :key="activity">{{ activity }}</li>
          </ul>
          
          <!-- Design Details -->
          <div v-if="project.process.design.colors" class="design-details">
            <div class="detail-group">
              <h4 class="detail-title">🎨 Paleta de Colores</h4>
              <div class="color-palette">
                <div 
                  v-for="color in project.process.design.colors" 
                  :key="color"
                  class="color-swatch"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </div>

          <div v-if="project.process.design.typography" class="design-details">
            <div class="detail-group">
              <h4 class="detail-title">📝 Tipografía</h4>
              <div class="typography-list">
                <div v-for="font in project.process.design.typography" :key="font.name" class="typography-item">
                  <span class="font-name">{{ font.name }}</span>
                  <span class="font-usage">{{ font.usage }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Development -->
        <div v-if="project.process.development" class="process-step">
          <div class="step-header">
            <div class="step-icon">💻</div>
            <h3 class="step-title">Desarrollo/Implementación</h3>
          </div>
          <ul class="step-list">
            <li v-for="activity in project.process.development.activities" :key="activity">{{ activity }}</li>
          </ul>
          
          <div v-if="project.process.development.stack" class="design-details">
            <div class="detail-group">
              <h4 class="detail-title">Tecnologías Utilizadas</h4>
              <div class="tech-stack">
                <div v-for="tech in project.process.development.stack" :key="tech.name" class="tech-item">
                  <i :class="tech.icon"></i>
                  <span>{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Solution Section -->
      <div v-if="project && project.solution" class="section solution-section">
        <h2 class="section-title">La Solución</h2>
        <div class="solution-content">
          <!-- GIF Demo -->
          <div v-if="project.solution.gif" class="solution-demo">
            <img :src="project.solution.gif" :alt="project.title + ' demo'" class="solution-gif">
          </div>
          
          <!-- Image Gallery -->
          <div v-else-if="project.imageGallery && project.imageGallery.length > 0" class="solution-gallery">
            <div class="gallery-grid">
              <div v-for="image in project.imageGallery" :key="image.url" class="gallery-item">
                <div class="gallery-image-container">
                  <img :src="image.url" :alt="image.alt" class="gallery-image">
                  <div class="gallery-tag">{{ image.tag }}</div>
                </div>
                <div class="gallery-caption">{{ image.caption }}</div>
              </div>
            </div>
          </div>

          <p class="solution-description">{{ project.solution.description }}</p>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="project && project.results && project.results.length > 0" class="section results-section">
        <h2 class="section-title">Resultados del Proyecto</h2>
        <div class="results-grid">
          <div v-for="result in project.results" :key="result.metric" class="result-card">
            <div class="result-value">{{ result.value }}</div>
            <div class="result-metric">{{ result.metric }}</div>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="bottom-navigation">
        <button @click="previousProject" class="nav-btn secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Anterior</span>
        </button>
        <button @click="viewLive" class="nav-btn primary">
          <span>Ver Proyecto</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
        <button @click="nextProject" class="nav-btn secondary">
          <span>Siguiente</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
  </div>
</template>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Datos de los proyectos (mismo orden que en Projects.vue)
const projects = [
  {
    id: 1,
    image: "http://www.amazonbb.com/wp-content/uploads/2023/05/boat-forest-river-blue-sky-reflection.jpg",
    title: "Hotel Amazon B&B - Un Refugio en el Corazón del Amazonas",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: "Revitalizando la presencia online para una experiencia amazónica auténtica y atractiva para el viajero internacional.",
    client: "Hotel Amazon B&B",
    industry: "Hotel",
    location: "Amazonas, Colombia",
    myRole: "Web designer",
    responsibilities: ["UX design", "UI Design", "Frontend Developer"],
    challenge: "Amazon B&B, un encantador hotel inmerso en la exuberante selva amazónica, luchaba por conectar con su público objetivo: turistas extranjeros en busca de una experiencia única. Su sitio web existente era pesado, carente de diseño atractivo y con una usabilidad deficiente, lo que dificultaba la reserva y no reflejaba la belleza y autenticidad del lugar.",
    process: {
      research: [
        "Análisis de requisitos técnicos",
        "benchmark de sitios web de hoteles de ecoturismo",
        "Análisis de Usabilidad del Sitio Web",
        "User Flow",
        "Card Sorting",
        "Arquitectura de la Información y Sitemap"
      ],
      design: {
        activities: [
          "Creación de Wireframes y Diseño de Mockups",
          "Prototipado de visualizaciones",
          "Optimización y mejoramiento de UI Kit",
          "Diseño de Iconografía y Elementos Gráficos"
        ],
        colors: ["#455D58", "#3B6317", "#9DBC79", "#EC9B30", "#2E3B48"],
        typography: [
          { name: "EB Garamond", usage: "Títulos y encabezados" },
          { name: "Montserrat", usage: "Texto y contenido" }
        ]
      },
      development: {
        activities: [
          "Evaluación de Accesibilidad Web",
          "Migración a hosting",
          "Construcción de Layouts y Diseño a Medida con Constructor Visual",
          "Performance Optimization",
          "Mantenimiento y Actualizaciones Wordpress",
          "Desarrollo de Funcionalidades Personalizadas",
          "Implementación de Seguridad Web"
        ],
        stack: [
          { name: "Wordpress", icon: "fa-brands fa-wordpress" },
          { name: "HTML", icon: "fa-brands fa-html5" },
          { name: "CSS", icon: "fa-brands fa-css3" },
          { name: "JS", icon: "fa-brands fa-js" },
          { name: "PHP", icon: "fa-brands fa-php" }
        ]
      }
    },
    solution: {
      description: "Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours."
    },
    imageGallery: [
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428647/Amazon_Hotel_Proyecto_oswal.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B Home",
        tag: "resultado"
      },
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428648/Amazon_Hotel_Rooms_Proyecto_oswal.png",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B acomodaciones",
        tag: "resultado"
      }
    ],
    results: [
      { value: "+25%", metric: "Tasa de Conversión de Reservas" },
      { value: "+25%", metric: "Volumen de consultas directas vía correo y WhatsApp" },
      { value: "+40%", metric: "Facilidad de Gestión de Contenido" }
    ],
    liveUrl: "https://www.amazonbb.com/"
  },
  {
    id: 2,
    title: 'AXA Colpatria - Landing Page "Seguro de Vida Deudor"',
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288825/Landing_AX-COL_.jpg",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: "Creación de una landing page corporativa de alto impacto visual y optimizada para la conversión, enfocada en la captación de leads para el Seguro de Vida Deudor de AXA Colpatria.",
    client: "AXA COLPATRIA",
    industry: "Aseguradora",
    location: "Colombia",
    myRole: "Web designer",
    responsibilities: ["UX design", "UI Design", "Frontend Developer"],
    challenge: "AXA Colpatria necesitaba una landing page específica y altamente efectiva para promocionar su Seguro de Vida Deudor. El desafío era diseñar y desarrollar una página que no solo comunicara de forma clara los beneficios y requisitos del seguro, sino que también inspirara confianza, guiara al usuario intuitivamente, y que se pudiera integrar facilmente a un CRM.",
    process: {
      research: [
        "Análisis de Público Objetivo y Competencia",
        "User Flow",
        "Pruebas de Usabilidad"
      ],
      design: {
        activities: [
          "Diseño de Mockups",
          "Prototipos",
          "Integración sistema de diseño de la marca"
        ],
        colors: ["#5C5CB7", "#3D3DAA", "#00008F", "#DD7358", "#D75D3D", "#D24723", "#7698CB", "#41949F", "#E196AA"],
        typography: [
          { name: "Publico Headline Web", usage: "Títulos y encabezados" },
          { name: "Source Sans Pro", usage: "Texto y contenido" }
        ]
      },
      development: {
        activities: [
          "Evaluación de Accesibilidad Web",
          "Implementación en html, css y Javascript",
          "Desarrollo de Funcionalidades Personalizadas",
          "Diseño y configuración de iconos fuente",
          "Creación y envío de formulario"
        ],
        stack: [
          { name: "HTML", icon: "fa-brands fa-html5" },
          { name: "CSS", icon: "fa-brands fa-css3" },
          { name: "JS", icon: "fa-brands fa-js" }
        ]
      }
    },
    solution: {
      gif: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756246659/Proyectos_oswal_web_design_AXA_landing_vida_hlubht.gif",
      description: "Se entregó una landing page clave para AXA Colpatria, concebida en Figma y desarrollada con código HTML, CSS y JavaScript. Esta página es totalmente responsiva y fue construida para cumplir con objetivos de negocio y marketing claros. Su diseño presenta los beneficios del Seguro de Vida Deudor de forma directa y su función principal es captar leads calificados eficientemente a través de un formulario optimizado."
    },
    results: [
      { value: "+35%", metric: "Tasa de Conversión de Leads" },
      { value: "-15%", metric: "Tasa de rebote" }
    ],
    liveUrl: "https://lpsv.netlify.app/"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757289000/plataforma_concursos.jpg",
    title: "Quizz Interactivo para concursos: Potenciando el Estudio en Acueducto de Bogotá",
    roles: ["UX Research", "UI Design", "Frontend Designer"],
    keyAchievement
  }
]