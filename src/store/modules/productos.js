import api from '@/api'

export default {
    namespaced: true,
    state: () => ({
        libros: [],
        loading: false,
        error: null
    }),
    mutations: {
        SET_LIBROS(state, libros) {
            state.libros = libros
        },
        AGREGAR_LIBRO(state, libro) {
            state.libros.push(libro)
        },
        EDITAR_LIBRO(state, libroActualizado) {
            const index = state.libros.findIndex(l => l.id === libroActualizado.id)
            if (index !== -1) state.libros[index] = libroActualizado
        },
        ELIMINAR_LIBRO(state, id) {
            state.libros = state.libros.filter(l => l.id !== id)
        },
        SET_LOADING(state, val) {
            state.loading = val
        },
        SET_ERROR(state, val) {
            state.error = val
        }
    },
    actions: {
        async cargarLibros({ commit }) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            try {
                const { data } = await api.get('/libros')
                commit('SET_LIBROS', data)
            } catch (e) {
                commit('SET_ERROR', 'No se pudieron cargar los libros.')
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async agregarLibro({ commit }, datos) {
            const { data } = await api.post('/libros', { ...datos, publicado: false })
            commit('AGREGAR_LIBRO', data)
        },
        async editarLibro({ commit }, libro) {
            const { data } = await api.put(`/libros/${libro.id}`, libro)
            commit('EDITAR_LIBRO', data)
        },
        async eliminarLibro({ commit }, id) {
            await api.delete(`/libros/${id}`)
            commit('ELIMINAR_LIBRO', id)
        },
        async alternarPublicado({ commit, state }, id) {
            const libro = state.libros.find(l => l.id === id)
            if (!libro) return
            const { data } = await api.put(`/libros/${id}`, { ...libro, publicado: !libro.publicado })
            commit('EDITAR_LIBRO', data)
        },
        async publicarTodos({ commit, state }) {
            const actualizados = await Promise.all(
                state.libros.map(libro =>
                    api.put(`/libros/${libro.id}`, { ...libro, publicado: true }).then(res => res.data)
                )
            )
            commit('SET_LIBROS', actualizados)
        }
    },
    getters: {
        libros: state => state.libros,
        loading: state => state.loading,
        error: state => state.error,
        libroPorId: state => id => state.libros.find(l => l.id === Number(id))
    }
}