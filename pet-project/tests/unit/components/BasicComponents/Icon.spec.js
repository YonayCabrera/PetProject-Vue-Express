import { shallowMount } from '@vue/test-utils'
import Icon from '@/components/BasicComponents/Icon.vue'


describe('Icon.vue', () => {
  function setUp ({color = '', value = '', size = ''} = {}) {

    const wrapper = shallowMount(Icon, {
      propsData: {
        color,
        value,
        size
      }
    })
    return {
      wrapper
    }
  }

  test('load Icon.vue', async () => {
    var color = "anyColor"
    var value = "anyValue"
    var size = "69"
    const {wrapper} = setUp({ color, value, size })

    expect(wrapper.find("#icon").props().color).toBe(color)
    expect(wrapper.find("#icon").props().size).toBe(size)
    expect(wrapper.find("#icon").text()).toBe(value)
  })

  test('emit event onclick Icon.vue', async () => {
    const {wrapper} = setUp()
    
    wrapper.find("#icon").trigger('click')

    expect(wrapper.emitted().onClick).toBeTruthy()
  })
})