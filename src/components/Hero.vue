<template>
  <div class="hero">
    <!-- Vertical Lines Background -->
    <div class="vertical-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div class="main-content">
      <!-- Left Content -->
      <div class="content-left">
        <!-- Background Shape -->
        <div class="background-shape"></div>

        <!-- Content -->
        <div class="content-wrapper">
          <h1 class="title">
            <!-- Updated title structure for outline and fill effect -->
            <span class="text-outline">Hola, </span> <span class="hola-soy">soy Oswal</span>
          </h1>
          <p class="subtitle">
            <!-- Accent text with animated underline -->
            <span class="accent-text">
              Bienvenido al elevador donde cada parada revela una parte de mí.
              <span class="animated-underline"></span>
            </span>
           
            <!-- Second paragraph of subtitle -->
            <span class="regular-text">Cada piso es un capítulo de mi historia y, a medida que subes, quizá descubras que quieres ser parte de la próxima.</span>
          </p>

          <!-- Portfolio Button -->
          <div class="button-wrapper">
            <button class="portfolio-button" @click="goToAbout">
              <span>Iniciar recorrido</span>
              <div class="arrow-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <a href="mailto:contact@oswal.com" class="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              contact@oswal.com
            </a>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="21.17" y1="8" x2="12" y2="8"/>
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14"/>
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content - Elevator Section -->
      <div class="elevator-section">
        <!-- Elevator Container -->
        <div class="elevator-container">
          <!-- Floor Display -->
          <div class="floor-display">
            <div class="display-screen">
              <!-- Display current floor based on demo mode or actual floor -->
              <span class="floor-number">{{ isDemo ? currentDemoFloor : currentFloor }}</span>
              <span class="floor-name">{{ isDemo ? floors.find(f => f.number === currentDemoFloor)?.name : getCurrentFloorName }}</span>
              <span v-if="direction === 'up'" class="arrow up">↑</span>
              <span v-if="direction === 'down'" class="arrow down">↓</span>
            </div>
          </div>

          <!-- Elevator Frame -->
          <div class="elevator-frame">
            <!-- Elevator Content -->
            <div class="elevator-content">
              <div class="elevator-inner">
                <!-- Side Rails -->
                <div class="elevator-rails">
                  <div class="rail left"></div>
                  <div class="rail right"></div>
                </div>

                <!-- Doors -->
                <div class="doors">
                  <!-- Door Frame -->
                  <div class="door-frame left"></div>
                  <div class="door-frame right"></div>

                  <!-- Actual Doors -->
                  <div class="door left" :class="{ open: isOpen }">
                    <div class="door-handle"></div>
                    <div class="door-lines">
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>
                  <div class="door right" :class="{ open: isOpen }">
                    <div class="door-handle"></div>
                    <div class="door-lines">
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>

                  <!-- Elevator Preview Content -->
                  <div v-if="isOpen" class="elevator-preview">
                    <div class="preview-content">
                      <div v-if="isDemo" class="demo-content">
                        <div class="demo-icon">
                          <span class="demo-floor-number">{{ currentDemoFloor }}</span>
                        </div>
                        <h3>{{ floors.find(f => f.number === currentDemoFloor)?.name }}</h3>
                        <p>{{ getCurrentFloorDescription }}</p>
                      </div>
                      <div v-else class="default-content">
                        <div class="preview-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5"/>
                            <path d="M2 12l10 5 10-5"/>
                          </svg>
                        </div>
                        <h3>Explora mi trabajo</h3>
                        <p>Descubre proyectos únicos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Elevator Controls -->
          <div class="elevator-controls">
            <div class="control-panel">
              <button
                v-for="floor in floors"
                :key="floor.number"
                @click="!isDemo ? selectFloor(floor) : null"
                :class="['floor-btn', {
                  active: isDemo ? currentDemoFloor === floor.number : currentFloor === floor.number,
                  demo: isDemo
                }]"
              >
                {{ floor.number }}
              </button>
            </div>
          </div>
        </div>

        <!-- Focus Effect -->
        <div class="focus-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

import { useRouter } from 'vue-router'

