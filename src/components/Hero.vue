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
            <span class="title-stroke">Hola</span> soy Oswal
          </h1>
          <p class="subtitle">
            <span class="accent-text">Bienvenido al elevador</span> <span class="regular-text">que te llevará por cada piso de mi trabajo. Aquí no solo diseño interfaces, también construyo experiencias digitales que conectan, convierten y sorprenden.</span><br><br>
            
            <span class="regular-text">Cada proyecto es una oportunidad de transformar ideas en experiencias memorables</span>
          </p>

          <!-- Portfolio Button -->
          <div class="button-wrapper">
            <button class="portfolio-button" @click="goToAbout">
              <span>Subir al Elevador</span>
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
              web@oswal.com.co
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

      <!-- Right Content - Elevator Section (Desktop) -->
      <div class="elevator-section">
        <div class="elevator-container">
          <!-- Floor Display -->
          <div class="floor-display">
            <div class="display-screen">
              <span class="floor-number"></span>
              <span class="floor-name">Inicio</span>
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
                  <div class="door left">
                    <div class="door-handle"></div>
                    <div class="door-lines">
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>
                  <div class="door right">
                    <div class="door-handle"></div>
                    <div class="door-lines">
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>

                  <!-- Elevator Preview Content -->
                  <div class="elevator-preview">
                    <div class="preview-content">
                      <div class="preview-icon">
                        <div class="demo-floor-number centered">{{ currentDemoFloor }}</div>
                      </div>
                      <div class="demo-content">
                        <h3>{{ demoFloors[currentDemoFloor - 1]?.name }}</h3>
                        <p>{{ demoFloors[currentDemoFloor - 1]?.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Elevator Controls -->
          <div class="elevator-controls hidden-desktop">
            <div class="control-panel">
              <button 
                v-for="floor in demoFloors" 
                :key="floor.number"
                @click="setDemoFloor(floor.number)"
                :class="['floor-btn', { active: currentDemoFloor === floor.number, demo: isDemoMode }]"
              >
                {{ floor.number }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Section for Mobile -->
      <div class="profile-section-mobile">
        <div class="profile-container">
          <div class="profile-border"></div>
          <img 
            src="https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288490/Oswal_perfil_Webdesign.jpg"
            alt="Oswal Profile" 
            class="profile-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentDemoFloor = ref(1)
const isDemoMode = ref(true)
let demoInterval: number | null = null

const demoFloors = [
  {
    number: 1,
    name: 'Sobre Mí',
    description: 'Conoce mi historia y experiencia'
  },
  {
    number: 2,
    name: 'Servicios',
    description: 'Descubre lo que puedo hacer por ti'
  },
  {
    number: 3,
    name: 'Proyectos',
    description: 'Explora mi trabajo y casos de éxito'
  },
  {
    number: 4,
    name: 'Contacto',
    description: 'Conectemos y trabajemos juntos'
  }
]

const goToAbout = () => {
  router.push('/about')
}

const setDemoFloor = (floorNumber: number) => {
  currentDemoFloor.value = floorNumber
}

const startDemo = () => {
  demoInterval = setInterval(() => {
    currentDemoFloor.value = currentDemoFloor.value >= 4 ? 1 : currentDemoFloor.value + 1
  }, 3000)
}

onMounted(() => {
  startDemo()
})

onUnmounted(() => {
  if (demoInterval) {
    clearInterval(demoInterval)
  }
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background-color: #F4F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

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
}

.content-left {
  flex: 1;
  position: relative;
}

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
}

.title {
  font-size: 4rem;
  font-weight: bold;
  color: #4831D4;
  margin-bottom: 1.5rem;
}

.title-stroke {
  -webkit-text-stroke: 2px #4831D4;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.subtitle {
  font-size: 23px;
  color: #2d3748;
  font-weight: 500;
  max-width: 500px;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.accent-text {
  color: #404040;
  font-weight: 700;
  font-size: 34px;
  position: relative;
  display: inline-block;
}

.regular-text {
  font-size: 23px;
}

.button-wrapper {
  margin-bottom: 4rem;
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

/* Ocultar controles del elevador en desktop */
.hidden-desktop {
  display: none;
}

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

.demo-content {
  text-align: center;
  color: white;
  animation: fadeInDemo 0.5s ease-in-out;
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
  margin: 0 auto;
}

.demo-floor-number.centered {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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

/* Profile Section for Mobile */
.profile-section-mobile {
  display: none;
  justify-content: center;
  align-items: center;
}

.profile-container {
  width: 220px;
  height: 220px;
  position: relative;
}

.profile-border {
  position: absolute;
  inset: -15px;
  border-radius: 50%;
  background: linear-gradient(45deg, #4831D4, #CCF381);
  animation: rotate 4s linear infinite;
}

.profile-image {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 15px solid #F4F9FC;
  z-index: 1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Media Queries */
@media (max-width: 1024px) {
  .hidden-desktop {
    display: block;
  }
  
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

  .elevator-section {
    display: none;
  }

  .profile-section-mobile {
    display: flex;
  }

  .profile-container {
    width: 220px;
    height: 220px;
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

  .profile-container {
    width: 200px;
    height: 200px;
  }
}
</style>