<template>
  <div class="project-detail">
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

      <!-- Project Image -->
      <div class="project-image-container">
        <img :src="project?.image" :alt="project?.title" class="project-image" />
      </div>

      <!-- Project Details -->
      <div class="project-details">
        <div class="details-grid">
          <!-- Client Info -->
          <div class="detail-card">
            <h3>Cliente</h3>
            <p>{{ project?.client }}</p>
          </div>

          <!-- Duration -->
          <div class="detail-card">
            <h3>Duración</h3>
            <p>{{ project?.duration || '2-3 meses' }}</p>
          </div>

          <!-- Role -->
          <div class="detail-card">
            <h3>Mi Rol</h3>
            <p>{{ project?.role || 'Diseño UX/UI & Desarrollo' }}</p>
          </div>

          <!-- Tools -->
          <div class="detail-card">
            <h3>Herramientas</h3>
            <p>{{ project?.tools || 'Figma, Vue.js, CSS' }}</p>
          </div>
        </div>
      </div>

      <!-- Project Process -->
      <div class="project-process">
        <h2>Proceso de Desarrollo</h2>
        <div class="process-steps">
          <div v-for="(step, index) in processSteps" :key="index" class="process-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

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
    <div v-if="project && project.results" class="section results-section">
      <h2 class="section-title">Resultados del Proyecto</h2>
      <!-- Results Cards -->
      <div class="results-cards">
        <div class="result-card" v-for="(result, idx) in project.results" :key="idx">
          <div class="result-content">
            <div class="result-number">{{ result.value || result.metric }}</div>
            <div class="result-label">{{ result.metric }}</div>
          </div>
        </div>
      </div>
      <!-- Navigation -->
      <div class="project-navigation">
        <button @click="goBack" class="nav-button secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver a Proyectos
        </button>
        <button @click="nextProject" class="nav-button primary">
          Siguiente Proyecto
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface Project {
  id: number
  title: string
  image: string
  category: string
  client: string
  tags: string[]
  year: string
  description: string
  duration?: string
  role?: string
  tools?: string
}

interface ProcessStep {
  title: string
  description: string
}

interface Result {
  id: number
  icon: string
  label: string
  description: string
}

const project = ref<Project | null>(null)

const projects: Project[] = [
  { 
    id: 1, 
    title: "Quizz Interactivo", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757370425/Quizz_website_proyectos_Oswal.png", 
    category: "Interfaz Interactiva",
    client: "Acueducto Bogotá",
    tags: ["Vue.js", "Interactive", "Gaming", "UX/UI"],
    year: "2024",
    description: "Una experiencia interactiva gamificada para educar sobre el uso responsable del agua, combinando elementos de juego con información educativa.",
    duration: "3 meses",
    role: "UX/UI Designer & Frontend Developer",
    tools: "Figma, Vue.js, GSAP, CSS3"
  },
  { 
    id: 2, 
    title: "Website Hotel", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359521/Hotel_Amazon_proyecto_oswal.png", 
    category: "Website Corporativo",
    client: "Hotel Amazon",
    tags: ["Hospitality", "Booking", "Responsive", "CMS"],
    year: "2024",
    description: "Sitio web completo para hotel boutique con sistema de reservas integrado y experiencia de usuario optimizada para conversión.",
    duration: "4 meses",
    role: "Web Designer & Developer",
    tools: "WordPress, Elementor, CSS3, JavaScript"
  },
  { 
    id: 3, 
    title: "Website Centro Comercial", 
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png", 
    category: "E-commerce",
    client: "Micentro Comercial",
    tags: ["Shopping", "Directory", "Catalog", "Payment"],
    year: "2024",
    description: "Plataforma digital para centro comercial con directorio de tiendas, promociones y sistema de navegación interior.",
    duration: "5 meses",
    role: "UX/UI Designer & Full Stack Developer",
    tools: "Vue.js, Node.js, MongoDB, Stripe"
  }
]

const processSteps: ProcessStep[] = [
  {
    title: "Investigación y Análisis",
    description: "Análisis del mercado, usuarios objetivo y competencia para definir la estrategia del proyecto."
  },
  {
    title: "Diseño UX/UI",
    description: "Creación de wireframes, prototipos y diseño visual siguiendo las mejores prácticas de usabilidad."
  },
  {
    title: "Desarrollo",
    description: "Implementación del diseño usando tecnologías modernas y optimización para rendimiento."
  },
  {
    title: "Testing y Optimización",
    description: "Pruebas de usabilidad, corrección de errores y optimización final antes del lanzamiento."
  }
]

