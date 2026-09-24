export default {
    namespaced: true,
    state: () => ({
        ids: []
    }),
    mutations: {
        TOGGLE_FAVORITO(state, id) {
            state.ids = state.ids.includes(id)
            ? state.ids.filter(i => i !== id)
            : [...state.ids, id]
        }
    },
    getters: {
        ids: state => state.ids
    }
}