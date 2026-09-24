import { reactive } from 'vue'

export const sesion = reactive({
  usuario: localStorage.getItem('token')
})

// demo: solo se pide el nombre, sin contraseña
export function iniciarSesion(nombre) {
  const limpio = nombre.trim()
  if (!limpio) return false

  sesion.usuario = limpio.charAt(0).toUpperCase() + limpio.slice(1)
  localStorage.setItem('token', sesion.usuario)
  return true
}

export function cerrarSesion() {
  sesion.usuario = null
  localStorage.removeItem('token')
}
