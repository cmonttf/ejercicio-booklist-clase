import { createRouter, createWebHistory } from 'vue-router'
import { sesion } from '../data/sesion'
import InicioView from '../views/InicioView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'
import NoEncontradoView from '../views/NoEncontradoView.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/libros', name: 'libros', component: ListaLibros, meta: { requiresAuth: true } },
  // el :id llega al componente como prop
  {
    path: '/libros/:id',
    name: 'detalle-libro',
    component: DetalleLibro,
    props: true,
    meta: { requiresAuth: true }
  },
  // 404, siempre al final
  { path: '/:pathMatch(.*)*', name: 'no-encontrado', component: NoEncontradoView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// guard: las rutas privadas piden sesión
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !sesion.usuario) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.name === 'login' && sesion.usuario) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
