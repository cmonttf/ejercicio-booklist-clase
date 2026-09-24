<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { sesion } from '../data/sesion'

import iconoLibros from '@/assets/img/icono-libros.gif'
import iconoLibro from '@/assets/img/icono-libro.gif'
import iconoLeer from '@/assets/img/icono-leer.gif'
import libroAbierto from '@/assets/img/libro-abierto.gif'
import lectoraIdea from '@/assets/img/lectora-idea.png'
import lectorCafe from '@/assets/img/lector-cafe.png'
import lectorCaminando from '@/assets/img/lector-caminando.png'

const store = useStore()
const libros = computed(() => store.getters['productos/libros'])

const enRevision = computed(() => libros.value.filter(libro => !libro.publicado).length)
const publicados = computed(() => libros.value.filter(libro => libro.publicado).length)

const accesos = [
{ icono: libroAbierto, texto: 'Registrar un libro', ruta: { name: 'libros' } },
{ icono: iconoLibros, texto: 'Revisar el catálogo', ruta: { name: 'libros' } },
{ icono: iconoLeer, texto: 'Libros en revisión', ruta: { name: 'dashboard' } },
{ icono: iconoLibro, texto: 'Panel de control', ruta: { name: 'dashboard' } }
]

const funciones = [
  {
    imagen: lectoraIdea,
    alt: 'Lectora pensando con una idea',
    titulo: 'Registra cada título',
    texto: 'Carga título, autor, categoría y descripción; el catálogo se actualiza al instante.'
  },
  {
    imagen: lectorCafe,
    alt: 'Lector tomando café mientras lee',
    titulo: 'Organiza el catálogo',
    texto: 'Filtra por título, autor o categoría para encontrar cualquier libro en segundos.'
  },
  {
    imagen: lectorCaminando,
    alt: 'Lector caminando mientras lee',
    titulo: 'Controla el estado',
    texto: 'Sigue cada libro de la revisión a la publicación y elimina los que salen del catálogo.'
  }
]
</script>

