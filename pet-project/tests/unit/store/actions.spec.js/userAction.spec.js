import { FETCH_USERS, FETCH_USERS_FROM_API } from '@/store/actions/actionTypes'
import { SET_USERS, SET_LOADING } from '@/store/mutations/mutationTypes'
import userAction from '@/store/actions/userActions'
import {usersClient} from '../../../../src/clients/restClientFactory'

describe('userActions.js', () => {
  test('fetch all users', async () => {
    const users = [ {name: 'anyName'}]
    let context = { commit: jest.fn() }
    const response = {data:users}
    usersClient.getUsers = jest.fn(() => Promise.resolve(response))
    
    await userAction[FETCH_USERS](context)
    
    expect(usersClient.getUsers).toHaveBeenCalled()
    expect(context.commit).toHaveBeenCalledWith(SET_USERS, users)
    expect(context.commit).toHaveBeenCalledWith(SET_LOADING, false)
  })

  test('fetch all users from external api', async () => {
    const users = [ {name: 'anyName'}]
    let context = { commit: jest.fn() }
    const response = {data: {results: users}}
    usersClient.getUsersFromExternalApi = jest.fn(() => Promise.resolve(response))

    await userAction[FETCH_USERS_FROM_API](context)
    
    expect(usersClient.getUsersFromExternalApi).toHaveBeenCalled()
    expect(context.commit).toHaveBeenCalledWith(SET_USERS, users)
    expect(context.commit).toHaveBeenCalledWith(SET_LOADING, false)
  })
})
