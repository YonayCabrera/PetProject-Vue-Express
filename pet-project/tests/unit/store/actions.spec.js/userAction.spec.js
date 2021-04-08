import { FETCH_USERS, FETCH_USERS_FROM_API, GET_USERS_BY_UUID, SET_FAVOURITE_USER_PROPERTY } from '@/store/actions/actionTypes'
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

  test('set user favourite property', async () => {
    const user = {name: 'anyName'}
    let context = { commit: jest.fn() }
    usersClient.updateUser = jest.fn(() => Promise.resolve())

    await userAction[SET_FAVOURITE_USER_PROPERTY](context, user)
    
    expect(usersClient.updateUser).toHaveBeenCalledWith(user)
    expect(context.commit).toHaveBeenCalledWith(SET_LOADING, false)
  })

  test('get user by uuid', async () => {
    const users = [ {name: 'anyName'}]
    const uuid = "23"
    let context = { commit: jest.fn() }
    const response = {data: {results: users}}
    usersClient.getUsersByUuid = jest.fn(() => Promise.resolve(response))

    await userAction[GET_USERS_BY_UUID](context, uuid)
    
    expect(usersClient.getUsersByUuid).toHaveBeenCalledWith(uuid)
    expect(context.commit).toHaveBeenCalledWith(SET_LOADING, false)
  })
})
