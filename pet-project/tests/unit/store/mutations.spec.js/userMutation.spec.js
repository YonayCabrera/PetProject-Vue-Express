import { SET_USERS } from '@/store/mutations/mutationTypes'
import userMutations from '@/store/mutations/userMutations'
import initialState from '@/store/initialState'

describe('usersMutations.js', () => {
  test('set users', () => {
    const givenState = { ...initialState, users: [{name: 'anyUser'}] }

    const users = [{name:'newUser'}]
    userMutations[SET_USERS](givenState, users)

    const expectedState = { ...initialState, users: users }
    expect(givenState).toEqual(expectedState)
  })
})