import { shallowMount } from '@vue/test-utils'
import List from '@/components/BasicComponents/List.vue'


describe('List.vue', () => {
  function setUp ({items = []} = {}) {

    const wrapper = shallowMount(List, {
      propsData: {
        items
      }
    })
    return {
      wrapper
    }
  }

  test('load List.vue', async () => {
    var items = [givenAUser()]
    const {wrapper} = setUp({ items })

    expect(wrapper.find("#content").text()).toBe(`${items[0].gender}, ${items[0].name.first} ${items[0].name.last}, ${items[0].email}, ${items[0].nat}, ${items[0].dob.date}, ${items[0].dob.age}, ${items[0].registered.date}`)
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
      dob: {date: 'anyDobDate', age:'anyAge'}
    }
}
})