<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { iniciarSesion } from '../data/sesion'

const router = useRouter()
const route = useRoute()

const nombre = ref('')
const error = ref('')

function ingresar() {
  if (!iniciarSesion(nombre.value)) {
    error.value = 'Escribe tu nombre para continuar.'
    return
  }
  // vuelve a la página que quería ver
  router.push(route.query.redirect || { name: 'dashboard' })
}
</script>

<template>
  <div class="columnas">
    <aside class="panel-marca">
      <router-link :to="{ name: 'inicio' }" class="marca">
        <span class="logo">
          <img src="@/assets/img/icono-libros.gif" alt="Logo BookList" width="30">
        </span>
        BookList
      </router-link>

      <div class="panel-contenido">
        <img src="@/assets/img/hero-cohete.png" alt="Ilustración de un libro" class="ilustracion">

        <h2>Plataforma de gestión</h2>
        <p class="frase">
          Registra libros, organiza el catálogo y lleva el control de cada título desde un solo lugar.
        </p>

        <ul class="beneficios">
          <li>Registro de libros</li>
          <li>Control del catálogo</li>
          <li>Estado de publicación</li>
        </ul>
      </div>
    </aside>

    <main class="panel-formulario">
      <div class="tarjeta-formulario">
        <p class="etiqueta-superior">Acceso del equipo</p>
        <h1>Te damos la bienvenida</h1>
        <p class="subtitulo">Ingresa tu nombre para acceder al panel de control.</p>

        <label for="nombre" class="etiqueta-campo">Nombre</label>
        <input id="nombre" v-model="nombre" placeholder="Ej: Ingrid" class="campo" @keyup.enter="ingresar">

        <p v-if="error" class="error">{{ error }}</p>

        <button class="boton" @click="ingresar">Ingresar al panel</button>

        <p class="nota">Es una demo: no necesitas contraseña.</p>

        <router-link :to="{ name: 'inicio' }" class="volver">← Volver al inicio</router-link>
      </div>
    </main>
  </div>
</template>

<style scoped>
.columnas {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
}

/* Panel izquierdo */
.panel-marca {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: linear-gradient(145deg, #1e2749 0%, #2d3585 55%, #4f46e5 100%);
  color: #dfe3ff;
}

.panel-contenido {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.marca {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: white;
  overflow: hidden;
}

.ilustracion {
  width: 100%;
  max-width: 320px;
  margin: 0 0 1.5rem;
}

.panel-marca h2 {
  margin: 0 0 0.8rem;
  color: white;
  font-size: 1.8rem;
  line-height: 1.25;
}

.frase {
  margin: 0 0 1.75rem;
  font-size: 1.05rem;
  line-height: 1.6;
}

.beneficios {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}
.beneficios li {
  padding: 0.45rem 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Formulario */
.panel-formulario {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: #f4f5f9;
}

.tarjeta-formulario {
  width: 100%;
  max-width: 520px;
  padding: 3rem 3.25rem;
  border-radius: 24px;
  background: white;
  box-shadow: 0 20px 50px rgba(30, 39, 73, 0.1);
}

.etiqueta-superior {
  margin: 0 0 0.4rem;
  color: #4f46e5;
  font-size: 0.85rem;
  font-weight: 700;
}

h1 {
  margin: 0 0 0.5rem;
  font-size: 1.9rem;
  line-height: 1.2;
}

.subtitulo {
  margin: 0 0 2rem;
  color: #5b6b90;
}

.etiqueta-campo {
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.campo {
  width: 100%;
  padding: 0.95rem 1.2rem;
  border: 1.5px solid #dde1f0;
  border-radius: 14px;
  background: #fafbff;
  font-size: 1rem;
  font-family: inherit;
  margin-bottom: 1.25rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.campo:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
  background: white;
}

.error {
  margin: -0.6rem 0 1rem;
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: 600;
}

.boton {
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 14px;
  background: #4f46e5;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
  transition: background 0.2s, transform 0.2s;
}
.boton:hover {
  background: #1e2749;
  transform: translateY(-1px);
}

.nota {
  margin: 1rem 0 0;
  color: #8a92b2;
  font-size: 0.85rem;
  text-align: center;
}

.volver {
  display: block;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eef0ff;
  color: #5b6b90;
  font-size: 0.9rem;
  text-align: center;
  text-decoration: none;
}
.volver:hover {
  color: #1e2749;
}

@media (max-width: 900px) {
  .columnas {
    grid-template-columns: 1fr;
  }
  .panel-marca {
    padding: 5.5rem 1.5rem 2.5rem;
  }
  .marca {
    top: 1.5rem;
    left: 1.5rem;
  }
  .ilustracion {
    max-width: 180px;
    margin: 1.25rem 0 1rem;
  }
  .panel-marca h2 {
    font-size: 1.4rem;
  }
  .panel-formulario {
    padding: 2rem 1.25rem;
  }
  .tarjeta-formulario {
    padding: 2rem 1.5rem;
  }
}
</style>
