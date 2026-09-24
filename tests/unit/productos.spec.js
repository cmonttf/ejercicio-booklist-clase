import productos from '@/store/modules/productos'

describe('store/modules/productos', () => {
test('AGREGAR_LIBRO agrega un libro al state', () => {
const state = { libros: [], loading: false, error: null }

productos.mutations.AGREGAR_LIBRO(state, { id: '1', titulo: 'Drácula' })

expect(state.libros).toHaveLength(1)
expect(state.libros[0].titulo).toBe('Drácula')
})

test('el getter libroPorId encuentra el libro correcto', () => {
const state = {
libros: [
{ id: 1, titulo: 'Libro A' },
{ id: 2, titulo: 'Libro B' }
]
}

const libro = productos.getters.libroPorId(state)('2')

expect(libro.titulo).toBe('Libro B')
})
})