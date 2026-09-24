<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import LibroItem from './LibroItem.vue'

const props = defineProps({
categorias: { type: Array, required: true },
libroEditar: { type: Object, default: null }
})

const emit = defineEmits(['guardado'])
const store = useStore()

const nuevoLibro = reactive({
titulo: '',
autor: '',
categoria: 'Novela',
descripcion: ''
})

const error = ref('')

watch(
() => props.libroEditar,
libro => {
if (libro) {
nuevoLibro.titulo = libro.titulo
nuevoLibro.autor = libro.autor
nuevoLibro.categoria = libro.categoria
nuevoLibro.descripcion = libro.descripcion
}
},
{ immediate: true }
)

const libroPrevia = computed(() => ({
titulo: nuevoLibro.titulo || 'Título del libro',
autor: nuevoLibro.autor || 'Autor',
categoria: nuevoLibro.categoria,
descripcion: nuevoLibro.descripcion,
publicado: props.libroEditar ? props.libroEditar.publicado : false
}))

function limpiarFormulario() {
nuevoLibro.titulo = ''
nuevoLibro.autor = ''
nuevoLibro.categoria = 'Novela'
nuevoLibro.descripcion = ''
}

async function enviar() {
if (!nuevoLibro.titulo.trim() || !nuevoLibro.autor.trim()) {
error.value = 'El título y el autor son obligatorios.'
return
}
error.value = ''

if (props.libroEditar) {
await store.dispatch('productos/editarLibro', {
id: props.libroEditar.id,
...nuevoLibro,
publicado: props.libroEditar.publicado
})
} else {
await store.dispatch('productos/agregarLibro', { ...nuevoLibro })
limpiarFormulario()
}

emit('guardado')
}
</script>

<template>
<form class="formulario" @submit.prevent>
<div class="campos">
<div class="fila">
<input v-model="nuevoLibro.titulo" placeholder="Título" @keyup.enter="enviar">
<input v-model="nuevoLibro.autor" placeholder="Autor" @keyup.enter="enviar">
</div>
<div class="fila">
<select v-model="nuevoLibro.categoria">
<option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
</select>
<button type="button" class="boton-agregar" @click="enviar">
{{ libroEditar ? 'Guardar cambios' : '+ Agregar libro' }}
</button>
</div>
<textarea v-model="nuevoLibro.descripcion" placeholder="Descripción breve (opcional)"></textarea>

<p v-if="error" class="error">{{ error }}</p>
</div>

<aside class="vista-previa">
<p class="vista-previa-label">Vista previa</p>
<ul class="vista-previa-lista">
<LibroItem :libro="libroPrevia" vista-previa />
</ul>
</aside>
</form>
</template>

<style scoped>
.formulario {
background: white;
border-radius: 14px;
padding: 1.5rem;
box-shadow: 0 4px 16px rgba(30, 39, 73, 0.08);
margin-bottom: 1.5rem;
display: grid;
grid-template-columns: 1fr 240px;
gap: 1.5rem;
}
.fila {
display: flex;
gap: 0.8rem;
margin-bottom: 0.8rem;
}
.fila input, .fila select {
flex: 1;
}
input, select, textarea {
padding: 0.7rem 0.9rem;
border: 1.5px solid #dde1f0;
border-radius: 8px;
font-size: 0.95rem;
font-family: inherit;
box-sizing: border-box;
width: 100%;
background: white;
}
input:focus, select:focus, textarea:focus {
outline: none;
border-color: #6366f1;
}
textarea {
resize: vertical;
min-height: 60px;
display: block;
}
.boton-agregar {
flex: 0 0 auto;
padding: 0.7rem 1.3rem;
border: none;
border-radius: 8px;
background: linear-gradient(135deg, #4f46e5, #6366f1);
color: white;
font-weight: 700;
cursor: pointer;
white-space: nowrap;
}
.boton-agregar:hover {
opacity: 0.9;
}
.error {
margin: 0.6rem 0 0;
color: #dc2626;
font-size: 0.85rem;
font-weight: 600;
}
.vista-previa-label {
margin: 0 0 0.5rem;
color: #8a92b2;
font-size: 0.75rem;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.5px;
}
.vista-previa-lista {
list-style: none;
margin: 0;
padding: 0;
}
@media (max-width: 760px) {
.formulario {
grid-template-columns: 1fr;
}
.fila {
flex-direction: column;
}
}
</style>