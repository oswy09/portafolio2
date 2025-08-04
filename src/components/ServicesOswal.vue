<template>
  <!-- Agregamos una referencia al contenedor para poder escuchar su evento de scroll y pasarlo al IntersectionObserver -->
  <div ref="servicesContainer" class="services-container" :style="{ backgroundColor: backgroundColor }">
    <!-- Vertical Lines Background -->
    <div class="vertical-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!-- Animated Background Shapes -->
    <div class="animated-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Header Section -->
      <div class="header-section">
        <h1 class="main-title">
          <span class="title-word" v-for="(word, index) in titleWords" :key="index" :style="{ animationDelay: index * 0.2 + 's' }">
            {{ word }}
          </span>
        </h1>
        <p class="subtitle">Navega, curiosea, y descubre todo lo que podemos crear, desde el concepto hasta el clic final: productos digitales, funcionales y hechos para conectar.</p>
      </div>

      <!-- Services List -->
      <div class="services-list">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="service-item"
          :class="{ 'is-visible': visibleItems[service.id] }"
          :data-service-id="service.id"
        >
          <!-- Service Image -->
          <div class="service-image-container">
            <img :src="service.image" :alt="service.title" class="service-image" />
            <div class="image-overlay"></div>
          </div>

          <!-- Service Content -->
          <div class="service-content">
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>

            <!-- Service Features -->
            <div class="features-list">
              <div
                v-for="(feature, featureIndex) in service.features"
                :key="feature"
                class="feature-item"
                :style="{ animationDelay: (index * 0.3 + featureIndex * 0.1) + 's' }"
              >
                <div class="feature-dot"></div>
                <span class="feature-text">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="bottom-section" :class="{ 'is-visible': isBottomSectionVisible }">
        <div class="contact-cta">
          <h2>¿Listo para comenzar tu proyecto?</h2>
          <p>Conversemos sobre cómo puedo ayudarte a alcanzar tus objetivos digitales</p>
          <div class="button-wrapper">
            <button class="portfolio-button" @click="goToWhatsapp">
              <span>Contactarme</span>
              <div class="arrow-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floor Buttons -->
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

    <!-- Close Button -->
    <router-link to="/" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const servicesContainer = ref(null); // Referencia al contenedor principal
const currentFloor = ref(2);
const backgroundColor = ref('#F5F5F5'); // Color de inicio: gris muy suave
const visibleItems = ref({});
const isBottomSectionVisible = ref(false);

const titleWords = ['¿Buscas algo?', 'Estás en el piso', 'correcto.'];

const sections = [
  { floor: 1, name: 'SobreMi', route: '/about' },
  { floor: 2, name: 'Servicios', route: '/services' },
  { floor: 3, name: 'Proyectos', route: '/projects' },
  { floor: 4, name: 'Contacto', route: '/contact' }
];

const services = [
  {
    id: 1,
    title: 'Exploración',
    image: 'https://oswal.com.co/wp-content/uploads/2025/07/design-full.jpg',
    description: 'Antes de diseñar, se entiende y se planea. Esta fase se basa en descubrir insights clave del usuario y del negocio, combinando herramientas de UX Research con fundamentos de marketing estratégico y construcción de marca. Aquí se define la esencia del proyecto digital, alineando propósito, posicionamiento y experiencia deseada.',
    features: [
      'Investigación de usuarios y contexto',
      'Benchmarking / Analisis mercado',
      'Propuesta de valor y diferenciación',
      'Arquetipo de cliente',
      'Arquitectura de la Información/Sitemap',
      'User Journey Map',
      'Pruebas de Usabilidad',
      'Card Sorting, Tree Testing'
    ]
  },
  {
    id: 2,
    title: 'Diseño con Propósito',
    image: 'https://oswal.com.co/wp-content/uploads/2025/04/web-D.jpg',
    description: 'Donde la estrategia toma forma visual. Creación de interfaces intuitivas, atractivas y alineadas con la marca, siempre pensando en la experiencia del usuario y la conversión.',
    features: [
      'Creación de Wireframes ',
      'Diseño de Mockups',
      'ui kit , guia de estilo, sistema diseño',
      'Diseño de Iconografía y Elementos Gráficos',
      'Creación de Prototipos',
      'Pruebas de usabilidad',
      'Diseño de interacción',
      'Ilustración digital para interfaces'
    ]
  },
  {
    id: 3,
    title: 'Manos a la Web ',
    image: 'https://oswal.com.co/wp-content/uploads/2025/06/22-may-2025-15_50_45.png',
    description: 'Del prototipo a la realidad. Desarrollo web enfocado en rendimiento, accesibilidad, velocidad y usabilidad. Lo visual se convierte en funcional.',
    features: [
      'Maquetación con HTML-CSS',
      'Integración de frameworks CSS (Tailwind, Bootstrap)',
      'Implementación WordPress, Woocomerce,strapi',
      'frameworks modernos: Vue.js, Astro',
      'Componentes UI, Vuetify,Quasar,Headless UI ',
      'Animaciones web con CSS, GSAP, Anime.js',
      'Optimización SEO técnico (estructura, velocidad, metadatos)',
      'Optimización web'
    ]
  },
  {
    id: 4,
    title: 'Crecimiento',
    image: 'https://oswal.com.co/wp-content/uploads/2025/07/happyf.jpg',
    description: 'La web ya está viva. Ahora toca atraer, convertir y crecer. Estrategias de marketing digital, automatización, que potencien la visibilidad optimizan el rendimiento y convierten',
    features: [
      'Analítica Web y Herramientas de Monitoreo',
      'Estrategias de Adquisición de Tráfico',
      'Optimización SEO',
      'Captación de leads y conversión',
      'Email Marketing',
      'Actualizaciones web',
      'Automatización'
    ]
  }
];