const router = useRouter()
const currentFloor = ref(1)
const isOpen = ref(false)
const direction = ref<'up' | 'down' | null>(null)

// Demo related states
const isDemo = ref(false);
const currentDemoFloor = ref(1);
const demoInterval = ref<number | null>(null);


const floors = [
  { number: 1, name: 'SobreMi', route: '/about', description: 'Conoce mi historia y experiencia' },
  { number: 2, name: 'Servicios', route: '/services', description: 'Descubre lo que puedo hacer por ti' },
  { number: 3, name: 'Proyectos', route: '/projects', description: 'Explora mi trabajo y creaciones' },
  { number: 4, name: 'Contacto', route: '/contact', description: 'Conectemos y creemos juntos' }
]

const getCurrentFloorName = computed(() => {
  const floor = floors.find(f => f.number === currentFloor.value)
  return floor ? floor.name : ''
})

const getCurrentFloorDescription = computed(() => {
  const floor = floors.find(f => f.number === currentDemoFloor.value)
  return floor ? floor.description : ''
})

const selectFloor = (floor: any) => {
  if (isDemo.value) return // No permitir clicks durante el demo

  if (currentFloor.value === floor.number) return

  direction.value = floor.number > currentFloor.value ? 'up' : 'down'
  isOpen.value = false

  setTimeout(() => {
    currentFloor.value = floor.number
    router.push(floor.route).catch(err => {
      console.warn('Error al navegar con vue-router:', err)
    })
    setTimeout(() => {
      isOpen.value = true
      direction.value = null
    }, 800)
  }, 500)
}

const startElevatorDemo = () => {
  if (isDemo.value) return

  isDemo.value = true
  currentDemoFloor.value = 1

  demoInterval.value = setInterval(() => {
    currentDemoFloor.value = currentDemoFloor.value >= 4 ? 1 : currentDemoFloor.value + 1
  }, 3000)

  // Detener el demo después de 2 ciclos completos (8 pisos * 3 segundos = 24 segundos)
  setTimeout(() => {
    if (demoInterval.value !== null) {
      clearInterval(demoInterval.value)
      demoInterval.value = null
    }
    isDemo.value = false
    currentDemoFloor.value = 1
  }, 24000)
}

const goToAbout = () => {
  if (isDemo.value) {
    if (demoInterval.value !== null) {
      clearInterval(demoInterval.value)
    }
    isDemo.value = false
  }
  router.push('/about').catch(err => {
    console.warn('Error al navegar a /about:', err)
  })
  selectFloor(floors.find(f => f.route === '/about'))
}

onMounted(() => {
  // Inicializa los elementos ocultos para la animación de entrada
  gsap.set('.title, .subtitle .accent-text, .subtitle .regular-text, .button-wrapper, .contact-info, .elevator-section', { opacity: 0, y: 30 });
  gsap.set('.animated-underline', { width: '0%' }); // Initial state for underline

  // Animación de entrada con GSAP
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to('.title', { opacity: 1, y: 0, duration: 1 }) // Título
    .to('.accent-text', { opacity: 1, y: 0, duration: 0.8, delay: -0.5 }) // "Bienvenido al elevador"
    .to('.accent-text .animated-underline', { width: '50%', duration: 0.8, delay: -0.4 }) // Underline animation
    .to('.subtitle .regular-text', { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: -0.8 }) // Rest of subtitle text
    .to('.button-wrapper', { opacity: 1, y: 0, duration: 0.8, delay: -0.5 }) // Botón
    .to('.contact-info', { opacity: 1, y: 0, duration: 0.8, delay: -0.4 }) // Contact info
    .to('.elevator-section', { opacity: 1, x: 0, duration: 1.2, delay: -1.2, onComplete: () => {
      // Abre las puertas del ascensor después de que la animación principal haya terminado
      isOpen.value = true;
      // Iniciar demo automático del elevador después de la carga inicial
      startElevatorDemo();
    }}, "<"); // El "<" hace que esta animación comience al mismo tiempo que la anterior en el timeline
});

onUnmounted(() => {
  if (demoInterval.value !== null) {
  clearInterval(demoInterval.value)
}
})
</script>

<style>
/* Importar fuente Inter para una mejor estética */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

