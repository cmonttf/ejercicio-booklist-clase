<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { sesion } from '../data/sesion'

import iconoLibros from '@/assets/img/icono-libros.gif'
import iconoLibro from '@/assets/img/icono-libro.gif'
import iconoLeer from '@/assets/img/icono-leer.gif'

const router = useRouter()
const store = useStore()

const libros = computed(() => store.getters['productos/libros'])
const enRevision = computed(() => libros.value.filter(libro => !libro.publicado))
const publicados = computed(() => libros.value.filter(libro => libro.publicado))

const tarjetas = computed(() => [
  { icono: iconoLibros, numero: libros.value.length, etiqueta: 'Libros registrados' },
  { icono: iconoLibro, numero: enRevision.value.length, etiqueta: 'En revisión' },
  { icono: iconoLeer, numero: publicados.value.length, etiqueta: 'Publicados' }
])

function irAlCatalogo() {
  router.push({ name: 'libros' })
}

function alternarPublicado(id) {
  store.dispatch('productos/alternarPublicado', id)
}
</script>

<template>
  <div class="dashboard">
    <div class="fila-superior">
      <div>
        <p class="etiqueta-superior">Panel de control</p>
        <h1>Hola, {{ sesion.usuario }} 👋</h1>
      </div>
      <button class="boton-nuevo" @click="irAlCatalogo">+ Registrar libro</button>
    </div>

    <section class="cuadricula-tarjetas">
      <article v-for="tarjeta in tarjetas" :key="tarjeta.etiqueta" class="tarjeta">
        <img :src="tarjeta.icono" alt="" class="tarjeta-icono">
        <p class="tarjeta-numero">{{ tarjeta.numero }}</p>
        <p class="tarjeta-etiqueta">{{ tarjeta.etiqueta }}</p>
      </article>
    </section>

    <div class="bloques-lado-a-lado">
      <section class="bloque">
        <h2>En revisión</h2>
        <ul v-if="enRevision.length">
          <li v-for="libro in enRevision" :key="libro.id">
            <div class="libro-info">
              <router-link :to="`/libros/${libro.id}`" class="libro-titulo">{{ libro.titulo }}</router-link>
              <span class="libro-autor">{{ libro.autor }}</span>
            </div>
            <button class="boton-accion" @click="alternarPublicado(libro.id)">Publicar</button>
          </li>
        </ul>
        <div v-else class="vacio">
          <img src="@/assets/img/lectora-read-nice-books.png" alt="" class="vacio-img">
          <p>No hay libros pendientes de revisión.</p>
        </div>
      </section>

      <section class="bloque">
        <h2>Publicados</h2>
        <ul v-if="publicados.length">
          <li v-for="libro in publicados" :key="libro.id">
            <div class="libro-info">
              <router-link :to="`/libros/${libro.id}`" class="libro-titulo">{{ libro.titulo }}</router-link>
              <span class="libro-autor">{{ libro.autor }}</span>
            </div>
            <button class="boton-accion secundario" @click="alternarPublicado(libro.id)">Volver a revisión</button>
          </li>
        </ul>
        <div v-else class="vacio">
          <img src="@/assets/img/lectora-idea.png" alt="" class="vacio-img">
          <p>Todavía no hay libros publicados.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.fila-superior {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.etiqueta-superior {
  margin: 0 0 0.35rem;
  color: #4f46e5;
  font-size: 0.85rem;
  font-weight: 700;
}
h1 {
  margin: 0;
  font-size: 2.1rem;
}

.boton-nuevo {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 999px;
  background: #4f46e5;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.boton-nuevo:hover {
  background: #1e2749;
  transform: translateY(-1px);
}

.cuadricula-tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
.tarjeta {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(30, 39, 73, 0.08);
  padding: 1.5rem 1.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.tarjeta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(30, 39, 73, 0.14);
}
.tarjeta-icono {
  display: block;
  width: 48px;
  height: 48px;
  margin-bottom: 0.6rem;
}
.tarjeta-numero {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1;
}
.tarjeta-etiqueta {
  margin: 0.5rem 0 0;
  color: #5b6b90;
  font-size: 0.85rem;
}

.bloques-lado-a-lado {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.bloque {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(30, 39, 73, 0.08);
  padding: 1.75rem;
}
.bloque h2 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
}
.bloque ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.bloque li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f1fc;
}
.bloque li:last-child {
  border-bottom: none;
}

.libro-info {
  display: flex;
  flex-direction: column;
}
.libro-titulo {
  color: #1e2749;
  font-weight: 600;
  text-decoration: none;
}
.libro-titulo:hover {
  color: #4f46e5;
}
.libro-autor {
  color: #8a92b2;
  font-size: 0.85rem;
}

.boton-accion {
  flex-shrink: 0;
  padding: 0.4rem 0.9rem;
  border: 1px solid #bbf7d0;
  border-radius: 999px;
  background: #dcfce7;
  color: #15803d;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.boton-accion:hover {
  background: #bbf7d0;
}
.boton-accion.secundario {
  border-color: #dde1f0;
  background: transparent;
  color: #5b6b90;
}
.boton-accion.secundario:hover {
  border-color: #b45309;
  color: #b45309;
}

.vacio {
  padding: 1.5rem 1rem;
  border: 1px dashed #dde1f0;
  border-radius: 14px;
  background: #fafbff;
  text-align: center;
}
.vacio-img {
  width: 100%;
  max-width: 110px;
}
.vacio p {
  margin: 0.5rem 0 0;
  color: #5b6b90;
  font-size: 0.9rem;
}

@media (max-width: 780px) {
  .bloques-lado-a-lado {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .cuadricula-tarjetas {
    grid-template-columns: 1fr;
  }
  .fila-superior {
    flex-direction: column;
    align-items: flex-start;
  }
  h1 {
    font-size: 1.7rem;
  }
}
</style>
