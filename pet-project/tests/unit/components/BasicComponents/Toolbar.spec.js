import { shallowMount } from '@vue/test-utils'
import Toolbar from '@/components/BasicComponents/Toolbar.vue'


describe('Toolbar.vue', () => {
  function setUp ({color = ''} = {}) {

    const wrapper = shallowMount(Toolbar, {
      propsData: {
        color
      }
    })
    return {
      wrapper
    }
  }

  test('load Icon.vue', async () => {
    var color = "anyColor"
    const {wrapper} = setUp({ color})

    expect(wrapper.find("#toolbar").props().color).toBe(color)
  })
})