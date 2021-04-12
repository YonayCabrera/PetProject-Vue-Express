import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import { FETCH_USERS, FETCH_USERS_FROM_API, SAVE_USERS } from '@/store/actions/actionTypes'
import { GET_USERS } from '@/store/getters/getterTypes'
import List from '@/components/BasicComponents/List.vue'
import TextField from '@/components/BasicComponents/TextField.vue'


describe('Index.vue', () => {
  function setUp ({
    fetchUsers = jest.fn(),
    saveUsers = jest.fn(),
    fetchUsersFromApi = jest.fn(),
    getters = { [GET_USERS]: () => []}
  } = {}) {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const actions = {
      [FETCH_USERS]: fetchUsers,
      [FETCH_USERS_FROM_API]: fetchUsersFromApi,
      [SAVE_USERS]: saveUsers
    }
    router.push = jest.fn()
    const store = new Vuex.Store({
      actions,
      getters: getters
    })
    const wrapper = shallowMount(Index, {
      store,
      router,
      localVue,
    })

    return {
      wrapper,
      router
    }
  }

  test('load index.vue', () => {
    const getters = {
      [GET_USERS]: () => [ {login: {uuid: 2}}]
    }
    const fetchUsers = jest.fn()
    const fetchUsersFromApi = jest.fn()
    
    const {wrapper} = setUp({ fetchUsers, fetchUsersFromApi, getters })

    expect(wrapper.findComponent(List).props().items).toEqual([])
    expect(fetchUsers).toHaveBeenCalled()
    expect(fetchUsersFromApi).not.toHaveBeenCalled()
  })

  test('fetch users from external Api', async () => {
    const fetchUsersFromApi = jest.fn(() => Promise.reject)
    
    setUp({ fetchUsersFromApi })
    await new Promise(resolve => setImmediate(resolve))

    expect(fetchUsersFromApi).toHaveBeenCalled()
  })

  test('redirect to other url', async () => {
    const getters = {
        [GET_USERS]: () => [ {login: {uuid: 2}}]
      }
    const { wrapper, router } = setUp({getters})
    await new Promise(resolve => setImmediate(resolve))
    wrapper.findComponent(List).vm.$emit('selectedValue', 0)

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
