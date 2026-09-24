<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import FormularioLibro from '../components/FormularioLibro.vue'

const props = defineProps({
  id: { type: [String, Number], required: true }
})

const router = useRouter()
const store = useStore()

const categorias = ['Novela', 'Ensayo', 'Fantasía', 'Ciencia', 'Biografía', 'Poesía']

const libro = computed(() => store.getters['productos/libroPorId'](props.id))
const idsFavoritos = computed(() => store.getters['favoritos/ids'])
const esFavorito = computed(() => (libro.value ? idsFavoritos.value.includes(libro.value.id) : false))

const editando = ref(false)

function alternarPublicado() {
  store.dispatch('productos/alternarPublicado', libro.value.id)
}

function toggleFavorito() {
  store.commit('favoritos/TOGGLE_FAVORITO', libro.value.id)
}

function alGuardar() {
  editando.value = false
}
</script>

<template>
  <div class="pagina">
    <div v-if="!libro" class="no-encontrado">
      <img src="@/assets/img/lector-caminando.png" alt="Lector caminando mientras lee" class="no-encontrado-img">
      <p class="no-encontrado-titulo">No encontramos ese libro</p>
      <p>Puede que el enlace esté mal o que el libro haya sido eliminado.</p>
      <router-link to="/libros" class="volver">← Volver al catálogo</router-link>
    </div>

    <template v-else>
      <FormularioLibro
        v-if="editando"
        :categorias="categorias"
        :libro-editar="libro"
        @guardado="alGuardar"
      />

      <div v-else class="detalle">
        <div class="detalle-texto">
          <button class="volver-boton" @click="router.back()">← Volver</button>
          <div class="chips">
            <span class="chip-categoria">{{ libro.categoria }}</span>
            <span class="chip-estado" :class="{ publicado: libro.publicado }">
              {{ libro.publicado ? 'Publicado' : 'En revisión' }}
            </span>
          </div>
          <div class="fila-titulo-detalle">
            <h1>{{ libro.titulo }}</h1>
            <button class="boton-favorito-detalle" @click="toggleFavorito">
              {{ esFavorito ? '★' : '☆' }}
            </button>
          </div>
          <p class="autor">de {{ libro.autor }}</p>
          <p class="descripcion">{{ libro.descripcion || 'Sin descripción disponible.' }}</p>
          <div class="acciones-detalle">
            <button class="boton-estado" @click="alternarPublicado">
              {{ libro.publicado ? 'Volver a revisión' : 'Publicar libro' }}
            </button>
            <button class="boton-editar" @click="editando = true">Editar</button>
          </div>
        </div>
        <img src="@/assets/img/lectora-libro-rojo.png" alt="" class="detalle-img">
      </div>
    </template>
  </div>
</template>

<style scoped>
.pagina {
  max-width: 820px;
  margin: 0 auto;
}
.no-encontrado {
  text-align: center;
  background: white;
  padding: 2.5rem;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(30, 39, 73, 0.08);
  color: #5b6b90;
}
.no-encontrado-img {
  width: 100%;
  max-width: 220px;
}
.no-encontrado-titulo {
  color: #1e2749;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0.8rem 0 0.3rem;
}
.volver {
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
}
.detalle {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(30, 39, 73, 0.1);
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 2rem;
  align-items: center;
}
.volver-boton {
  display: block;
  border: none;
  background: none;
  color: #6366f1;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.chip-categoria,
.chip-estado {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}
.chip-categoria {
  background: #eef0ff;
  color: #4f46e5;
}
.chip-estado {
  background: #fff4e0;
  color: #b45309;
}
.chip-estado.publicado {
  background: #dcfce7;
  color: #15803d;
}
.fila-titulo-detalle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.boton-favorito-detalle {
  border: none;
  background: none;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  color: #f5a623;
  padding: 0;
}
.acciones-detalle {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.boton-estado {
  margin-top: 0.5rem;
  border: none;
  background: #dcfce7;
  color: #15803d;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.boton-estado:hover {
  background: #bbf7d0;
}
.boton-editar {
  margin-top: 0.5rem;
  border: none;
  background: #eef0ff;
  color: #4f46e5;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.boton-editar:hover {
  background: #e0e3ff;
}
h1 {
  margin: 0 0 0.4rem;
  color: #1e2749;
}
.autor {
  color: #8a92b2;
  margin: 0 0 1.5rem;
  font-style: italic;
}
.descripcion {
  color: #3b4a6b;
  line-height: 1.7;
}
.detalle-img {
  width: 100%;
}
@media (max-width: 640px) {
  .detalle {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
  .detalle-img {
    max-width: 180px;
    justify-self: center;
    grid-row: 1;
  }
}
</style>