/* Estilos generales del hero */
.hero {
    min-height: 100vh;
    background-color: #F4F9FC;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
    box-sizing: border-box;
}

/* Líneas verticales de fondo */
.vertical-lines {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: space-around;
    pointer-events: none;
}

.line {
    width: 1px;
    height: 100%;
    background-color: rgba(72, 49, 212, 0.1);
}

/* Contenido principal */
.main-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;
}

/* Sección izquierda del contenido */
.content-left {
    flex: 1;
    position: relative;
    min-width: 300px;
}

/* Forma de fondo decorativa */
.background-shape {
    position: absolute;
    width: 350px;
    height: 350px;
    background-color: #4831D4;
    opacity: 0.1;
    transform: rotate(45deg);
    top: -14px;
    left: 85px;
    border-radius: 40px;
    z-index: -1;
    animation: floatShape 6s ease-in-out infinite;
}

/* Keyframes para la animación de la forma de fondo */
@keyframes floatShape {
    0%, 100% {
        transform: translate(0, 0) rotate(45deg);
    }
    50% {
        transform: translate(20px, 15px) rotate(48deg);
    }
}

/* Título principal */
.title {
    font-size: 4rem;
    font-weight: bold;
    color: #4831D4; /* Default color, will be overridden by spans */
    margin-bottom: 1.5rem;
}

/* Estilo para "Hola, soy" (ahora con relleno) */
.hola-soy {
    font-weight: 900;
    color: #4831D4; /* Filled color for "soy Oswal" */
}

/* Estilo para el texto con contorno "Hola, " */
.text-outline {
    color: transparent;
    -webkit-text-stroke: 2px #3A27A0; /* Contorno sutil en violeta oscuro */
    text-stroke: 2px #3A27A0; /* Para compatibilidad */
    font-weight: 900;
    position: relative;
}

/* Subtítulo general */
.subtitle {
    font-size: 23px; /* Base font size for regular text in subtitle */
    color: #2d3748;
    font-weight: 500;
    max-width: 500px;
    margin-bottom: 3rem;
    line-height: 1.5;
   
}

/* Texto con acento (Bienvenido al elevador...) */
.accent-text {
    color: #404040;
    font-weight: 700;
    font-size: 34px; /* Specific font size for accent text */
    
    position: relative;
    display: inline-block; /* Needed for underline to work correctly */
}

/* Regular text within the subtitle */
.regular-text {
    font-size: 23px; /* Consistent size for the rest of the subtitle */
}



/* Envoltura del botón */
.button-wrapper {
    margin-bottom: 4rem;
    display: inline-block;
}

/* Estilos del botón de portafolio */
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
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
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

/* Información de contacto */
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

.contact-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #4831D4;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.contact-link:hover {
    color: #6A5AE0;
}

.contact-link svg {
    width: 18px;
    height: 18px;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    color: #4831D4;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: #CCF381;
}

.social-link svg {
    width: 20px;
    height: 20px;
}

/* Sección del Elevador */
.elevator-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.elevator-container {
    position: relative;
    width: 320px;
    transition: transform 0.3s ease;
}

.elevator-container:hover {
    transform: scale(1.02);
}

