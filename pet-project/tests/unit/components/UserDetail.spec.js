import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Index from '@/components/UserDetail.vue'
import MapContainer from './MapContainer'
import Avatar from './BasicComponents/Avatar'
import Icon from './BasicComponents/Icon.vue'

const router = new VueRouter()

describe('Index.vue', () => {
  function setUp () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      actions: {},
      getters: {}
    })
    const wrapper = shallowMount(Index, {
      store,
      localVue,
    })

    return {
      wrapper,
      router
    }
  }

  beforeEach(() => {
    router.push = jest.fn()
  })

  test('load index.vue', () => {
    const fetchUsers = jest.fn()
    
    const {wrapper} = setUp({ fetchUsers })

    expect(wrapper.findComponent(List).props().items).toEqual([])
    expect(fetchUsers).toHaveBeenCalled()
  })

  test('redirect to other url', async () => {
    const getters = {
        [GET_USERS]: () => [ {login: {uuid: 2}}]
      }
    const { wrapper, router } = setUp({getters})
    await new Promise(resolve => setImmediate(resolve))
    wrapper.findComponent(List).vm.$emit('selectedValue', 0)

    wrapper.findComponent(BasicButton).vm.$emit('onClick')

    expect(router.push).toHaveBeenCalledWith({ name: 'userDetail', params: { uuid: 2 } })
  })

  test('filter list by age', async () => {
    var user = {dob: {age: "24"}, gender:'male', nat: 'NAT'}
    var expectedUser = {dob: {age: "28"}, gender:'female', nat: 'USA' }
    const getters = {
        [GET_USERS]: () => [ user, expectedUser]
      }
    const { wrapper } = setUp({getters})
    await new Promise(resolve => setImmediate(resolve))
    
    wrapper.findComponent(TextField).vm.$emit('valueOnChange', "28")

    expect(wrapper.vm.$data.itemsFiltered).toEqual([ expectedUser])
  })
})
