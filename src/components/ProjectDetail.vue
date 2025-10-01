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
    keyAchievement: "Una interfaz para que los empleados del Acueducto de Bogotá estudien y se preparen de forma autónoma para los concursos de ascenso.",
    client: "Acueducto de Bogotá",
    industry: "Servicios públicos",
    location: "Bogotá, Colombia",
    myRole: "Frontend Designer",
    responsibilities: ["UX Research", "UI Design", "Frontend Developer"],
    challenge: "El Acueducto de Bogotá buscaba una solución innovadora y accesible para apoyar a sus empleados en la preparación de los concursos de ascenso, más allá de los métodos de estudio tradicionales. El desafío era crear una herramienta digital interactiva que permitiera a los usuarios autoevaluarse en temarios específicos, gestionar su progreso y ofrecer una experiencia de estudio atractiva y efectiva, todo dentro de un entorno seguro y controlado con gestión de usuarios internos.",
    process: {
      research: [
        "User Flow",
        "Arquitectura de la Información y Sitemap",
        "Pruebas de Usabilidad"
      ],
      design: {
        activities: [
          "Diseño de Mockups",
          "Adaptación y Aplicación de UI kit",
          "Diseño de elementos gráficos"
        ],
        colors: ["#4831D4", "#CCF381", "#2A2356", "#F4F9FC"],
        typography: [
          { name: "Montserrat", usage: "Títulos y encabezados" },
          { name: "Inter", usage: "Texto y contenido" }
        ]
      },
      development: {
        activities: [
          "Diseño de Microinteracciones y Animaciones JS/CSS",
          "Performance Optimization",
          "Construcción de la interfaz de usuario interactiva y dinámica utilizando Vue.js.",
          "Implementación de Seguridad Web",
          "Creación de dashboard para gestionar usuarios"
        ],
        stack: [
          { name: "Vue", icon: "fa-brands fa-vuejs" },
          { name: "HTML", icon: "fa-brands fa-html5" },
          { name: "CSS", icon: "fa-brands fa-css3" },
          { name: "JS", icon: "fa-brands fa-js" }
        ]
      }
    },
    solution: {
      gif: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1754408304/Proyecto_oswal_web_design_Quiz_y1nutn.gif",
      description: "Se entregó una aplicación web interactiva de quizz construida desde cero con Vue.js Esta interfaz no solo facilita el estudio personalizado por temas y la autoevaluación para los concursos de ascenso, sino que también ofrece un panel administrativo intuitivo para la gestión total de usuarios y contenido por parte del Acueducto de Bogotá."
    },
    results: [
      { value: "450", metric: "empleado se registraron y utilizan la interfaz" },
      { value: "Feedback", metric: "Recepción de comentarios positivos sobre la facilidad de uso" },
      { value: "Reducción de Tiempo", metric: " Se redujo el tiempo que los empleados dedicaban a buscar materiales de estudio." }
    ],
    liveUrl: "https://demoquizz.netlify.app/"
  },
  {
    id: 4,
    title: "Micentro - Website Centro Comercial",
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: "Desarrollo de una plataforma web integral para el centro comercial Micentro, facilitando la navegación de visitantes y la gestión de locales comerciales.",
    client: "Micentro Comercial",
    industry: "Centro Comercial",
    location: "Colombia",
    myRole: "Web designer",
    responsibilities: ["Web designer", "Frontend Developer"],
    challenge: "Micentro necesitaba una presencia digital que reflejara la diversidad de su oferta comercial y facilitara a los visitantes encontrar información sobre tiendas, servicios, eventos y promociones de manera intuitiva.",
    process: {
      design: {
        activities: [
          "Diseño de Mockups",
          "Diseño Responsivo y Adaptativo",
          "Adaptación de Componentes de Diseño e Iconografía"
        ]
      },
      development: {
        activities: [
          "Implementación de Funcionalidades Personalizadas",
          "Sistema de Búsqueda y Filtrado de Locales",
          "Integración de Mapas Interactivos"
        ],
        stack: [
          { name: "HTML", icon: "fa-brands fa-html5" },
          { name: "CSS", icon: "fa-brands fa-css3" },
          { name: "JS", icon: "fa-brands fa-js" }
        ]
      }
    },
    solution: {
      description: "Se desarrolló una plataforma web completa para Micentro que incluye directorio de tiendas, información de servicios, calendario de eventos y sistema de promociones, todo con una navegación intuitiva y diseño atractivo."
    },
    results: [
      { value: "+30%", metric: "Consultas sobre locales comerciales" },
      { value: "+20%", metric: "Participación en eventos" },
      { value: "Mayor", metric: "Visibilidad digital del centro comercial" }
    ],
    liveUrl: "https://micentro.com.co/"
  },
  {
    id: 5,
    title: "Bestyle - Catálogo Digital Interactivo y Venta Express",
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757289224/bestyle_Web_design.jpg",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: "Diseño y desarrollo de una solución de catálogo digital ágil y moderna, permitiendo a Bestyle vender sus prendas online de forma rápida y directa a través de WhatsApp y enlaces de pago.",
    client: "Bestyle",
    industry: "Ropa y moda",
    location: "Colombia",
    myRole: "Web designer",
    responsibilities: ["Web designer", "Frontend Developer"],
    challenge: "Bestyle, una marca de moda con fuerte presencia en redes sociales, necesitaba trascender la venta por mensaje directo y establecer una presencia online funcional y expedita para su catálogo de prendas. El principal desafío era crear una solución digital rápida y fácil de usar que permitiera a los clientes explorar las prendas, calcular el total de su compra y finalizar el pedido de manera fluida vía WhatsApp o mediante un enlace de pago, todo ello sin la complejidad de un e-commerce tradicional.",
    process: {
      design: {
        activities: [
          "Diseño de Mockups",
          "Diseño Responsivo y Adaptativo",
          "Adaptación de Componentes de Diseño e Iconografía Genérica"
        ]
      },
      development: {
        activities: [
          "Implementación de Funcionalidades Personalizadas",
          "Implementación de Generación de Pedido vía WhatsApp y link de pago",
          "Sistema de Búsqueda y Filtrado Dinámico (Categorías y Subcategorías)"
        ],
        stack: [
          { name: "HTML", icon: "fa-brands fa-html5" },
          { name: "CSS", icon: "fa-brands fa-css3" },
          { name: "JS", icon: "fa-brands fa-js" }
        ]
      }
    },
    solution: {
      gif: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756247093/Proyectos_oswal_web_design_bestyle_lh9b7z.gif",
      description: "Se desarrolló una plataforma de catálogo digital ágil y moderna para Bestyle, permitiendo a la marca realizar ventas online rápidas y directas. permite a los clientes seleccionar prendas, calcular su total y finalizar la compra enviando el pedido por WhatsApp o a través de un link de pago."
    },
    results: [
      { value: "+20%", metric: " Ventas Directas Online" },
      { value: "24/7", metric: "Mayor Alcance y Disponibilidad" },
      { value: "+30%", metric: "Productividad en gestión de consultas" }
    ],
    liveUrl: "https://bestyle.store/"
  },
  {
    id: 6,
    title: "Dedicándote: Website de Dedicatorias Musicales y Diseño Personalizado",
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429234/dedicandote_proyecto_oswaldo.jpg",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: 'Diseño y desarrollo de una landing page promocional y funcional para "Dedicándote", permitiendo a los usuarios elegir diseños y dedicar canciones con reproductores de música personalizados',
    client: "Dedicandote",
    industry: "Música",
    location: "Bogotá, Colombia",
    myRole: "Web designer",
    responsibilities: ["Web designer", "Frontend Developer", "Marketing"],
    challenge: '"Dedicándote" buscaba lanzar un servicio innovador: dedicatorias musicales con diseños personalizados. El desafío era crear una presencia online atractiva y funcional que promocionara este producto único y, al mismo tiempo, facilitara el proceso de personalización de la dedicatoria, la selección de la canción, la visualización del reproductor y la gestión del pedido',
    process: {
      design: {
        activities: [
          "Diseño de Mockups",
          "Prototipado",
          "Optimización y mejoramiento de UI Kit",
          "Diseño de Iconografía y Elementos Gráficos"
        ],
        colors: ["#AA50E6", "#a9f9f3", "#3969CB"],
        typography: [
          { name: "Montserrat", usage: "Títulos y texto contenido" }
        ]
      },
      development: {
        activities: [
          "Configuración hosting",
          "Construcción de Layouts y Diseño a Medida de reproductores de música",
          "Performance Optimization",
          "Mantenimiento y Actualizaciones Wordpress",
          "Desarrollo de Funcionalidades Personalizadas",
          "Implementación de Seguridad Web",
          "Implementación de Formulario"
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
      gif: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249840/Proyectos_oswal_web_design_Dedicandote_f0subc.gif",
      description: 'Se entregó una landing page promocional y transaccional para "Dedicándote", construida en WordPress, que integra reproductores de música personalizables desarrollados a medida con HTML, CSS y JavaScript. Esta plataforma, con un diseño moderno y centrado en la emoción, permite a los usuarios elegir entre diversos diseños, dedicar canciones, previsualizar su creación y gestionar el pedido con un formulario detallado, notificaciones automáticas por correo'
    },
    results: [
      { value: "5%", metric: "Tasa de Conversión de Pedidos" },
      { value: "45%", metric: "Nivel de Interacción con Reproductores" },
      { value: "70%", metric: "Reducción del Tiempo de Procesamiento de Pedidos" }
    ],
    liveUrl: "https://dedicandote.com/"
  },
  {
    id: 7,
    title: "AXA Colpatria - Rediseño Estratégico de portal público",
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429889/Redise%C3%B1o_AXA_oswal-proyectos.png",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: "Rediseño completo de la plataforma web de AXA Colpatria, elevando la experiencia de usuario e interfaz (UX/UI) a estándares de última generación, incorporando nuevas tecnologías y aplicando rigurosos principios de usabilidad y accesibilidad para optimizar la interacción de los clientes con los servicios de seguros.",
    client: "AXA COLPATRIA",
    industry: "Aseguradora",
    location: "Colombia",
    myRole: "Frontend Developer",
    responsibilities: ["UX /UI design"],
    challenge: "AXA Colpatria, líder en el sector asegurador, enfrentaba el desafío de transformar su plataforma web existente en un canal digital que no solo fuera funcional, sino que realmente inspirara confianza, simplificara la compleja información de seguros y ofreciera una experiencia de usuario intuitiva y moderna. El reto era ambicioso: ir más allá de una actualización visual, enfocándose en una arquitectura de información optimizada, flujos de navegación simplificados y un diseño inclusivo",
    process: {
      research: [
        "Benchmark",
        "Análisis de Usabilidad del Sitio Web",
        "User persona",
        "User Journey Map",
        "Card Sorting",
        "Sitemap",
        "Pruebas de Usabilidad"
      ],
      design: {
        activities: [
          "Creación de Wireframes y Diseño de Mockups",
          "Integración sistema de diseño",
          "Prototipado",
          "Diseño de Iconografía y Elementos Gráficos",
          "Diseño de Microinteracciones y Estados de Componentes",
          "Diseño Responsivo y Adaptativo",
          "Aplicación de Estándares de Accesibilidad (WCAG 2.1 AA)"
        ],
        colors: ["#5C5CB7", "#3D3DAA", "#00008F", "#DD7358", "#D75D3D", "#D24723", "#7698CB", "#41949F", "#E196AA"],
        typography: [
          { name: "Public headline", usage: "Títulos y encabezados" },
          { name: "Source sans pro", usage: "Texto y contenido" }
        ]
      },
      development: {
        activities: [],
        stack: []
      }
    },
    solution: {
      description: "Se entregó un rediseño estratégico de la plataforma web de AXA Colpatria, transformándola en una experiencia digital de seguros moderna, intuitiva e inclusiva."
    },
    results: [
      { value: "+30%", metric: "Aumento satisfacción del cliente" },
      { value: "+25%", metric: "Aumento tasa conversión productos" },
      { value: "+40%", metric: "Redireccionamiento a landing pages" }
    ],
    liveUrl: "https://www.axacolpatria.co/home",
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
    id: 8,
    title: "BetterMe - Tu Transformación Estética en Colombia",
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288824/Betterme_Ver2_bo15xy.jpg",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: "Web moderna y sencilla para BetterMe, facilitando a extranjeros el acceso a servicios de cirugía y procedimientos estéticos en Colombia",
    client: "Betterme",
    industry: "Estética y Belleza",
    location: "Miami, Medellín",
    myRole: "Web designer",
    responsibilities: ["Web designer", "Frontend Developer"],
    challenge: "El desafío principal era construir un sitio web que no solo mostrara la gama de servicios y el equipo de especialistas, sino que también transmitiera confianza, seguridad y la propuesta de valor integral (logística, recuperación). Además, era crucial que la plataforma fuera fácilmente actualizable por el equipo de BetterMe para mantener la información de servicios y especialistas al día.",
    process: {
      design: {
        activities: [
          "Diseño de Mockups",
          "Prototipado",
          "Optimización y mejoramiento de UI Kit",
          "Diseño de Iconografía y Elementos Gráficos"
        ],
        colors: ["#3a4183", "#F1918C", "#E6E6F2"],
        typography: [
          { name: "Manrope", usage: "Títulos y texto contenido" }
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
      gif: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249634/Proyectos_oswal_web_design_Betterme_hx48fj.gif",
      description: "Se rediseñó un sitio web moderno y responsivo para BetterMe, construyendo la experiencia desde cero. La solución optimiza la interfaz de usuario para extranjeros interesados en procedimientos estéticos en Colombia, integra funcionalidades clave de información de servicios y facilita el contacto directo."
    },
    results: [
      { value: "+20%", metric: "Tasa de Conversión de Consultas" },
      { value: "+25%", metric: "Volumen de consultas directas vía correo y WhatsApp" },
      { value: "+40%", metric: "Facilidad de Gestión de Contenido" }
    ],
    liveUrl: "https://betterme.oswal.com.co/"
  },
  {
    id: 9,
    title: "Clínica Odontológica en Suecia",
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288824/Clinica-en-suecia_olmnmu.jpg",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: "Diseño Web y UX para una Experiencia Profesional y Confiable",
    client: "kliniken Schröder",
    industry: "Clinica dental",
    location: "Estocolmo, Suecia",
    myRole: "Web designer",
    responsibilities: ["Web designer"],
    challenge: "Diseño y desarrollo de una plataforma web moderna y profesional para una clínica odontológica en Suecia, con el objetivo de proyectar confianza, facilitar el acceso a información sobre tratamientos.",
    process: {
      research: [
        "Análisis de Audiencia Sueca y Estándares de Confianza",
        "Análisis de Usabilidad del Sitio Web",
        "Arquitectura de la Información y Sitemap"
      ],
      design: {
        activities: [
          "Creación de Wireframes y Diseño de Mockups",
          "Optimización y mejoramiento de UI Kit",
          "Diseño de Iconografía y Elementos Gráficos"
        ],
        colors: ["#2C2C96", "#99A833"],
        typography: [
          { name: "Cormorant Garamond", usage: "Títulos y encabezados" },
          { name: "Open sans", usage: "Texto y contenido" }
        ]
      },
      development: {
        activities: [
          "Migración a hosting",
          "Construcción de Layouts y Diseño a Medida con Constructor Visual",
          "Performance Optimization",
          "Mantenimiento y Actualizaciones Wordpress"
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
      gif: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756514195/Proyectos_oswal_web_design_Tandkliniken_schroder_slkyt8.gif",
      description: "Se entregó un sitio web profesional y minimalista para la clínica odontológica en Suecia, diseñado para ser una herramienta clave en la captación y comunicación con los pacientes. La plataforma, con un estilo estético sueco, presenta los servicios y al equipo de manera clara y transparente, estableciendo la confianza digital"
    },
    results: [
      { value: "+20%", metric: "Tasa de Conversión de Reservas" },
      { value: "+25%", metric: "Volumen de consultas directas vía correo y WhatsApp" },
      { value: "+40%", metric: "Facilidad de Gestión de Contenido" }
    ],
    liveUrl: "https://tandklinikenlschroder.se/"
  },
  {
    id: 10,
    title: "Café Cumbre Real: Diseño Web, Marca de Café de Origen",
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757454819/Web_cafe_cumbre_Proyectos_Oswal.png",
    roles: ["UX Research", "UI Design", "Frontend Development"],
    keyAchievement: 'Diseño web para la marca de café molido y tostado "Café Cumbre Real", con el objetivo de establecer una presencia digital que celebre la calidad del producto y facilite su venta online.',
    client: "Café Cumbre Real",
    industry: "Venta de café",
    location: "Fusagasuga, Colombia",
    myRole: "Web designer",
    responsibilities: ["Web designer"],
    challenge: '"Café Cumbre Real" necesitaba una identidad digital que reflejara la autenticidad y el proceso artesanal de su café de origen. El desafío era crear una plataforma web que no solo funcionara como una tienda online, sino que también contara la historia detrás de cada grano. El objetivo era diseñar un sitio que generara confianza, atrajera a conocedores del café y simplificara la experiencia de compra,',
    process: {
      research: [],
      design: {
        activities: [
          "Creación de Wireframes y Diseño de Mockups",
          "Prototipado de visualizaciones",
          "Optimización y mejoramiento de UI Kit",
          "Diseño de Iconografía y Elementos Gráficos"
        ],
        colors: ["#811C25", "#1A6340"],
        typography: [
          { name: "Cormorant Garamond", usage: "Títulos y encabezados" },
          { name: "Open sans", usage: "Texto y contenido" }
        ]
      },
      development: {
        activities: [
          "Evaluación de Accesibilidad Web",
          "Migración a hosting",
          "Construcción de Layouts y Diseño a Medida con Constructor Visual",
          "Performance Optimization",
          "Mantenimiento y Actualizaciones Wordpress",
          "Desarrollo de Funcionalidades Personalizadas"
        ],
        stack: [
          { name: "Wordpress", icon: "fa-brands fa-wordpress" },
          { name: "HTML", icon: "fa-brands fa-html5" },
          { name: "CSS", icon: "fa-brands fa-css3" },
          { name: "JS", icon: "fa-brands fa-js" }
        ]
      }
    },
    solution: {
      gif: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757456367/Proyectos_oswal_record_website_cafe_cumbre_xtrwtp.gif",
      description: "Se diseño e implemento un sitio web sumerge en la historia de la marca a través de un diseño visualmente atractivo y una narrativa cuidadosamente elaborada. El resultado es un sitio web que transforma a los visitantes en clientes."
    },
    results: [
      { value: "+4%", metric: "Tasa de Conversión Inicial" },
      { value: "Mayor", metric: "Comunicación Efectiva de la Marca" },
      { value: "+15%", metric: "Volumen de consultas por WhatsApp" }
    ],
    liveUrl: "https://cafecumbrereal.com/"
  }
]

const projectId = computed(() => parseInt(route.params.id as string))
const project = computed(() => projects.find(p => p.id === projectId.value) || null)

const goBack = () => {
  router.push('/projects')
}

const previousProject = () => {
  const currentIndex = projects.findIndex(p => p.id === projectId.value)
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
  const prevProject = projects[prevIndex]
  router.push(`/project/${prevProject.id}`)
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const nextProject = () => {
  const currentIndex = projects.findIndex(p => p.id === projectId.value)
  const nextIndex = (currentIndex + 1) % projects.length
  const nextProject = projects[nextIndex]
  router.push(`/project/${nextProject.id}`)
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const viewLive = () => {
  if (project.value?.liveUrl) {
    window.open(project.value.liveUrl, '_blank')
  }
}

// Watch for route changes to scroll to top
watch(() => route.params.id, (newId) => {
  if (newId) {
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  color: #fff;
  overflow-y: auto;
}

/* Top Navigation */
.top-navigation-static {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
}

.back-to-gallery-btn {
  display: flex;
  align-items: center;
  gap: 0px;
  padding: 0;
  background: #4831D4;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.3);
  position: relative;
  overflow: hidden;
  min-height: 56px;
}

.back-to-gallery-btn span {
  padding: 1rem 1.5rem;
  display: block;
  flex-grow: 1;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.back-to-gallery-btn .arrow-icon {
  background: #CCF381;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  min-width: 56px;
  min-height: 56px;
}

.back-to-gallery-btn .arrow-icon svg {
  width: 20px;
  height: 20px;
  color: #4831D4;
  transition: transform 0.3s ease;
}

.back-to-gallery-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(72, 49, 212, 0.4);
}

.back-to-gallery-btn:hover .arrow-icon {
  background: #b8e85c;
  transform: scale(1.05);
}

.back-to-gallery-btn:hover .arrow-icon svg {
  transform: translateX(-2px);
}

/* Close Button */
.close-button-x {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.close-button-x:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 2rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.7));
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem 1rem;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #CCF381, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(204, 243, 129, 0.3);
}

.meta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(204, 243, 129, 0.2);
  border-radius: 50%;
  color: #CCF381;
}

.meta-label {
  font-size: 0.9rem;
  opacity: 0.7;
  text-transform: capitalize;
  letter-spacing: 0.1em;
}

.meta-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #CCF381;
}

/* Sections */
.section {
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #CCF381;
  text-align: center;
}

.section-content {
  font-size: 1.2rem;
  line-height: 1.8;
  opacity: 0.9;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

/* Challenge Section */
.challenge-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
  border: 1px solid rgba(204, 243, 129, 0.2);
}

/* Process Section */
.process-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
}

.process-step {
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(204, 243, 129, 0.2);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  background: rgba(204, 243, 129, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #CCF381;
  margin: 0;
}

.step-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.step-list li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  opacity: 0.9;
}

.step-list li::before {
  content: "•";
  color: #CCF381;
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Design Details */
.design-details {
  margin-top: 2rem;
}

.detail-group {
  margin-bottom: 2rem;
}

.detail-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #CCF381;
}

.color-palette {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.color-swatch {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.typography-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.typography-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.font-name {
  font-weight: 600;
  color: #CCF381;
}

.font-usage {
  opacity: 0.8;
  font-size: 0.9rem;
}

.tech-stack {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(204, 243, 129, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(204, 243, 129, 0.3);
}

.tech-item i {
  font-size: 1.2rem;
  color: #CCF381;
}

/* Solution Section */
.solution-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
  border: 1px solid rgba(204, 243, 129, 0.2);
}

.solution-content {
  text-align: center;
}

.solution-demo {
  margin-bottom: 2rem;
}

.solution-gif {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.solution-description {
  font-size: 1.1rem;
  line-height: 1.7;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
}

/* Results Section */
.results-section {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.result-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(204, 243, 129, 0.3);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.result-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #CCF381;
  margin-bottom: 0.5rem;
}

.result-metric {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.4;
}

/* Gallery */
.solution-gallery {
  margin-bottom: 2rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.gallery-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-image-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #4831D4;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.gallery-caption {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: #CCF381;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(204, 243, 129, 0.3);
}

/* Bottom Navigation */
.bottom-navigation {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 100;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  white-space: nowrap;
}

.nav-btn.primary {
  background: #4831D4;
  color: white;
  box-shadow: 0 4px 15px rgba(72, 49, 212, 0.3);
}

.nav-btn.primary:hover {
  background: #3a2aa0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.4);
}

.nav-btn.secondary {
  background: transparent;
  color: #4831D4;
  border: none;
  font-weight: 600;
}

.nav-btn.secondary:hover {
  background: rgba(72, 49, 212, 0.1);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-meta {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }

  .meta-item {
    flex-direction: column;
    text-align: center;
    padding: 0.75rem 1rem;
  }

  .section {
    padding: 2rem 0.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .process-step {
    padding: 1.5rem;
  }

  .color-palette,
  .tech-stack {
    justify-content: center;
  }

  .bottom-navigation {
    left: 1rem;
    right: 1rem;
    transform: none;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
    border-radius: 25px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .challenge-section,
  .process-section,
  .solution-section,
  .results-section {
    margin: 1
  }
}