.floor-display {
    position: absolute;
    top: -4.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: #1a1a1a;
    padding: 4px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.display-screen {
    background: #000;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #FFD700;
    font-family: "Digital-7", monospace;
    font-size: 1.2rem;
    border: 1px solid #333;
    box-shadow:
        inset 0 0 10px rgba(255, 215, 0, 0.2),
        0 0 15px rgba(255, 215, 0, 0.1);
}

.elevator-frame {
    background: linear-gradient(145deg, #4831D4, #5D4EC7);
    padding: 1rem;
    border-radius: 1rem;
    height: 420px;
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.2),
        inset 0 2px 10px rgba(255, 255, 255, 0.1);
}

.elevator-content {
    background: #6A5AE0;
    height: calc(100% - 1rem);
    border-radius: 0.5rem;
    padding: 1rem;
    position: relative;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
}

.elevator-inner {
    background: #5D4EC7;
    height: 100%;
    border-radius: 0.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
}

.elevator-rails {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.rail {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.rail.left {
    left: 10px;
}

.rail.right {
    right: 10px;
}

.doors {
    position: absolute;
    inset: 0;
    display: flex;
}

.door-frame {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 8px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
}

.door-frame.left {
    left: 0;
}

.door-frame.right {
    right: 0;
}

.door {
    width: 50%;
    height: 100%;
    background: linear-gradient(135deg, #4831D4, #5D4EC7);
    position: relative;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.door.left {
    transform-origin: left;
    border-right: 2px solid rgba(255, 255, 255, 0.1);
}

.door.right {
    transform-origin: right;
}

.door.left.open {
    transform: translateX(-100%);
}

.door.right.open {
    transform: translateX(100%);
}

.door-handle {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.door.left .door-handle {
    right: 10px;
}

.door.right .door-handle {
    left: 10px;
}

.door-lines {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 40px;
}

.door-lines .line {
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Contenido de previsualización del elevador */
.elevator-preview {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(72, 49, 212, 0.1), rgba(106, 90, 224, 0.1));
    backdrop-filter: blur(10px);
    z-index: 1;
}

.preview-content {
    text-align: center;
    color: white;
    padding: 2rem;
}

.preview-icon {
    margin-bottom: 1rem;
    opacity: 0.8;
}

.preview-content h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.preview-content p {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* Controles del elevador */
.elevator-controls {
    position: absolute;
    bottom: -3rem;
    left: 50%;
    transform: translateX(-50%);
}

.control-panel {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.floor-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #f0f0f0;
    color: #666;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.floor-btn:hover {
    background: #4831D4;
    color: white;
    transform: scale(1.1);
}

.floor-btn.active {
    background: #4831D4;
    color: white;
    box-shadow: 0 0 15px rgba(72, 49, 212, 0.5);
    transform: scale(1.1);
}

.floor-btn.demo {
    cursor: default;
    animation: demoGlow 3s infinite;
}

@keyframes demoGlow {
    0%, 100% {
        box-shadow: 0 0 5px rgba(72, 49, 212, 0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(72, 49, 212, 0.8);
    }
}

/* Demo Content Styles */
.demo-content {
    text-align: center;
    color: white;
    animation: fadeInDemo 0.5s ease-in-out;
}

.demo-icon {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.demo-floor-number {
    font-size: 2rem;
    font-weight: bold;
    color: #CCF381;
    background: rgba(72, 49, 212, 0.8);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #CCF381;
}

.demo-content h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #CCF381;
}

.demo-content p {
    font-size: 0.9rem;
    opacity: 0.9;
    line-height: 1.4;
}

@keyframes fadeInDemo {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Efecto de enfoque */
.focus-overlay {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
        circle at center,
        rgba(72, 49, 212, 0.1) 0%,
        rgba(72, 49, 212, 0.05) 40%,
        transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
    animation: focusPulse 3s ease-in-out infinite;
}

@keyframes focusPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

/* Media Queries para Responsividad */
@media (max-width: 1024px) {
    .main-content {
        flex-direction: column;
        text-align: center;
        gap: 3rem;
    }

    .background-shape {
        display: none;
    }

    .contact-info {
        align-items: center;
    }

    .elevator-container {
        width: 280px;
    }

    .elevator-frame {
        height: 380px;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 3rem;
    }

    .subtitle {
        font-size: 20px;
    }

    .accent-text {
        font-size: 25px;
    }

    .elevator-container {
        width: 250px;
    }

    .elevator-frame {
        height: 350px;
    }

    .portfolio-button {
        font-size: 0.9rem;
    }

    .portfolio-button span {
        padding: 0.8rem 1.2rem;
    }

    .portfolio-button .arrow-icon {
        padding: 0.6rem;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 18px;
    }

    .accent-text {
        font-size: 22px;
    }

    .main-content {
        padding: 1rem;
    }

    .elevator-container {
        width: 220px;
    }

    .elevator-frame {
        height: 300px;
    }

    .control-panel {
        gap: 0.3rem;
        padding: 0.3rem;
    }

    .floor-btn {
        width: 35px;
        height: 35px;
        font-size: 0.9rem;
    }
}
</style>
