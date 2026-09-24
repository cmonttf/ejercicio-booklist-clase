<script setup>
import { ref } from 'vue'

const props = defineProps({
libro: { type: Object, required: true },
vistaPrevia: { type: Boolean, default: false },
esFavorito: { type: Boolean, default: false }
})

const emit = defineEmits(['eliminar', 'alternar-publicado', 'favorito'])

const mostrarDescripcion = ref(props.vistaPrevia)
</script>

<template>
<li class="tarjeta-libro" :class="{ 'es-vista-previa': vistaPrevia }">
<div class="fila-titulo">
<span v-if="vistaPrevia" class="titulo-libro">{{ libro.titulo }}</span>
<router-link v-else :to="`/libros/${libro.id}`" class="titulo-libro">{{ libro.titulo }}</router-link>
<button v-if="!vistaPrevia" class="boton-favorito" @click="emit('favorito', libro.id)">
{{ esFavorito ? '★' : '☆' }}
</button>
</div>
<p class="autor-libro">{{ libro.autor }}</p>
<div class="chips">
<span class="chip-categoria">{{ libro.categoria }}</span>
<span v-if="!vistaPrevia" class="chip-estado" :class="{ publicado: libro.publicado }">
{{ libro.publicado ? 'Publicado' : 'En revisión' }}
</span>
</div>

<p v-show="mostrarDescripcion && libro.descripcion" class="descripcion">{{ libro.descripcion }}</p>

<div v-if="!vistaPrevia" class="acciones">
<button
v-if="libro.descripcion"
class="boton-descripcion"
@click="mostrarDescripcion = !mostrarDescripcion"
>
{{ mostrarDescripcion ? 'Ocultar descripción' : 'Ver descripción' }}
</button>
<button class="boton-estado" @click="emit('alternar-publicado', libro.id)">
{{ libro.publicado ? 'Volver a revisión' : 'Publicar' }}
</button>
<button class="boton-eliminar" @click.once="emit('eliminar', libro.id)">Eliminar</button>
</div>
</li>
</template>

<style scoped>
.tarjeta-libro {
background: white;
border-radius: 14px;
padding: 1.2rem;
box-shadow: 0 4px 16px rgba(30, 39, 73, 0.08);
display: flex;
flex-direction: column;
gap: 0.4rem;
}
.es-vista-previa {
box-shadow: none;
border: 1.5px dashed #c7cbe6;
}
.fila-titulo {
display: flex;
align-items: center;
justify-content: space-between;
gap: 0.5rem;
}
.titulo-libro {
font-weight: 700;
color: #1e2749;
text-decoration: none;
font-size: 1.05rem;
}
a.titulo-libro:hover {
color: #4f46e5;
}
.boton-favorito {
border: none;
background: none;
font-size: 1.15rem;
line-height: 1;
cursor: pointer;
color: #f5a623;
padding: 0;
flex-shrink: 0;
}
.autor-libro {
color: #5b6b90;
margin: 0;
font-size: 0.9rem;
}
.chips {
display: flex;
flex-wrap: wrap;
gap: 0.4rem;
}
.chip-estado {
font-size: 0.75rem;
font-weight: 700;
padding: 0.2rem 0.6rem;
border-radius: 20px;
background: #fff4e0;
color: #b45309;
}
.chip-estado.publicado {
background: #dcfce7;
color: #15803d;
}
.chip-categoria {
background: #eef0ff;
color: #4f46e5;
font-size: 0.75rem;
font-weight: 700;
padding: 0.2rem 0.6rem;
border-radius: 20px;
}
.descripcion {
margin: 0.3rem 0 0;
color: #3b4a6b;
font-size: 0.85rem;
line-height: 1.5;
}
.acciones {
display: flex;
flex-wrap: wrap;
gap: 0.5rem;
margin-top: 0.5rem;
}
.boton-descripcion,
.boton-estado,
.boton-eliminar {
border: none;
font-weight: 600;
font-size: 0.85rem;
padding: 0.4rem 0.8rem;
border-radius: 8px;
cursor: pointer;
}
.boton-descripcion {
background: #eef0ff;
color: #4f46e5;
}
.boton-descripcion:hover {
background: #e0e3ff;
}
.boton-estado {
background: #dcfce7;
color: #15803d;
}
.boton-estado:hover {
background: #bbf7d0;
}
.boton-eliminar {
background: #fee2e2;
color: #dc2626;
}
.boton-eliminar:hover {
background: #fecaca;
}
</style>