const results: Result[] = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757289000/plataforma_concursos.jpg',
    title: 'Quizz Interactivo para concursos: Potenciando el Estudio del Acueducto de Bogotá',
    roles: ['UX Research', 'UI Design', 'Frontend Designer'],
    keyAchievement:
      'Una interfaz para que los empleados del Acueducto de Bogotá estudien y se preparen de forma autónoma para los concursos de ascenso.',
    client: 'Acueducto de Bogotá',
    industry: 'Servicios públicos',
    location: 'Bogotá, Colombia',
    myRole: 'Frontend Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Developer'],
    challenge:
      "El Acueducto de Bogotá buscaba una solución innovadora y accesible para apoyar a sus empleados en la preparación de los concursos de ascenso, más allá de los métodos de estudio tradicionales. El desafío era crear una herramienta digital interactiva que permitiera a los usuarios autoevaluarse en temarios específicos, gestionar su progreso y ofrecer una experiencia de estudio atractiva y efectiva, todo dentro de un entorno seguro y controlado con gestión de usuarios internos.",
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
        icons: [
        
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
          { name: 'Vue', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1754408304/Proyecto_oswal_web_design_Quiz_y1nutn.gif',
      description:
        'Se entregó una aplicación web interactiva de quizz construida desde cero con Vue.js Esta interfaz no solo facilita el estudio personalizado por temas y la autoevaluación para los concursos de ascenso, sino que también ofrece un panel administrativo intuitivo para la gestión total de usuarios y contenido por parte del Acueducto de Bogotá.',
    },
    results: [
      { value: '450', metric: 'empleado se registraron y utilizan la interfaz' },
      { value: 'Feedback', metric: 'Recepción de comentarios positivos sobre la facilidad de uso' },
      { value: 'Reducción de Tiempo', metric: ' Se redujo el tiempo que los empleados dedicaban a buscar materiales de estudio.' },
    ],
    liveUrl: 'https://demoquizz.netlify.app/',
   
    imageGallery: [
  
     
    ]

  },
  {
    id: 2,
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
        icons: [
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/Amazon-01.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete5-dia6.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete5-dia1.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete4-dia4.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/paquete4-dia3.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/05/Package1-dia2-.png' }
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
      gif: '',
      description:
        'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
    },
    results: [
      { value: '+25%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
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
     
    ]
  

  },
  {
    id: 3,
    icon: "📱",
    label: "Diseño Responsive",
    description: "100% compatible con dispositivos móviles y tablets."
  },
  {
    id: 4,
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
      description:
        'Se entregó una landing page clave para AXA Colpatria, concebida en Figma y desarrollada con código HTML, CSS y JavaScript. Esta página es totalmente responsiva y fue construida para cumplir con objetivos de negocio y marketing claros. Su diseño presenta los beneficios del Seguro de Vida Deudor de forma directa y su función principal es captar leads calificados eficientemente a través de un formulario optimizado.',
    },
    results: [
      { value: '+35%', metric: 'Tasa de Conversión de Leads' },
      { value: '-15%', metric: 'Tasa de rebote' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
  },
  {
    id: 5,
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
      research: [
       
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Diseño Responsivo y Adaptativo',
          'Adaptación de Componentes de Diseño e Iconografía Genérica',
           
        ],
        colors: [ ],
        typography: [
           
        ],
        icons: [
           
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
    id: 6,
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
      research: [
        
      ],
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
      description:
        'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://betterme.oswal.com.co/',
  },
  {
    id: 7,
    title: 'Dedicándote: Website de Dedicatorias Musicales y Diseño Personalizado',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429234/dedicandote_proyecto_oswaldo.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de una landing page promocional y funcional para "Dedicándote", permitiendo a los usuarios elegir diseños y dedicar canciones con reproductores de música personalizados',
    client: 'Dedicandote',
    industry: 'Músic', 
    location: 'Bogotá, Colombia',
  myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer','Marketing'],
    challenge: '"Dedicándote" buscaba lanzar un servicio innovador: dedicatorias musicales con diseños personalizados. El desafío era crear una presencia online atractiva y funcional que promocionara este producto único y, al mismo tiempo, facilitara el proceso de personalización de la dedicatoria, la selección de la canción, la visualización del reproductor y la gestión del pedido',
    process: {
      research: [
       
      ],
      design: {
        activities: [
        'Diseño de Mockups',
          'Prototipado',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#AA50E6', '#a9f9f3', '#3969CB'],
        typography: [
          { name: 'Montserrat', usage: 'Títulos y texto contenido' },
          
        ],
        icons: [

          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-song-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-play-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-get-quote-60.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-image-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/arco-iris.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/rayo.png' },
 
        ],
      },
      development: { 
        activities: [
          'Configuración hosting',
         'Construcción de Layouts y Diseño a Medida de reproductores de música',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
          'Implementación de Formulario',
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
        'Configuración Google Analytics y Google Search Console',
        'Estrategias de Adquisición de Tráfico',
        'Automatización flujo de venta',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249840/Proyectos_oswal_web_design_Dedicandote_f0subc.gif',
      description:
        'Se entregó una landing page promocional y transaccional para "Dedicándote", construida en WordPress, que integra reproductores de música personalizables desarrollados a medida con HTML, CSS y JavaScript. Esta plataforma, con un diseño moderno y centrado en la emoción, permite a los usuarios elegir entre diversos diseños, dedicar canciones, previsualizar su creación y gestionar el pedido con un formulario detallado, notificaciones automáticas por correo',
    },
    results: [
      { value: '5%', metric: 'Tasa de Conversión de Pedidos' },
      { value: '45%', metric: 'Nivel de Interacción con Reproductores' },
      { value: '70%', metric: 'Reducción del Tiempo de Procesamiento de Pedidos' },
    ],
    liveUrl: 'https://www.amazonbb.com/',
  },
  {
    id: 8,
    title: 'AXA Colpatria - Rediseño Estratégico de portal público',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429889/Redise%C3%B1o_AXA_oswal-proyectos.png',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Rediseño completo de la plataforma web de AXA Colpatria, elevando la experiencia de usuario e interfaz (UX/UI) a estándares de última generación, incorporando nuevas tecnologías y aplicando rigurosos principios de usabilidad y accesibilidad para optimizar la interacción de los clientes con los servicios de seguros.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: ' Colombia',
    myRole: 'Frontend Developer',
    responsibilities: ['UX /UI design'],
    challenge: 'AXA Colpatria, líder en el sector asegurador, enfrentaba el desafío de transformar su plataforma web existente en un canal digital que no solo fuera funcional, sino que realmente inspirara confianza, simplificara la compleja información de seguros y ofreciera una experiencia de usuario intuitiva y moderna. El reto era ambicioso: ir más allá de una actualización visual, enfocándose en una arquitectura de información optimizada, flujos de navegación simplificados y un diseño inclusivo',
    process: {
      research: [
         
        'Benchmark ',
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
        activities: [
        
        ],  
        stack: [
         
        ],
      },
      marketing: [
       'Email-marketing',
      ],
    },
    solution: {
      gif: '',
      description:
        'Se entregó un rediseño estratégico de la plataforma web de AXA Colpatria, transformándola en una experiencia digital de seguros moderna, intuitiva e inclusiva.',
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
    id: 9,
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
      marketing: [
  
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756514195/Proyectos_oswal_web_design_Tandkliniken_schroder_slkyt8.gif',
      description:
        'Se entregó un sitio web profesional y minimalista para la clínica odontológica en Suecia, diseñado para ser una herramienta clave en la captación y comunicación con los pacientes. La plataforma, con un estilo estético sueco, presenta los servicios y al equipo de manera clara y transparente, estableciendo la confianza digital',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://tandklinikenlschroder.se/',
  },
  {
    id: 10,
    title: 'Café Cumbre Real: Diseño Web de Marca de Café de Origen',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757454819/Web_cafe_cumbre_Proyectos_Oswal.png',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño web para la marca de café molido y tostado "Café Cumbre Real", con el objetivo de establecer una presencia digital que celebre la calidad del producto y facilite su venta online.',
    client: 'Café Cumbre Real',
    industry: 'Venta de café',
    location: 'Fusagasuga, Colombia',
    myRole: 'Web designer',
    responsibilities: ['Web designer'],
    challenge: ' "Café Cumbre Real" necesitaba una identidad digital que reflejara la autenticidad y el proceso artesanal de su café de origen. El desafío era crear una plataforma web que no solo funcionara como una tienda online, sino que también contara la historia detrás de cada grano. El objetivo era diseñar un sitio que generara confianza, atrajera a conocedores del café y simplificara la experiencia de compra,',
    process: {
      research: [
        
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#811C25', '#1A6340'],
        typography: [
          { name: 'Cormorant Garamond', usage: 'Títulos y encabezados' },
          { name: 'Open sans', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/taza-1.png' },
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/cultivo-granos-de-cafe-.png' },
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/proceso-lavar.png' },
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/ubicacion.png' }
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
       
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
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
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757456367/Proyectos_oswal_record_website_cafe_cumbre_xtrwtp.gif',
      description:
        'Se diseño e implemento un  sitio web sumerge en la historia de la marca a través de un diseño visualmente atractivo y una narrativa cuidadosamente elaborada. El resultado es un sitio web que transforma a los visitantes en clientes.',
    },
    results: [
      { value: '+4%', metric: 'Tasa de Conversión Inicial ' },
      { value: 'Mayor', metric: 'Comunicación Efectiva de la Marca ' },
      { value: '+15%', metric: 'Volumen de consultas por WhatsApp' },
    ],
    liveUrl: 'https://cafecumbrereal.com/',

  }
]

const projectId = computed(() => parseInt(route.params.id as string))

const goBack = () => {
  router.push('/projects')
}

const nextProject = () => {
  const currentIndex = projects.findIndex(p => p.id === projectId.value)
  const nextIndex = (currentIndex + 1) % projects.length
  const nextId = projects[nextIndex].id
  router.push(`/project/${nextId}`)
}

onMounted(() => {
  project.value = projects.find(p => p.id === projectId.value) || null
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: #F4F9FC;
  overflow-y: auto;
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
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
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
  padding: 4rem 2rem 2rem;
}

/* Project Header */
.project-header {
  text-align: center;

  padding: 0.5rem 1rem;
  background: rgba(72, 49, 212, 0.1);
  border-radius: 20px;
  background-attachment: fixed;
  border: 1px solid rgba(72, 49, 212, 0.2);
}

.hero-content {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 2.5rem 2.5rem 2.5rem 2.5rem;
  background: linear-gradient(to top, rgba(26, 26, 46, 0.65) 70%, transparent 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  border-bottom-left-radius:
  
  7/ 1rem;
  border-bottom-right-radius: 1rem;
  box-sizing: border-box;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #CCF381);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleReveal 0.8s ease forwards;
}

.roles {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease forwards 0.2s;
  opacity: 0;
}

.role {
  background: rgba(72, 49, 212, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  border: 1px solid rgba(204, 243, 129, 0.3);
  transition: all 0.3s ease;
}

.role:hover {
  background: rgba(72, 49, 212, 0.5);
  border-color: #CCF381;
}

.achievement {
  font-size: 1.5rem;
  max-width: 800px;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease forwards 0.4s;
  opacity: 0;
  color: rgba(255, 255, 255, 0.9);
}

.section {
  margin-bottom: 6rem;
  animation: fadeIn 0.8s ease forwards;
}

.section-title {
  font-size: 2.5rem;
  color: #CCF381;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60%;
  height: 3px;
  background: linear-gradient(to right, #4831D4, transparent);
}

.client-section {
  margin-bottom: 4rem;
}

.project-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.project-category,
.project-year {
  background: rgba(72, 49, 212, 0.1);
  color: #4831D4;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.project-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #4831D4;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.project-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-tag {
  background: #4831D4;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Project Image */
.project-image-container {
  margin-bottom: 4rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Project Details */
.project-details {
  margin-bottom: 4rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.detail-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.detail-card h3 {
  color: #4831D4;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.detail-card p {
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

/* Project Process */
.project-process {
  margin-bottom: 4rem;
}

.project-process h2 {
  font-size: 2.5rem;
  color: #4831D4;
  text-align: center;
  margin-bottom: 3rem;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 50px;
  height: 50px;
  background: #4831D4;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-content h4 {
  color: #4831D4;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #666;
  line-height: 1.6;
}

/* Project Results */
.project-results {
  margin-bottom: 4rem;
}

.project-results h2 {
  font-size: 2.5rem;
  color: #4831D4;
  text-align: center;
  margin-bottom: 3rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.result-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.result-card h4 {
  color: #4831D4;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.result-card p {
  color: #666;
  line-height: 1.5;
}

/* Project Navigation */
.project-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(72, 49, 212, 0.1);
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.nav-button.primary {
  background: #4831D4;
  color: white;
}

.nav-button.primary:hover {
  background: #3a2aa0;
  transform: translateY(-2px);
}

.nav-button.secondary {
  background: transparent;
  color: #4831D4;
  border: 2px solid #4831D4;
}

.nav-button.secondary:hover {
  background: #4831D4;
  color: white;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-title {
    font-size: 2.5rem;
  }
  
  .project-meta {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .process-step {
    flex-direction: column;
    text-align: center;
  }
  
  .project-navigation {
    flex-direction: column;
  }
  
  .content-wrapper {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 2rem;
  }
  
  .project-description {
    font-size: 1rem;
  }
  
  .details-grid,
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>