<template>
  <div class="pagina">
    <header class="cabecera">
      <div class="contenedor cabecera-interior">
        <router-link :to="{ name: 'inicio' }" class="marca">
          <span class="logo">
            <img src="@/assets/img/icono-libros.gif" alt="" width="28">
          </span>
          BookList
        </router-link>

        <nav class="enlaces-cabecera">
          <a href="#accesos">Accesos</a>
          <a href="#funciones">Funciones</a>
        </nav>

        <div class="barra-derecha">
          <router-link v-if="!sesion.usuario" :to="{ name: 'login' }" class="barra-enlace">
            Iniciar sesión
          </router-link>
          <router-link :to="{ name: 'dashboard' }" class="barra-boton">Ir al dashboard</router-link>
        </div>
      </div>
    </header>

    <main class="contenedor contenido-principal">
      <section class="portada">
        <div class="portada-texto">
          <span class="etiqueta">Plataforma interna · Editorial Nova</span>
          <h1>Gestiona y controla el catálogo de <strong>Editorial Nova</strong></h1>
          <p class="subtexto">
            La herramienta del equipo editorial para registrar libros, organizarlos por autor
            y categoría, y llevar el control de cada título en un solo lugar.
          </p>
          <router-link :to="{ name: 'login' }" class="boton-pildora">Ingresar a la plataforma</router-link>
        </div>

        <aside class="tarjeta-vistaprevia">
          <p class="vistaprevia-titulo">Estado del catálogo</p>

          <div class="vistaprevia-fila">
            <span class="vistaprevia-etiqueta">Libros registrados</span>
            <span class="vistaprevia-numero">{{ libros.length }}</span>
          </div>
          <div class="vistaprevia-fila">
            <span class="vistaprevia-etiqueta">En revisión</span>
            <span class="vistaprevia-numero">{{ enRevision }}</span>
          </div>
          <div class="vistaprevia-fila">
            <span class="vistaprevia-etiqueta">Publicados</span>
            <span class="vistaprevia-numero">{{ publicados }}</span>
          </div>

          <router-link :to="{ name: 'dashboard' }" class="vistaprevia-boton">Ir al panel</router-link>
        </aside>
      </section>
    </main>

    <section id="accesos" class="destacados">
      <div class="contenedor">
        <h2 class="seccion-titulo">¡Todo lo que necesitas, en un vistazo!</h2>
        <p class="seccion-subtitulo">Accesos directos a las tareas diarias del equipo editorial.</p>

        <div class="cuadricula-destacados">
          <router-link
            v-for="acceso in accesos"
            :key="acceso.texto"
            :to="acceso.ruta"
            class="tarjeta-destacado"
          >
            <img :src="acceso.icono" alt="" class="destacado-icono">
            <p>{{ acceso.texto }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <section id="funciones" class="contenedor seccion-funciones">
      <h2 class="seccion-titulo">¿Cómo ayuda BookList a la editorial?</h2>
      <p class="seccion-subtitulo">Todo el control del catálogo en una sola aplicación, sin formularios estáticos.</p>

      <div class="funciones">
        <article v-for="f in funciones" :key="f.titulo" class="funcion">
          <img :src="f.imagen" :alt="f.alt" class="funcion-img">
          <h3>{{ f.titulo }}</h3>
          <p>{{ f.texto }}</p>
        </article>
      </div>
    </section>

    <section class="contenedor cita">
      <blockquote>
        <p>«La lectura es una fábrica de sueños»</p>
      </blockquote>
      <p class="cita-autora">Ana María Matute</p>
    </section>

    <footer class="pie">
      <div class="contenedor pie-interior">
        <div class="pie-columna pie-columna-marca">
          <span class="marca-pie">BookList</span>
          <p>Plataforma interna de gestión de libros de Editorial Nova.</p>
        </div>

        <div class="pie-columna">
          <p class="pie-titulo">Catálogo</p>
          <router-link :to="{ name: 'libros' }">Registrar libros</router-link>
          <router-link :to="{ name: 'libros' }">Ver catálogo</router-link>
        </div>

        <div class="pie-columna">
          <p class="pie-titulo">Cuenta</p>
          <router-link :to="{ name: 'login' }">Iniciar sesión</router-link>
          <router-link :to="{ name: 'dashboard' }">Ir al dashboard</router-link>
        </div>

        <div class="pie-columna">
          <p class="pie-titulo">Proyecto N°6</p>
        </div>
      </div>

      <p class="pie-derechos">© 2026 BookList · Editorial Nova</p>
    </footer>
  </div>
</template>

<style scoped>
.pagina {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
}

.contenedor {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Cabecera */
.cabecera {
  border-bottom: 1px solid #eef0ff;
}
.cabecera-interior {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
}
.marca {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.3rem;
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
.enlaces-cabecera {
  display: flex;
  gap: 2rem;
}
.enlaces-cabecera a {
  color: #5b6b90;
  text-decoration: none;
  font-weight: 600;
}
.enlaces-cabecera a:hover {
  color: #1e2749;
}

.barra-derecha {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.barra-enlace {
  color: #1e2749;
  font-weight: 600;
  text-decoration: none;
}
.barra-enlace:hover {
  text-decoration: underline;
}
.barra-boton {
  padding: 0.6rem 1.3rem;
  border-radius: 999px;
  background: #1e2749;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}
.barra-boton:hover {
  background: #4f46e5;
}

/* Portada */
.contenido-principal {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.portada {
  background: #4f46e5;
  border-radius: 28px;
  padding: 3.5rem;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2.5rem;
  align-items: center;
}
.etiqueta {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
h1 {
  margin: 0 0 1.25rem;
  color: white;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.2;
}
h1 strong {
  font-weight: 800;
}
.subtexto {
  margin: 0 0 2rem;
  color: #e0e3ff;
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 480px;
}
.boton-pildora {
  display: inline-block;
  padding: 0.9rem 1.75rem;
  border-radius: 999px;
  background: #f5a623;
  color: #1e2749;
  font-weight: 700;
  text-decoration: none;
}
.boton-pildora:hover {
  background: white;
}

.tarjeta-vistaprevia {
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
}
.vistaprevia-titulo {
  margin: 0 0 1.25rem;
  font-weight: 700;
}
.vistaprevia-fila {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eef0ff;
}
.vistaprevia-fila:last-of-type {
  border-bottom: none;
}
.vistaprevia-etiqueta {
  color: #5b6b90;
  font-size: 0.9rem;
}
.vistaprevia-numero {
  font-weight: 700;
  font-size: 1.2rem;
}
.vistaprevia-boton {
  display: block;
  margin-top: 1.5rem;
  padding: 0.7rem;
  border-radius: 999px;
  background: #1e2749;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  text-decoration: none;
}
.vistaprevia-boton:hover {
  background: #4f46e5;
}

/* Accesos rápidos */
.destacados {
  background: #f4f5f9;
  padding: 3rem 0;
}
.seccion-titulo {
  margin: 0;
  font-size: 1.8rem;
  text-align: center;
}
.seccion-subtitulo {
  margin: 0.5rem 0 2.25rem;
  color: #5b6b90;
  text-align: center;
}
.cuadricula-destacados {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.tarjeta-destacado {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.75rem 1rem;
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 20px rgba(30, 39, 73, 0.06);
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.tarjeta-destacado:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(30, 39, 73, 0.12);
}
.destacado-icono {
  width: 56px;
  height: 56px;
}
.tarjeta-destacado p {
  margin: 0;
  color: #1e2749;
  font-weight: 600;
}

/* Funciones */
.seccion-funciones {
  padding-top: 4rem;
  padding-bottom: 1rem;
}
.funciones {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.funcion {
  text-align: center;
}
.funcion-img {
  width: 100%;
  max-width: 190px;
}
.funcion h3 {
  margin: 0.5rem 0 0.4rem;
  font-size: 1.15rem;
}
.funcion p {
  margin: 0;
  color: #5b6b90;
  line-height: 1.55;
}

/* Cita */
.cita {
  max-width: 640px;
  margin: 2.5rem auto 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid #dde1f0;
  text-align: center;
}
.cita blockquote {
  margin: 0 0 0.6rem;
}
.cita blockquote p {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  font-style: italic;
  line-height: 1.35;
}
.cita-autora {
  margin: 0;
  color: #5b6b90;
}

/* Pie de página */
.pie {
  margin-top: auto;
  padding-top: 3rem;
  background: #1e2749;
  color: #cdd3f0;
}
.pie-interior {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 2rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.pie-columna {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  font-size: 0.9rem;
}
.marca-pie {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}
.pie-columna-marca p {
  margin: 0;
  max-width: 260px;
  line-height: 1.5;
}
.pie-titulo {
  margin: 0 0 0.3rem;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
}
.pie-columna a {
  color: #cdd3f0;
  text-decoration: none;
}
.pie-columna a:hover {
  color: white;
  text-decoration: underline;
}
.pie-derechos {
  margin: 0;
  padding: 1.5rem 2rem;
  color: #9aa3d6;
  font-size: 0.85rem;
  text-align: center;
}

@media (max-width: 860px) {
  .cuadricula-destacados {
    grid-template-columns: repeat(2, 1fr);
  }
  .funciones {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 780px) {
  .enlaces-cabecera {
    display: none;
  }
  .contenedor {
    padding: 0 1.25rem;
  }
  .barra-derecha {
    gap: 0.8rem;
  }
  .portada {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
  h1 {
    font-size: 2rem;
  }
  .seccion-titulo {
    font-size: 1.5rem;
  }
  .cita blockquote p {
    font-size: 1.3rem;
  }
  .pie-interior {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
