import { GET_USER_BY_UUID } from '@/store/getters/getterTypes'
import userGetters from '@/store/getters/userGetters'
import initialState from '@/store/initialState'

describe('userGetters', () => {
  test('get user', () => {
     const expectedUser =  { login: {uuid: 'expectedId' }}
    const users = [{ login: {uuid: 'anyId' }}, expectedUser]
    let state = { ...initialState, users: users }

    const result = userGetters[GET_USER_BY_UUID](state)(expectedUser.login.uuid)

    expect(result).toEqual(expectedUser)
  })
})