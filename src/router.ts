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
    path: '/projects2',
    name: 'projects2',
    component: () => import('./components/Projects2.vue')
  },
  {
    path: '/project/:id',
    name: 'project-detail',
    component: () => import('./components/ProjectDetail.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router