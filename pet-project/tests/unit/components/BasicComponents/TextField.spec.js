import { shallowMount } from '@vue/test-utils'
import TextField from '@/components/BasicComponents/TextField.vue'


describe('TextField.vue', () => {
  function setUp ({value = '', label = '', icon = ''} = {}) {

    const wrapper = shallowMount(TextField, {
      propsData: {
        value,
        label,
        icon
      }
    })
    return {
      wrapper
    }
  }

  test('load TextField.vue', async () => {
    var value = "anyValue"
    var label = "anyLabel"
    var icon = "anyIcon"
    const {wrapper} = setUp({ value, label, icon })

    const expectedProps = {
      value,
      label,
      appendIcon: icon
    }
    expect(wrapper.find("#textField").props()).toMatchObject(expectedProps)
  })
})