const goToFloor = (section) => {
  router.push(section.route);
};

const goToWhatsapp = () => {
  window.open('https://wa.me/yourphonenumber', '_blank');
};

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

const interpolateColor = (color1, color2, factor) => {
  const result = color1.map((c, i) =>
    Math.round(c + (color2[i] - c) * factor)
  );
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
};

// Lógica para el cambio de color de fondo con una transición de múltiples colores
const handleScroll = () => {
  const container = servicesContainer.value;
  if (!container) return;

  const scrollPosition = container.scrollTop;
  const maxScroll = container.scrollHeight - container.clientHeight;
  const scrollPercentage = Math.min(1, scrollPosition / maxScroll);

  // Paleta de colores para la transición
  const colors = ['#F5F5F5', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F5F5F5']; // Gris, Azul, Verde, Naranja, y de vuelta a Gris
  const totalSteps = colors.length - 1;

  // Calculamos en qué paso de la transición estamos
  const stepIndex = Math.floor(scrollPercentage * totalSteps);

  // Normalizamos el progreso dentro del paso actual
  const stepProgress = (scrollPercentage * totalSteps) - stepIndex;

  const startColor = hexToRgb(colors[stepIndex]);
  const endColor = hexToRgb(colors[Math.min(stepIndex + 1, totalSteps)]);

  backgroundColor.value = interpolateColor(startColor, endColor, stepProgress);
};

// Lógica para la animación de los elementos al hacer scroll
const setupIntersectionObserver = () => {
  const container = servicesContainer.value;
  if (!container) return;

  // El observer ahora usa el contenedor como su "root"
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('service-item')) {
          // Usamos getAttribute para leer el ID que ahora está en el template
          const id = parseInt(entry.target.getAttribute('data-service-id'));
          visibleItems.value[id] = true;
        }
        if (entry.target.classList.contains('bottom-section')) {
          isBottomSectionVisible.value = true;
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: container, // Aquí se pasa el contenedor como root
    rootMargin: '0px',
    threshold: 0.1 // El elemento es visible en un 10%
  });

  document.querySelectorAll('.service-item').forEach(item => {
    const serviceId = item.getAttribute('data-service-id');
    visibleItems.value[serviceId] = false;
    observer.observe(item);
  });

  const bottomSection = document.querySelector('.bottom-section');
  if (bottomSection) {
    observer.observe(bottomSection);
  }
};


onMounted(() => {
  if (servicesContainer.value) {
    servicesContainer.value.addEventListener('scroll', handleScroll);
    setupIntersectionObserver();
  }
});

