import { shallowMount } from '@vue/test-utils'
import Avatar from '@/components/BasicComponents/Avatar.vue'


describe('Avatar.vue', () => {
  function setUp ({src = ''} = {}) {

    const wrapper = shallowMount(Avatar, {
      propsData: {
        src
      }
    })
    return {
      wrapper
    }
  }

  test('load Avatar.vue with src', async () => {
    var src = "anySrc"
    const {wrapper} = setUp({ src })

    expect(wrapper.find("#image").props().src).toBe(src)
  })
})