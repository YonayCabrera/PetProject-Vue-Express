import { shallowMount } from '@vue/test-utils'
import Loading from '@/components/BasicComponents/Loading.vue'


describe('Loading.vue', () => {
  function setUp ({visible = false, color = '#001392', isBlocked=false} = {}) {

    const wrapper = shallowMount(Loading, {
      propsData: {
        visible,
        color,
        isBlocked
      }
    })
    return {
      wrapper
    }
  }

  test('load Loading.vue with default values', async () => {
    const {wrapper} = setUp()

    expect(wrapper.find("#progress-circular").exists()).toBe(false)
    expect(wrapper.find(".blocked-loader").exists()).toBe(false)
  })

  test('show Loading.vue', async () => {
    const {wrapper} = setUp({visible: true, isBlocked: true, color: "anyColor"})

    expect(wrapper.find("#progress-circular").exists()).toBe(true)
    expect(wrapper.find("#progress-circular").props().color).toBe("anyColor")
    expect(wrapper.find(".blocked-loader").exists()).toBe(true)
  })
})
