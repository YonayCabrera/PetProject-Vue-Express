import { shallowMount } from '@vue/test-utils'
import MapContainer from '@/components/MapContainer.vue'


describe('MapContainer.vue', () => {
  function setUp () {

    const wrapper = shallowMount(MapContainer, {
      propsData: {
        latitude: 19.876,
        longitude: 20.674
      }
    })
    return {
      wrapper
    }
  }

  test('load MapContainer.vue', async () => {
    const {wrapper} = setUp()
    await new Promise(resolve => setImmediate(resolve))

    var expectedCoordinate = `[
  19.876,
  20.674
]`
    expect(wrapper.find(".content").text()).toBe(expectedCoordinate)
    expect(wrapper.find(".popup").exists()).toBe(true)
  })

  test('close pop up', async () => {
    const {wrapper} = setUp()

    wrapper.find(".icon-close").trigger("click")
    await new Promise(resolve => setImmediate(resolve))

    expect(wrapper.find(".popup").isVisible()).toBe(false)
  })
})
