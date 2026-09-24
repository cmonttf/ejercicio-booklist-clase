<template>
  <section class="no-encontrado">
    <img src="@/assets/img/lectora-idea.png" alt="Lectora pensando sentada en una mesa" class="no-encontrado-img">
    <h1>Esta página no existe</h1>
    <p>Revisa la dirección o vuelve al inicio para seguir navegando.</p>
    <router-link :to="{ name: 'inicio' }" class="boton">Ir al inicio</router-link>
  </section>
</template>

<style scoped>
.no-encontrado {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}
.no-encontrado-img {
  width: 100%;
  max-width: 240px;
}
h1 {
  margin: 1rem 0 0.5rem;
}
p {
  margin: 0 0 1.5rem;
  color: #5b6b90;
}
.boton {
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  background: #4f46e5;
  color: white;
  font-weight: 700;
  text-decoration: none;
}
.boton:hover {
  background: #1e2749;
}
</style>
