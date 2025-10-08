import { createRouter, createWebHistory } from 'vue-router'
import Hero from './components/Hero.vue'
import Elevator from './components/Elevator.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Hero
  },
  {
    path: '/about',
    name: 'about',
    component: Elevator,
    props: { targetFloor: 1 }
  },
  {
    path: '/services',
    name: 'services',
    component: Elevator,
    props: { targetFloor: 2 }
  },
  {
    path: '/projects',
    name: 'projects',
    component: Elevator,
    props: { targetFloor: 3 }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Elevator,
    props: { targetFloor: 4 }
  },

  {
    path: '/project/:id',
    name: 'project-detail',
    component: () => import('./components/ProjectDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Google Analytics - Rastreo de rutas
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

router.afterEach((to) => {
  // Rastrear cambios de página en Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-QCNHFYS3S9', {
      page_path: to.fullPath,
      page_title: to.name || to.path,
      page_location: window.location.origin + to.fullPath
    });
  }
})

export default router