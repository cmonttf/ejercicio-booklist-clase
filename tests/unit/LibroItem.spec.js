import { mount } from '@vue/test-utils'
import LibroItem from '@/components/LibroItem.vue'

describe('LibroItem.vue', () => {
    const libro = {
        id: '1',
        titulo: 'Cien años de soledad',
        autor: 'Gabriel García Márquez',
        categoria: 'Novela',
        publicado: false
    }

    const stubs = {
        RouterLink: { template: '<a><slot /></a>' }
    }

    test('muestra el título y el autor recibidos por prop', () => {
        const wrapper = mount(LibroItem, {
            props: { libro },
            global: { stubs }
        })

        expect(wrapper.text()).toContain('Cien años de soledad')
        expect(wrapper.text()).toContain('Gabriel García Márquez')
    })

    test('emite "eliminar" con el id correcto al hacer click', async () => {
        const wrapper = mount(LibroItem, {
        props: { libro },
        global: { stubs }
    })

    await wrapper.find('.boton-eliminar').trigger('click')

    expect(wrapper.emitted('eliminar')).toBeTruthy()
    expect(wrapper.emitted('eliminar')[0]).toEqual(['1'])
    })
})