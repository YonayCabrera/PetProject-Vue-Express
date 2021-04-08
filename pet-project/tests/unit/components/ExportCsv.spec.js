import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ExportCsv from '@/components/ExportCsv.vue'
import { GET_FAVOURITE_USERS } from '@/store/actions/actionTypes'
import { exportToCsv } from '@/utils/exportToCsv'
import BasicButton from '@/components/BasicComponents/BasicButton.vue';


describe('ExportCsv.vue', () => {
  function setUp ({
    getFavouriteUsers = jest.fn()
  } = {}) {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const actions = {
      [GET_FAVOURITE_USERS]: getFavouriteUsers
    }
    const store = new Vuex.Store({
      actions
    })
    const wrapper = shallowMount(ExportCsv, {
      store,
      localVue,
    })
    return {
      wrapper,
      actions
    }
  }

  test('load ExportCsv.vue', async () => {
    var user =givenAUser()
    const users = [user]
    const getFavouriteUsers = jest.fn(() => Promise.resolve(users))
    
    const {wrapper} = setUp({ getFavouriteUsers })
    await new Promise(resolve => setImmediate(resolve))

    expect(getFavouriteUsers).toHaveBeenCalled()
    expect(wrapper.findAll('#personalData').at(0).text()).toBe(`${user.gender}, ${user.name.first} ${user.name.last}, ${user.nat}, ${user.dob.date}, ${user.registered.date}`)
  })

  test('export data in csv format', async () => {
    var user =givenAUser()
    const users = [user]
    exportToCsv.execute = jest.fn()
    const getFavouriteUsers = jest.fn(() => Promise.resolve(users))
    const {wrapper} = setUp({ getFavouriteUsers })
    await new Promise(resolve => setImmediate(resolve))

    wrapper.findComponent(BasicButton).vm.$emit('onClick')

    expect(exportToCsv.execute).toHaveBeenCalled()
  })

  function givenAUser() {
      return {
        gender:'female',  
        login:{uuid: 2},
        picture: {thumbnail: 'anyThumbail'},
        name: {first: 'anyName', last: 'anyLastName'},
        location: {city: '', street: {street: ''}, coordinates:{latitude:'5.9', longitude:'6.4'}},
        email: 'anyEmail',
        phone: '899899899',
        cell: '677677677',
        nat: 'USA',
        registered: {date: 'anyRegisteredDate'},
        dob: {date: 'anyDobDate'}
      }
  }
})
