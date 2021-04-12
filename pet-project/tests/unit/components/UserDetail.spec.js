import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import UserDetail from '@/components/UserDetail.vue'
import { GET_USERS_BY_UUID, SET_FAVOURITE_USER_PROPERTY } from '@/store/actions/actionTypes'
import MapContainer from '@/components/MapContainer'
import Avatar from '@/components/BasicComponents/Avatar'
import Icon from '@/components/BasicComponents/Icon.vue'


describe('UserDetail.vue', () => {
  function setUp ({
    getUserByUuid = jest.fn(),
    setFavouriteUserProperty = jest.fn()
  } = {}) {
    const actions = {
        [GET_USERS_BY_UUID]: getUserByUuid,
        [SET_FAVOURITE_USER_PROPERTY]: setFavouriteUserProperty
    }
    const store = new Vuex.Store({
      actions: actions,
      getters: {}
    })
    const route = {
        params: { uuid:2 }
    }
    const wrapper = shallowMount(UserDetail, {
      store,
      mocks: {
        $route: route,
      }
    })

    return {
      wrapper
    }
  }

  test('load userDetail.vue', async () => {
    var user = givenAUser()
    const getUserByUuid = jest.fn(() => Promise.resolve(user))
    
    const { wrapper } = setUp({ getUserByUuid })
    await new Promise(resolve => setImmediate(resolve))

    expect(getUserByUuid).toHaveBeenCalledWith(expect.any(Object), user.login.uuid)
    expect(wrapper.findComponent(MapContainer).props().latitude).toBe(parseFloat(user.location.coordinates.latitude))
    expect(wrapper.findComponent(MapContainer).props().longitude).toBe(parseFloat(user.location.coordinates.longitude))
    expect(wrapper.findComponent(Avatar).props().src).toBe(user.picture.thumbnail)
    expect(wrapper.findComponent(Icon).props().color).toBe('grey lighten-1')
    expect(wrapper.findAll("#personal-data").at(0).text()).toBe(`Datos personales: ${user.name.first} ${user.name.last}, ${user.email}`)
    expect(wrapper.findAll("#personal-data").at(1).text()).toBe(`Datos de localización: ${user.location.city}, ${user.location.street.street}, ${user.phone} - ${user.cell}`)
  })
  
  test('active favourite button', async () => {
    var user = givenAUser()
    const getUserByUuid = jest.fn(() => Promise.resolve(user))
    const setFavouriteUserProperty = jest.fn()
    const { wrapper } = setUp({ getUserByUuid, setFavouriteUserProperty })
    await new Promise(resolve => setImmediate(resolve))

    wrapper.findComponent(Icon).vm.$emit('onClick')
    
    user.favorite = true
    expect(setFavouriteUserProperty).toHaveBeenCalledWith(expect.any(Object), user)
  })

  function givenAUser(){
      return {
        login:{uuid: 2},
        picture: {thumbnail: 'anyThumbail'},
        name: {first: 'anyName', last: 'anyLastName'},
        location: {city: '', street: {street: ''}, coordinates:{latitude:'5.9', longitude:'6.4'}},
        email: 'anyEmail',
        phone: '899899899',
        cell: '677677677'
    }
  }
})
