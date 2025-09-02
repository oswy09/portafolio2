<template>
  <div class="contact-container">
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

    <BrowserScene />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BrowserScene from './BrowserScene.vue'

const router = useRouter()
const currentFloor = ref(4)

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

const goToFloor = (section: Section) => {
  router.push(section.route)
}
</script>

<style scoped>
.contact-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
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

@media (max-width: 1024px) {
  .floor-buttons {
    right: 1rem;
  }
}
</style>