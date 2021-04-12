import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import { GET_LOADING } from '@/store/getters/getterTypes'
import Loading from '@/components/BasicComponents/Loading.vue'
import Icon from '@/components/BasicComponents/Icon.vue'


describe('Index.vue', () => {
  function setUp ({
    getters = { [GET_LOADING]: () => false}
  } = {}) {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    router.push = jest.fn()
    const store = new Vuex.Store({
      getters: getters
    })
    const wrapper = shallowMount(App, {
      store,
      router, 
      localVue
    })

    return {
      wrapper,
      router
    }
  }

  test('load app.vue', async () => {
    const getters = {
      [GET_LOADING]: () => false
    }
    
    const {wrapper} = setUp({ getters })
    
    expect(wrapper.findComponent(Loading).props().visible).toBe(false)
  })

  test('redirect to initial url', async () => {
    const { wrapper, router } = setUp()

    wrapper.findAllComponents(Icon).at(0).vm.$emit('onClick')

    expect(router.push).toHaveBeenCalledWith({ name: 'Index' })
  })

  test('redirect to export csv url', async () => {
    const { wrapper, router } = setUp()

    wrapper.findAllComponents(Icon).at(1).vm.$emit('onClick')

    expect(router.push).toHaveBeenCalledWith({ name: 'ExportCsv' })
  })
})