onUnmounted(() => {
  if (servicesContainer.value) {
    servicesContainer.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.services-container {
  min-height: 100vh;
  position: relative;
  background: #F5F5F5;
  color: #333;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-y: auto; /* El contenedor es el que tiene el scroll */
  height: 100vh;
  transition: background-color 1s ease-out;
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

/* Animated Background Shapes */
.animated-shapes {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: floatShape 20s infinite linear;
}

.shape-1 {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #4831D4, #CCF381);
  top: 10%;
  left: 5%;
  animation-duration: 25s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #CCF381, #4831D4);
  top: 60%;
  right: 10%;
  animation-duration: 30s;
  animation-direction: reverse;
}

.shape-3 {
  width: 80px;
  height: 80px;
  background: linear-gradient(225deg, #4831D4, #6A5AE0);
  top: 30%;
  left: 80%;
  animation-duration: 22s;
  border-radius: 30%;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: linear-gradient(315deg, #CCF381, #4831D4);
  bottom: 20%;
  left: 15%;
  animation-duration: 28s;
  animation-direction: reverse;
  border-radius: 20%;
}

.shape-5 {
  width: 60px;
  height: 60px;
  background: linear-gradient(90deg, #6A5AE0, #CCF381);
  top: 80%;
  right: 30%;
  animation-duration: 18s;
}

.shape-6 {
  width: 200px;
  height: 200px;
  background: linear-gradient(180deg, #4831D4, #CCF381);
  top: 5%;
  right: 5%;
  animation-duration: 35s;
  opacity: 0.05;
  border-radius: 40%;
}

@keyframes floatShape {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(0px) rotate(180deg);
  }
  75% {
    transform: translateY(20px) rotate(270deg);
  }
  100% {
    transform: translateY(0px) rotate(360deg);
  }
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 2;
  padding: 2rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 2rem;
}

.main-title {
  font-size: 80px; /* Tamaño del título principal */
  font-weight: 800;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  line-height: 1; /* Ajuste para el espaciado entre líneas */
}

.title-word {
  display: inline-block;
  color: #4831D4;
  animation: slideInUp 0.8s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  font-size: 1.5rem; /* Tamaño de la subtítulo */
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Services List */
.services-list {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.service-item, .bottom-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.service-item.is-visible, .bottom-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.service-item {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: #ffffff;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.service-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(72, 49, 212, 0.15);
}

/* Alternate layout for even items */
.service-item:nth-child(even) {
  flex-direction: row-reverse;
}

/* Service Image */
.service-image-container {
  position: relative;
  width: 300px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(72, 49, 212, 0.3);
  flex-shrink: 0;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.service-item:hover .service-image {
  transform: scale(1.05);
}

/* Service Content */
.service-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.service-title {
  font-size: 2rem;
  font-weight: 700;
  color: #4831D4;
  margin: 0;
}

.service-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Features List */
.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: featureAppear 0.6s ease-out;
}

@keyframes featureAppear {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.feature-dot {
  width: 8px;
  height: 8px;
  background: #CCF381;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(204, 243, 129, 0.5);
}

.feature-text {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}

/* Service Actions - Removido el botón de contacto de las tarjetas de servicio */
.service-actions {
  display: none;
}

/* Bottom Section */
.bottom-section {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.contact-cta h2 {
  font-size: 2rem;
  color: #4831D4;
  margin-bottom: 1rem;
}

.contact-cta p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Botones de Contacto (manteniendo solo el del footer) */
.button-wrapper {
  margin-bottom: 0;
  display: inline-block;
}

.portfolio-button {
  background: #4831D4;
  color: #fff;
  border: 1px solid #4831D4;
  padding: 0px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, color 0.3s ease;
  border-radius: 5px;
}

.portfolio-button span {
  padding: 1rem 1.5rem;
  display: block;
  flex-grow: 1;
}

.portfolio-button .arrow-icon {
  background: #CCF381;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.portfolio-button .arrow-icon svg {
  width: 20px;
  height: 20px;
  color: #4831D4;
}

.portfolio-button:hover {
  transform: translateY(-3px);
}

.portfolio-button:hover .arrow-icon {
  background: #c0e872;
}

.portfolio-button:hover .arrow-icon svg {
  transform: rotate(45deg);
}


/* Floor Buttons */
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

/* Responsive Design */
@media (max-width: 1024px) {
  .service-item {
    flex-direction: column !important;
    text-align: center;
    gap: 2rem;
  }
  
  .service-image-container {
    width: 100%;
    max-width: 400px;
    height: 250px;
  }
  
  .floor-buttons {
    right: 1rem;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }

  .service-item {
    padding: 2rem;
  }
  
  .content-wrapper {
    padding: 1rem;
  }
  
  .service-actions {
    justify-content: center;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .service-item {
    padding: 1.5rem;
  }
  
  .service-title {
    font-size: 1.5rem;
  }
  
  .contact-cta h2 {
    font-size: 1.5rem;
  }
}
</style>
