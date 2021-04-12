import { shallowMount } from '@vue/test-utils'
import Divider from '@/components/BasicComponents/Divider.vue'


describe('Divider.vue', () => {
  function setUp ({vertical = false} = {}) {

    const wrapper = shallowMount(Divider, {
      propsData: {
        vertical
      }
    })
    return {
      wrapper
    }
  }

  test('load Divider.vue', async () => {
    var vertical = true
    const {wrapper} = setUp({ vertical })

    expect(wrapper.find("#divider").props().vertical).toBe(vertical)
  })
})