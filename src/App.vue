<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { sesion, cerrarSesion } from './data/sesion'

const route = useRoute()
const router = useRouter()
const store = useStore()

const esVistaPrivada = computed(() => route.meta.requiresAuth)
const inicial = computed(() => sesion.usuario ? sesion.usuario.charAt(0).toUpperCase() : '?')

const libros = computed(() => store.getters['productos/libros'])
const librosEnRevision = computed(() => libros.value.filter(libro => !libro.publicado).length)

function salir() {
cerrarSesion()
router.push({ name: 'inicio' })
}

function publicarTodos() {
store.dispatch('productos/publicarTodos')
}
</script>

<template>
  <div v-if="esVistaPrivada" class="app-privada">
    <header class="barra">
      <router-link :to="{ name: 'dashboard' }" class="marca">
        <span class="logo">
          <img src="@/assets/img/icono-libros.gif" alt="" width="28">
        </span>
        BookList
      </router-link>

      <nav class="enlaces">
        <router-link :to="{ name: 'dashboard' }" class="enlace">Panel</router-link>
        <router-link :to="{ name: 'libros' }" class="enlace">Catálogo</router-link>
      </nav>

      <div class="barra-derecha">
        <div class="burbuja-usuario">
          <span class="avatar">{{ inicial }}</span>
          <span class="nombre-usuario">{{ sesion.usuario }}</span>
        </div>
        <button class="boton-salir" @click="salir">Cerrar sesión</button>
      </div>
    </header>

    <div class="barra-contador">
      <span>Libros en revisión: <strong>{{ librosEnRevision }}</strong> de {{ libros.length }}</span>
      <button class="boton-contador" :disabled="librosEnRevision === 0" @click="publicarTodos">
        Publicar todos
      </button>
    </div>

    <main class="contenido">
      <router-view />
    </main>

    <footer class="pie">
      BookList · Editorial Nova · Proyecto Módulo 6
    </footer>
  </div>

  <router-view v-else />
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #f4f5f9;
  color: #1e2749;
}
img {
  max-width: 100%;
  height: auto;
}
</style>

<style scoped>
.app-privada {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 2.5rem;
  background: white;
  box-shadow: 0 2px 12px rgba(30, 39, 73, 0.06);
}

.marca {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: #1e2749;
  text-decoration: none;
}
/* El GIF tiene fondo blanco */
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 10px rgba(30, 39, 73, 0.12);
  overflow: hidden;
}
.logo img {
  display: block;
}

.enlaces {
  display: flex;
  gap: 0.5rem;
  margin-right: auto;
}
.enlace {
  color: #5b6b90;
  text-decoration: none;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
}
.enlace:hover {
  color: #1e2749;
}
.enlace.router-link-active {
  background: #eef0ff;
  color: #4f46e5;
}

.barra-derecha {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.burbuja-usuario {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.9rem 0.35rem 0.35rem;
  background: #f4f5f9;
  border-radius: 999px;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #4f46e5;
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
}
.nombre-usuario {
  font-size: 0.9rem;
  font-weight: 600;
}

.boton-salir {
  padding: 0.5rem 1.1rem;
  border: 1px solid #dde1f0;
  border-radius: 999px;
  background: transparent;
  color: #5b6b90;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.boton-salir:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.barra-contador {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0.55rem 1rem;
  background: #1e2749;
  color: #cdd3f0;
  font-size: 0.9rem;
}
.barra-contador strong {
  color: #f5a623;
  font-size: 1rem;
}

.boton-contador {
  border: none;
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  background: #f5a623;
  color: #1e2749;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.boton-contador:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.contenido {
  flex: 1;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
}

.pie {
  text-align: center;
  padding: 1.2rem;
  background: #1e2749;
  color: #9aa3d6;
  font-size: 0.85rem;
}

@media (max-width: 760px) {
  .barra {
    flex-wrap: wrap;
    padding: 1rem 1.25rem;
    gap: 0.8rem;
  }
  .enlaces {
    order: 3;
    width: 100%;
    margin-right: 0;
  }
  .nombre-usuario {
    display: none;
  }
  .burbuja-usuario {
    padding: 0.35rem;
  }
  .contenido {
    padding: 1.5rem 1.25rem;
  }
}
</style>
