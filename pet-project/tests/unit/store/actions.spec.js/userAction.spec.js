import { FETCH_USERS } from '@/store/actions/actionTypes'
import { SET_USERS } from '@/store/mutations/mutationTypes'
import userAction from '@/store/actions/userActions'

describe('userActions.js', () => {
  test('fetch all users', async () => {
    const users = [ {name: 'anyName'}]
    const context = { commit: jest.fn() }

    userAction[FETCH_USERS](context, users)

    expect(context.commit).toHaveBeenCalledWith(SET_USERS, users)
  })
})