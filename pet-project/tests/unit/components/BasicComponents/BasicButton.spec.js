import { shallowMount } from '@vue/test-utils'
import BasicButton from '@/components/BasicComponents/BasicButton.vue'


describe('BasicButton.vue', () => {
  function setUp ({color = '', name = ''} = {}) {

    const wrapper = shallowMount(BasicButton, {
      propsData: {
        color,
        name
      }
    })
    return {
      wrapper
    }
  }

  test('load BasicButton.vue', async () => {
    var color = "anyColor"
    var name = "anyName"
    const {wrapper} = setUp({ color, name })

    expect(wrapper.find("#button").props().color).toBe(color)
    expect(wrapper.find("#button").text()).toBe(name)
  })
})