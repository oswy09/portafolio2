<template>
  <div class="project-detail">
    <!-- Close Button -->
    <!-- Top Navigation Button -->
    <!-- Updated: September 22, 2025 -->
    <div class="top-navigation-static">
      <button @click="goBack" class="back-to-gallery-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Volver a Galería</span>
      </button>
    </div>

    <!-- Close Button (mantener el original también) -->
    <router-link to="/projects" class="close-button-x">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Hero Section -->
      <div class="hero-section" v-if="currentProject">
        <div class="hero-background">
          <img :src="currentProject.image" :alt="currentProject.title" class="hero-image" />
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <h1 class="hero-title">{{ currentProject.title }}</h1>
          <p class="hero-description">{{ currentProject.keyAchievement }}</p>
          <div class="hero-meta">
            <div class="meta-item">
              <div class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span class="meta-label">Cliente</span>
              <span class="meta-value">{{ currentProject.client }}</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
              </div>
              <span class="meta-label">Mi Rol</span>
              <span class="meta-value">{{ currentProject.myRole }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Section -->
      <div class="section challenge-section" v-if="currentProject && currentProject.challenge">
        <h2 class="section-title">El Reto</h2>
        <p class="section-content">{{ currentProject.challenge }}</p>
      </div>

      <!-- Process Section -->
      <div class="section process-section" v-if="currentProject && currentProject.process">
        <h2 class="section-title">El Proceso</h2>
        
        <!-- Research -->
        <div class="process-step" v-if="currentProject.process.research">
          <div class="step-header">
            <div class="step-icon">🔍</div>
            <h3 class="step-title">Investigación / UX</h3>
          </div>
          <ul class="step-list">
            <li v-for="item in currentProject.process.research" :key="item">{{ item }}</li>
          </ul>
        </div>

        <!-- Design -->
        <div class="process-step" v-if="currentProject.process.design">
          <div class="step-header">
            <div class="step-icon">🎨</div>
            <h3 class="step-title">Diseño / UI</h3>
          </div>
          <ul class="step-list">
            <li v-for="activity in currentProject.process.design.activities" :key="activity">{{ activity }}</li>
          </ul>
          
          <!-- Colors -->
          <div class="design-details" v-if="currentProject.process.design.colors">
            <div class="detail-group">
              <h4 class="detail-title">🎨 Paleta de Colores</h4>
              <div class="color-palette">
                <div 
                  v-for="color in currentProject.process.design.colors" 
                  :key="color"
                  class="color-swatch"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Typography -->
          <div class="design-details" v-if="currentProject.process.design.typography">
            <div class="detail-group">
              <h4 class="detail-title">📝 Tipografía</h4>
              <div class="typography-list">
                <div v-for="font in currentProject.process.design.typography" :key="font.name" class="typography-item">
                  <span class="font-name">{{ font.name }}</span>
                  <span class="font-usage">{{ font.usage }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Elementos Gráficos -->
          <div class="design-details" v-if="currentProject.process.design.icons">
            <div class="detail-group">
              <h4 class="detail-title">🎨 Elementos Gráficos</h4>
              <div class="graphic-elements">
                <div v-for="icon in currentProject.process.design.icons" :key="icon.value" class="graphic-element">
                  <img :src="icon.value" :alt="'Elemento gráfico'" class="graphic-image" />
                </div>
              </div>
            </div>
          </div>
          <!-- Elementos Gráficos Section -->
          <div class="project-section">
            <h3 class="section-title">Elementos Gráficos</h3>
            <div class="graphic-elements-grid">
              <div class="graphic-element">
                <div class="element-preview">
                  <div class="icon-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                </div>
                <div class="element-info">
                  <h4>Iconografía Principal</h4>
                  <p>Conjunto de iconos personalizados para la interfaz</p>
                  <a href="#" class="element-link">Ver colección →</a>
                </div>
              </div>

              <div class="graphic-element">
                <div class="element-preview">
                  <div class="icon-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                </div>
                <div class="element-info">
                  <h4>Ilustraciones</h4>
                  <p>Elementos gráficos y ilustraciones custom</p>
                  <a href="#" class="element-link">Ver galería →</a>
                </div>
              </div>

              <div class="graphic-element">
                <div class="element-preview">
                  <div class="icon-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <div class="element-info">
                  <h4>Elementos UI</h4>
                  <p>Componentes y elementos de interfaz</p>
                  <a href="#" class="element-link">Ver componentes →</a>
                </div>
              </div>

              <div class="graphic-element">
                <div class="element-preview">
                  <div class="icon-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                </div>
                <div class="element-info">
                  <h4>Assets Gráficos</h4>
                  <p>Recursos gráficos y elementos visuales</p>
                  <a href="#" class="element-link">Ver recursos →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Development Section -->
        <div class="process-step" v-if="currentProject.process.development && currentProject.process.development.activities && currentProject.process.development.activities.length > 0">
          <div class="step-header">
            <div class="step-icon">💻</div>
            <h3 class="step-title">Desarrollo</h3>
          </div>
          <ul class="step-list">
            <li v-for="activity in currentProject.process.development.activities" :key="activity">{{ activity }}</li>
          </ul>

          <!-- Tech Stack -->
          <div class="design-details" v-if="currentProject.process.development.stack && currentProject.process.development.stack.length > 0">
            <div class="detail-group">
              <h4 class="detail-title">🛠️ Stack Tecnológico</h4>
              <div class="tech-stack">
                <div v-for="tech in currentProject.process.development.stack" :key="tech.name" class="tech-item">
                  <i :class="tech.icon"></i>
                  <span>{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Marketing Section -->
        <div class="process-step" v-if="currentProject.process.marketing && currentProject.process.marketing.length > 0">
          <div class="step-header">
            <div class="step-icon">📢</div>
            <h3 class="step-title">Marketing</h3>
          </div>
          <ul class="step-list">
            <li v-for="item in currentProject.process.marketing" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <!-- Solution Section -->
      <div class="section solution-section" v-if="currentProject && currentProject.solution">
        <h2 class="section-title">La Solución</h2>
        <div v-if="currentProject.solution.gif" class="solution-media">
          <img :src="currentProject.solution.gif" :alt="currentProject.title" class="solution-gif" />
        </div>
        <p class="section-content">{{ currentProject.solution.description }}</p>
      </div>

      <!-- Results Section -->
      <div class="section results-section" v-if="currentProject && currentProject.results && currentProject.results.length > 0">
        <h2 class="section-title">Resultados</h2>
        <div class="results-grid">
          <div v-for="result in currentProject.results" :key="result.metric" class="result-card">
            <div class="result-value">{{ result.value }}</div>
            <div class="result-metric">{{ result.metric }}</div>
          </div>
        </div>
      </div>

      <!-- Image Gallery Section -->
      <div class="section gallery-section" v-if="currentProject && currentProject.imageGallery && currentProject.imageGallery.length > 0">
        <h2 class="section-title">Galería</h2>
        <div class="image-gallery">
          <div v-for="image in currentProject.imageGallery" :key="image.url" class="gallery-item">
            <img :src="image.url" :alt="image.alt" class="gallery-image" />
            <p class="gallery-caption">{{ image.caption }}</p>
          </div>
        </div>
      </div>

      <!-- Live Project Link -->
      <div class="section cta-section" v-if="currentProject && currentProject.liveUrl">
        <a :href="currentProject.liveUrl" target="_blank" rel="noopener noreferrer" class="cta-button">
          Ver Proyecto en Vivo
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface Project {
  id: number
  title: string
  image: string
  category?: string
  client: string
  tags?: string[]
  year?: string
  description?: string
  duration?: string
  role?: string
  myRole?: string
  tools?: string
  keyAchievement?: string
  challenge?: string
  process?: any
  solution?: any
  results?: any[]
  imageGallery?: any[]
  liveUrl?: string
  type?: string
  percentage?: string
  improvement?: string
  impact?: string
  content?: string
  roles?: string[]
  industry?: string
  location?: string
  responsibilities?: string[]
  methodology?: any
  technologies?: string[]
  finalResult?: any
  achievements?: any[]
}

const currentProject = ref<Project | null>(null)

const results = [

{
    id: 1,
    title: 'Hotel Amazon B&B - Un Refugio en el Corazón del Amazonas',
    image: 'http://www.amazonbb.com/wp-content/uploads/2023/05/boat-forest-river-blue-sky-reflection.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Revitalizando la presencia online para una experiencia amazónica auténtica y atractiva para el viajero internacional.',
    client: 'Hotel Amazon B&B',
    industry: 'Hotel',
    location: 'Amazonas, Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'Amazon B&B, un encantador hotel inmerso en la exuberante selva amazónica, luchaba por conectar con su público objetivo: turistas extranjeros en busca de una experiencia única. Su sitio web existente era pesado, carente de diseño atractivo y con una usabilidad deficiente, lo que dificultaba la reserva y no reflejaba la belleza y autenticidad del lugar.',
    process: {
      research: [
        'Análisis de requisitos técnicos',
        'benchmark de sitios web de hoteles de ecoturismo',
        'Análisis de Usabilidad del Sitio Web',
        'User Flow',
        'Card Sorting',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#455D58', '#3B6317', '#9DBC79', '#EC9B30', '#2E3B48'],
        typography: [
          { name: 'EB Garamond', usage: 'Títulos y encabezados' },
          { name: 'Montserrat', usage: 'Texto y contenido' },
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
    },
    solution: {
      description: 'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
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
      { value: '+25%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
  },
  
   {
    id: 2,
    title: 'MIcentro: xxx',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288825/Hotel_Amazon_proyecto_oswal.png',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Revitalizando la presencia online para una experiencia amazónica auténtica y atractiva para el viajero internacional.',
    client: 'Hotel Amazon B&B',
    industry: 'Hotel',
    location: 'Amazonas, Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'Amazon B&B, un encantador hotel inmerso en la exuberante selva amazónica, luchaba por conectar con su público objetivo: turistas extranjeros en busca de una experiencia única. Su sitio web existente era pesado, carente de diseño atractivo y con una usabilidad deficiente, lo que dificultaba la reserva y no reflejaba la belleza y autenticidad del lugar.',
    process: {
      research: [
        'Análisis de requisitos técnicos',
        'benchmark de sitios web de hoteles de ecoturismo',
        'Análisis de Usabilidad del Sitio Web',
        'User Flow',
        'Card Sorting',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#455D58', '#3B6317', '#9DBC79', '#EC9B30', '#2E3B48'],
        typography: [
          { name: 'EB Garamond', usage: 'Títulos y encabezados' },
          { name: 'Montserrat', usage: 'Texto y contenido' },
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
    },
    solution: {
      description: 'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
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
      { value: '+25%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
  },

{
    id: 3,
    title: 'AXA Colpatria - Rediseño Estratégico de portal público',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429889/Redise%C3%B1o_AXA_oswal-proyectos.png',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Rediseño completo de la plataforma web de AXA Colpatria, elevando la experiencia de usuario e interfaz (UX/UI) a estándares de última generación, incorporando nuevas tecnologías y aplicando rigurosos principios de usabilidad y accesibilidad para optimizar la interacción de los clientes con los servicios de seguros.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: 'Colombia',
    myRole: 'Frontend Developer',
    responsibilities: ['UX /UI design'],
    challenge: 'AXA Colpatria, líder en el sector asegurador, enfrentaba el desafío de transformar su plataforma web existente en un canal digital que no solo fuera funcional, sino que realmente inspirara confianza, simplificara la compleja información de seguros y ofreciera una experiencia de usuario intuitiva y moderna. El reto era ambicioso: ir más allá de una actualización visual, enfocándose en una arquitectura de información optimizada, flujos de navegación simplificados y un diseño inclusivo',
    process: {
      research: [
        'Benchmark',
        'Análisis de Usabilidad del Sitio Web',
        'User persona',
        'User Journey Map',
        'Card Sorting',
        'Sitemap',
        'Pruebas de Usabilidad',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Integración sistema de diseño',
          'Prototipado',
          'Diseño de Iconografía y Elementos Gráficos',
          'Diseño de Microinteracciones y Estados de Componentes',
          'Diseño Responsivo y Adaptativo',
          'Aplicación de Estándares de Accesibilidad (WCAG 2.1 AA)',
        ],
        colors: ['#5C5CB7', '#3D3DAA', '#00008F', '#DD7358', '#D75D3D','#D24723','#7698CB','#41949F','#E196AA'],
        typography: [
          { name: 'Public headline', usage: 'Títulos y encabezados' },
          { name: 'Source sans pro', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu028-1_onezxr.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu078-1_xyjys5.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu016-1_idgqse.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu048-1_k4uffx.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu134-1_vlg4pa.png' }
        ],
      },
      development: { 
        activities: [],  
        stack: [],
      },
      marketing: [
        'Email-marketing',
      ],
    },
    solution: {
      description: 'Se entregó un rediseño estratégico de la plataforma web de AXA Colpatria, transformándola en una experiencia digital de seguros moderna, intuitiva e inclusiva.',
    },
    results: [
      { value: '+30%', metric: 'Aumento satisfacción del cliente' },
      { value: '+25%', metric: 'Aumento tasa conversión productos' },
      { value: '+40%', metric: 'Redireccionamiento a landing pages' },
    ],
    liveUrl: 'https://www.axacolpatria.co/home',
    imageGallery: [
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756512408/AXA_Colpatria_antes_website_ecypnb.jpg",
        alt: "Imagen resultado sitio web_AXA_COLPATRIA",
        caption: "Home AXA Colpatria_antes",
        tag: "antes" 
      },
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756511734/Proyectos_oswal_web_design_AXA_Home_page_p62gsa.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Home AXA Colpatria_Ahora",
        tag: "resultado" 
      }
    ]
  },
  
  {
    id: 4,
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757289000/plataforma_concursos.jpg',
    title: 'Quizz Interactivo para concursos: Potenciando el Estudio en Acueducto de Bogotá',
    roles: ['UX Research', 'UI Design', 'Frontend Designer'],
    keyAchievement: 'Una interfaz para que los empleados del Acueducto de Bogotá estudien y se preparen de forma autónoma para los concursos de ascenso.',
    client: 'Acueducto de Bogotá',
    industry: 'Servicios públicos',
    location: 'Bogotá, Colombia',
    myRole: 'Frontend Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Developer'],
    challenge: "El Acueducto de Bogotá buscaba una solución innovadora y accesible para apoyar a sus empleados en la preparación de los concursos de ascenso, más allá de los métodos de estudio tradicionales. El desafío era crear una herramienta digital interactiva que permitiera a los usuarios autoevaluarse en temarios específicos, gestionar su progreso y ofrecer una experiencia de estudio atractiva y efectiva, todo dentro de un entorno seguro y controlado con gestión de usuarios internos.",
    process: {
      research: [
        'User Flow',
        'Arquitectura de la Información y Sitemap',
        'Pruebas de Usabilidad'
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Adaptación y Aplicación de UI kit',
          'Diseño de elementos gráficos'
        ],
        colors: ['#4831D4', '#CCF381', '#2A2356', '#F4F9FC'],
        typography: [
          { name: 'Montserrat', usage: 'Títulos y encabezados' },
          { name: 'Inter', usage: 'Texto y contenido' },
        ],
      },
      development: {
        activities: [
          'Diseño de Microinteracciones y Animaciones JS/CSS',
          'Performance Optimization',
          'Construcción de la interfaz de usuario interactiva y dinámica utilizando Vue.js.',
          'Implementación de Seguridad Web',
          'Creación de dashboard para gestionar usuarios ',
        ],
        stack: [
          { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756246659/Proyectos_oswal_web_design_AXA_landing_vida_hlubht.gif',
      description: 'Se desarrolló una plataforma de quiz interactiva y gamificada para el Acueducto de Bogotá, diseñada específicamente para apoyar a los empleados en su preparación para concursos de ascenso. La solución incluye un sistema de gestión de usuarios, seguimiento de progreso, y una interfaz intuitiva que hace del estudio una experiencia atractiva y efectiva.',
    },
    results: [
      { value: '+85%', metric: 'Tasa de finalización del quiz' },
      { value: '+40%', metric: 'Mejora en conocimiento sobre temas específicos' },
      { value: '10,000+', metric: 'Usuarios activos en el primer mes' },
    ],
    liveUrl: 'https://quiz-acueducto.gov.co/',
  },


 {
    id: 5,
    title: 'Bunker de libros"',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288825/Landing_AX-COL_.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Creación de una landing page corporativa de alto impacto visual y optimizada para la conversión, enfocada en la captación de leads para el Seguro de Vida Deudor de AXA Colpatria.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: 'Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'AXA Colpatria necesitaba una landing page específica y altamente efectiva para promocionar su Seguro de Vida Deudor. El desafío era diseñar y desarrollar una página que no solo comunicara de forma clara los beneficios y requisitos del seguro, sino que también inspirara confianza, guiara al usuario intuitivamente, y que se pudiera integrar facilmente a un CRM.',
    process: {
      research: [
        'Análisis de Público Objetivo y Competencia',
        'User Flow',
        'Pruebas de Usabilidad',
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipos',
          'Integración sistema de diseño de la marca',
        ],
        colors: ['#5C5CB7', '#3D3DAA', '#00008F', '#DD7358', '#D75D3D','#D24723','#7698CB','#41949F','#E196AA'],
        typography: [
          { name: 'Publico Headline Web', usage: 'Títulos y encabezados' },
          { name: 'Source Sans Pro', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu028-1_onezxr.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu078-1_xyjys5.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu016-1_idgqse.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu048-1_k4uffx.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu134-1_vlg4pa.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Implementación en html, css y Javascript',
          'Desarrollo de Funcionalidades Personalizadas',
          'Diseño y configuración de iconos fuente',
          'Creación y envío de formulario',
        ],  
        stack: [
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
        'Optimización para Motores de Búsqueda (SEO)',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756246659/Proyectos_oswal_web_design_AXA_landing_vida_hlubht.gif',
      description: 'Se entregó una landing page clave para AXA Colpatria, concebida en Figma y desarrollada con código HTML, CSS y JavaScript. Esta página es totalmente responsiva y fue construida para cumplir con objetivos de negocio y marketing claros. Su diseño presenta los beneficios del Seguro de Vida Deudor de forma directa y su función principal es captar leads calificados eficientemente a través de un formulario optimizado.',
    },
    results: [
      { value: '+35%', metric: 'Tasa de Conversión de Leads' },
      { value: '-15%', metric: 'Tasa de rebote' },
    ],
    liveUrl: 'https://bunkerdelibros.shop/',
  },

{
    id: 6,
    title: 'Clínica Odontológica en Suecia',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288824/Clinica-en-suecia_olmnmu.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño Web y UX para una Experiencia Profesional y Confiable',
    client: 'kliniken Schröder',
    industry: 'Clinica dental',
    location: 'Estocolmo, Suecia',
    myRole: 'Web designer',
    responsibilities: ['Web designer'],
    challenge: 'Diseño y desarrollo de una plataforma web moderna y profesional para una clínica odontológica en Suecia, con el objetivo de proyectar confianza, facilitar el acceso a información sobre tratamientos.',
    process: {
      research: [
        'Análisis de Audiencia Sueca y Estándares de Confianza',
        'Análisis de Usabilidad del Sitio Web',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#2C2C96', '#99A833'],
        typography: [
          { name: 'Cormorant Garamond', usage: 'Títulos y encabezados' },
          { name: 'Open sans', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757437831/Blekning-icon2_oivi6k.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757437832/corona-dental-2_iljbtg.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757437832/Snarkskenor-icon2_dvnoj3.png' }
        ],
      },
      development: { 
        activities: [
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756514195/Proyectos_oswal_web_design_Tandkliniken_schroder_slkyt8.gif',
      description: 'Se entregó un sitio web profesional y minimalista para la clínica odontológica en Suecia, diseñado para ser una herramienta clave en la captación y comunicación con los pacientes. La plataforma, con un estilo estético sueco, presenta los servicios y al equipo de manera clara y transparente, estableciendo la confianza digital',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://tandklinikenlschroder.se/',
  },

  {
    id: 7,
    title: 'Bestyle - Catálogo Digital Interactivo y Venta Express',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757289224/bestyle_Web_design.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de una solución de catálogo digital ágil y moderna, permitiendo a Bestyle vender sus prendas online de forma rápida y directa a través de WhatsApp y enlaces de pago.',
    client: 'Bestyle',
    industry: 'Ropa y moda',
    location: 'Colombia',
    myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer'],
    challenge: 'Bestyle, una marca de moda con fuerte presencia en redes sociales, necesitaba trascender la venta por mensaje directo y establecer una presencia online funcional y expedita para su catálogo de prendas. El principal desafío era crear una solución digital rápida y fácil de usar que permitiera a los clientes explorar las prendas, calcular el total de su compra y finalizar el pedido de manera fluida vía WhatsApp o mediante un enlace de pago, todo ello sin la complejidad de un e-commerce tradicional.',
    process: {
      design: {
        activities: [
          'Diseño de Mockups',
          'Diseño Responsivo y Adaptativo',
          'Adaptación de Componentes de Diseño e Iconografía Genérica',
        ],
      },
      development: { 
        activities: [
          'Implementación de Funcionalidades Personalizadas',
          'Implementación de Generación de Pedido vía WhatsApp y link de pago',
          'Sistema de Búsqueda y Filtrado Dinámico (Categorías y Subcategorías)',
        ],  
        stack: [
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756247093/Proyectos_oswal_web_design_bestyle_lh9b7z.gif',
      description: 'Se desarrolló una plataforma de catálogo digital ágil y moderna para Bestyle, permitiendo a la marca realizar ventas online rápidas y directas. permite a los clientes seleccionar prendas, calcular su total y finalizar la compra enviando el pedido por WhatsApp o a través de un link de pago.',
    },
    results: [
      { value: '+20%', metric: ' Ventas Directas Online' },
      { value: '24/7', metric: 'Mayor Alcance y Disponibilidad' },
      { value: '+30%', metric: 'Productividad en gestión de consultas' },
    ],
    liveUrl: 'https://bestyle.store/',
  },
  
  {
    id: 8,
    title: 'AXA Colpatria - Landing Page "Seguro de Vida Deudor"',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288825/Landing_AX-COL_.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Creación de una landing page corporativa de alto impacto visual y optimizada para la conversión, enfocada en la captación de leads para el Seguro de Vida Deudor de AXA Colpatria.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: 'Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'AXA Colpatria necesitaba una landing page específica y altamente efectiva para promocionar su Seguro de Vida Deudor. El desafío era diseñar y desarrollar una página que no solo comunicara de forma clara los beneficios y requisitos del seguro, sino que también inspirara confianza, guiara al usuario intuitivamente, y que se pudiera integrar facilmente a un CRM.',
    process: {
      research: [
        'Análisis de Público Objetivo y Competencia',
        'User Flow',
        'Pruebas de Usabilidad',
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipos',
          'Integración sistema de diseño de la marca',
        ],
        colors: ['#5C5CB7', '#3D3DAA', '#00008F', '#DD7358', '#D75D3D','#D24723','#7698CB','#41949F','#E196AA'],
        typography: [
          { name: 'Publico Headline Web', usage: 'Títulos y encabezados' },
          { name: 'Source Sans Pro', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu028-1_onezxr.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu078-1_xyjys5.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu016-1_idgqse.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu048-1_k4uffx.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu134-1_vlg4pa.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Implementación en html, css y Javascript',
          'Desarrollo de Funcionalidades Personalizadas',
          'Diseño y configuración de iconos fuente',
          'Creación y envío de formulario',
        ],  
        stack: [
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
        'Optimización para Motores de Búsqueda (SEO)',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756246659/Proyectos_oswal_web_design_AXA_landing_vida_hlubht.gif',
      description: 'Se entregó una landing page clave para AXA Colpatria, concebida en Figma y desarrollada con código HTML, CSS y JavaScript. Esta página es totalmente responsiva y fue construida para cumplir con objetivos de negocio y marketing claros. Su diseño presenta los beneficios del Seguro de Vida Deudor de forma directa y su función principal es captar leads calificados eficientemente a través de un formulario optimizado.',
    },
    results: [
      { value: '+35%', metric: 'Tasa de Conversión de Leads' },
      { value: '-15%', metric: 'Tasa de rebote' },
    ],
    liveUrl: 'https://lpsv.netlify.app/',
  },
  
  {
    id: 9,
    title: 'BetterMe - Tu Transformación Estética en Colombia',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288824/Betterme_Ver2_bo15xy.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Web moderna y sencilla para BetterMe, facilitando a extranjeros el acceso a servicios de cirugía y procedimientos estéticos en Colombia',
    client: 'Betterme',
    industry: 'Estética y Belleza', 
    location: 'Miami, Medellín',
    myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer'],
    challenge: 'El desafío principal era construir un sitio web que no solo mostrara la gama de servicios y el equipo de especialistas, sino que también transmitiera confianza, seguridad y la propuesta de valor integral (logística, recuperación). Además, era crucial que la plataforma fuera fácilmente actualizable por el equipo de BetterMe para mantener la información de servicios y especialistas al día.',
    process: {
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipado',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#3a4183',  '#F1918C', '#E6E6F2'],
        typography: [ 
          { name: 'Manrope', usage: 'Títulos y texto contenido' },
        ],
        icons: [
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/quienes-somos.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/quienes-somos-betterme.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/facial.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/aparatologia.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/ciudades.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/medicina-estetica.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
        'Test A/B (A/B Testing)',
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249634/Proyectos_oswal_web_design_Betterme_hx48fj.gif',
      description: 'Se rediseñó un sitio web moderno y responsivo para BetterMe, construyendo la experiencia desde cero. La solución optimiza la interfaz de usuario para extranjeros interesados en procedimientos estéticos en Colombia, integra funcionalidades clave de información de servicios y facilita el contacto directo.',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Consultas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://betterme.oswal.com.co/',
  },
  {
    id: 10,
    title: 'Dedicándote: Website de Dedicatorias Musicales y Diseño Personalizado',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429234/dedicandote_proyecto_oswaldo.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de una landing page promocional y funcional para "Dedicándote", permitiendo a los usuarios elegir diseños y dedicar canciones con reproductores de música personalizados',
    client: 'Dedicandote',
    industry: 'Música', 
    location: 'Bogotá, Colombia',
    myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer','Marketing'],
    challenge: '"Dedicándote" buscaba lanzar un servicio innovador: dedicatorias musicales con diseños personalizados. El desafío era crear una presencia online atractiva y funcional que promocionara este producto único y, al mismo tiempo, facilitara el proceso de personalización de la dedicatoria, la selección de la canción, la visualización del reproductor y la gestión del pedido',
    process: {
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipado',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
      },
    },
  },
]

const goBack = () => {
  router.push('/projects')
}

onMounted(() => {
  const projectId = parseInt(route.params.id as string)
  currentProject.value = results.find(p => p.id === projectId) || null
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  background: #f8f9fa;
  position: relative;
}

.top-navigation-static {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-to-gallery-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-to-gallery-btn:hover {
  background: #34495e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

.close-button-x {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 101;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.close-button-x:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  position: relative;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.hero-background {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.hero-meta {
  display: flex;
  gap: 3rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-icon {
  margin-bottom: 0.25rem;
}

.meta-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  font-size: 1.125rem;
  font-weight: 600;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.section-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #5a6c7d;
}

.process-step {
  margin-bottom: 2.5rem;
}

.process-step:last-child {
  margin-bottom: 0;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.step-icon {
  font-size: 2rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.step-list {
  list-style: none;
  padding-left: 3.5rem;
  margin-bottom: 1.5rem;
}

.step-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.0625rem;
  color: #5a6c7d;
  line-height: 1.6;
}

.step-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #3498db;
  font-size: 1.5rem;
  line-height: 1;
}

.design-details {
  margin-top: 2rem;
  padding-left: 3.5rem;
}

.detail-group {
  margin-bottom: 2rem;
}

.detail-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.color-palette {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.color-swatch {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.typography-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.typography-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.font-name {
  font-weight: 600;
  color: #2c3e50;
}

.font-usage {
  color: #5a6c7d;
}

.graphic-elements {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.graphic-element {
  flex: 0 0 auto;
}

.graphic-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 0.5rem;
  background: white;
  transition: all 0.3s ease;
}

.graphic-image:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-weight: 500;
}

.tech-item i {
  font-size: 1.5rem;
}

.solution-media {
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
}

.solution-gif {
  width: 100%;
  height: auto;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.result-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.result-card:hover {
  transform: translateY(-4px);
}

.result-value {
  font-size: 3rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.result-metric {
  font-size: 1rem;
  color: #5a6c7d;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.gallery-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  width: 100%;
  height: auto;
}

.gallery-caption {
  padding: 1rem;
  background: white;
  text-align: center;
  color: #5a6c7d;
}

.cta-section {
  text-align: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #3498db;
  color: white;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.3);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-meta {
    flex-direction: column;
    gap: 1rem;
  }

  .section {
    padding: 2rem 1.5rem;
  }

  .step-list {
    padding-left: 1rem;
  }

  .design-details {
    padding-left: 1rem;
  }
}
</style>