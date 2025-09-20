<template>
  <div class="scene">
    <!-- Vertical Lines Background -->
    <div class="vertical-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!-- Floor (only shown during elevator animation) -->
    <div v-if="showElevator" class="floor" id="floor">
      <div class="lines"></div>
      <div class="diagonal-lines"></div>
      <div class="perspective-lines">
        <div v-for="n in 15" :key="n" class="perspective-line"></div>
      </div>
      <div class="horizontal-lines">
        <div v-for="n in 10" :key="n" class="horizontal-line"></div>
      </div>
      <div class="overlay"></div>
    </div>

    <!-- Close Button -->
    <router-link to="/" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <!-- Elevator Section -->
    <Transition name="fade">
      <div v-if="showElevator" class="elevator-container">
        <!-- Elevator -->
        <div class="elevator" :class="{ 'is-moving': isMoving }">
          <!-- Floor Display -->
          <div class="floor-display">
            <div class="display-screen">
              <span class="floor-number">{{ currentFloor }}</span>
              <span class="floor-name">{{ getCurrentFloorName }}</span>
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

                  <!-- Floor Title (shows when doors are open) -->
                  <Transition name="fade">
                    <div v-if="isOpen && showFloorTitle" class="floor-title">
                      <div class="title-content">
                        <h1>{{ getCurrentFloorName }}</h1>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Content Sections -->
    <Transition name="fade">
      <div v-if="showContent" class="content-section">
        <div v-if="currentFloor === 1" class="about-section section-content">
          <AboutMe />
        </div>
        <div v-if="currentFloor === 2" class="services-section section-content">
          <ServicesOswal />
        </div>
        <div v-if="currentFloor === 3" class="projects-section">
          <Projects />
        </div>
        <div v-if="currentFloor === 4" class="contact-section section-content">
          <Contact />
        </div>
      </div>
    </Transition>

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

    <!-- Animated Cat -->
    <Transition name="fade">
      <div v-if="showCat" class="cat-container">
        <DotLottieVue 
          class="cat-animation"
          autoplay 
          loop 
          src="https://res.cloudinary.com/ddqbnr9vo/raw/upload/v1753813352/cute-cat_lwxphl.json" 
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Projects from './Projects.vue'
import ServicesOswal from './ServicesOswal.vue'
import AboutMe from './AboutMe.vue'
import Contact from './Contact.vue'

const router = useRouter()
const props = defineProps({
  targetFloor: {
    type: Number,
    required: true
  }
})

const currentFloor = ref(props.targetFloor)
const isOpen = ref(false)
const direction = ref<'up' | 'down' | null>(null)
const isMoving = ref(false)
const showElevator = ref(true)
const showFloorTitle = ref(false)
const showContent = ref(false)
const showCat = ref(false)

interface Section {
  floor: number
  name: string
  route: string
}

const sections: Section[] = [
  { floor: 1, name: 'SobreMi', route: '/about' },
  { floor: 2, name: 'Servicios', route: '/services' },
  { floor: 3, name: 'Proyectos', route: '/projects' },
  { floor: 4, name: 'Contacto', route: '/contact' }
]

const getCurrentFloorName = computed(() => {
  const section = sections.find(s => s.floor === currentFloor.value)
  return section ? section.name : ''
})

const goToFloor = (section: Section) => {
  if (currentFloor.value === section.floor || isMoving.value) return

  showContent.value = false
  showElevator.value = true
  direction.value = section.floor > currentFloor.value ? 'up' : 'down'
  isMoving.value = true
  showFloorTitle.value = false
  showCat.value = true

  isOpen.value = false

  setTimeout(() => {
    currentFloor.value = section.floor
    router.push(section.route)

    setTimeout(() => {
      isOpen.value = true
      showFloorTitle.value = true

      setTimeout(() => {
        showContent.value = true
        showElevator.value = false
        showCat.value = false
        direction.value = null
        isMoving.value = false
      }, 2500)
    }, 1500)
  }, 1000)
}

onMounted(() => {
  // Mostrar el gato durante la animación inicial
  showCat.value = true
  
  setTimeout(() => {
    isOpen.value = true
    showFloorTitle.value = true
    setTimeout(() => {
      showContent.value = true
      showElevator.value = false
      showCat.value = false
      showCat.value = false
    }, 2500)
  }, 1000)
})
</script>

<style scoped>
.scene {
  width: 100%;
  height: 100vh;
  position: relative;
  perspective: 1000px;
  overflow: hidden;
  background: #F4F9FC;
}

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

.floor {
  position: fixed;
  width: 150%;
  height: 75%;
  left: -25%;
  bottom: -30%;
  transform: rotateX(60deg);
  background: linear-gradient(90deg, 
    rgba(142, 170, 180, 0.8) 0%, 
    rgba(172, 196, 204, 0.8) 25%, 
    rgba(142, 170, 180, 0.8) 50%, 
    rgba(172, 196, 204, 0.8) 75%, 
    rgba(142, 170, 180, 0.8) 100%);
  z-index: 1;
}

.lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(100, 130, 140, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100, 130, 140, 0.3) 1px, transparent 1px);
  background-size: 10% 10%;
}

.diagonal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(135deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(225deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(315deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(45deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%);
  background-size: 20% 20%;
  opacity: 0.5;
}

.perspective-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.perspective-line {
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 100%);
  transform-origin: bottom;
}

.perspective-line:nth-child(odd) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.2);
}

.perspective-line:nth-child(even) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.1);
}

.horizontal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.horizontal-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 50%,
    rgba(100, 130, 140, 0.1) 100%);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(142, 170, 180, 0) 0%, 
    rgba(142, 170, 180, 0.3) 100%);
}

.elevator-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.elevator {
  position: relative;
  width: 320px;
  transition: transform 0.3s ease;
}

.elevator.is-moving {
  animation: elevatorMovement 0.5s infinite alternate ease-in-out;
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

.floor-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 5;
  width: 100%;
  padding: 2rem;
}

.title-content {
  opacity: 0;
  animation: titleAppear 1s ease forwards 0.3s;
}

.floor-title h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: white;
  text-shadow: none;
}

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

/* Animated Cat Styles */
.cat-container {
  position: fixed;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;
}

.cat-animation {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.content-section {
  padding: 0 !important;
  max-width: none !important;
}

.about-section,
.services-section,
.projects-section {
  padding: 0 !important;
  max-width: none !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes elevatorMovement {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-3px);
  }
}

@keyframes titleAppear {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .floor-buttons {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    right: auto;
    top: auto;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 2rem;
  }

  .button-panel {
    flex-direction: row;
    gap: 0.8rem;
  }

  .floor-button {
    width: 3.5rem;
    height: 3.5rem;
  }

  .floor-number {
    font-size: 1rem;
  }

  .floor-name {
    font-size: 0.6rem;
  }

  .elevator {
    width: 280px;
  }

  .floor-title h1 {
    font-size: 2rem;
  }

  .cat-container {
    bottom: 12rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .cat-animation {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .floor-buttons {
    bottom: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .floor-button {
    width: 3rem;
    height: 3rem;
  }

  .floor-number {
    font-size: 0.9rem;
  }

  .floor-name {
    font-size: 0.55rem;
  }

  .cat-container {
    bottom: 10rem;
  }

  .cat-animation {
    width: 80px;
    height: 80px;
  }
}
</style>