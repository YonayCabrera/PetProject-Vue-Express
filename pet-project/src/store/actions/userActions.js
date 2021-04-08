import { FETCH_USERS, FETCH_USERS_FROM_API, GET_USERS_BY_UUID, SET_FAVOURITE_USER_PROPERTY, GET_FAVOURITE_USERS, SAVE_USERS } from './actionTypes'
import {SET_USERS, SET_LOADING} from '../mutations/mutationTypes'
import {usersClient} from '../../clients/restClientFactory'

export default {
    [FETCH_USERS]: async ({commit}) => {
        commit(SET_LOADING, true)
        var response = await usersClient.getUsers()
        commit(SET_USERS, response.data)
        commit(SET_LOADING, false)
    },
    [FETCH_USERS_FROM_API]: async ({commit}) => {
        commit(SET_LOADING, true)
        var response = await usersClient.getUsersFromExternalApi()
        commit(SET_USERS, response.data.results)
        commit(SET_LOADING, false)
    },
    [GET_USERS_BY_UUID]: async ({commit}, uuid) => {
        commit(SET_LOADING, true)
        var response = await usersClient.getUsersByUuid(uuid)
        commit(SET_LOADING, false)
        return response.data
    },
    [SET_FAVOURITE_USER_PROPERTY]: ({commit}, user) => {
        commit(SET_LOADING, true)
        usersClient.updateUser(user)
        commit(SET_LOADING, false)
        return
    },
    [GET_FAVOURITE_USERS]: async ({commit}) => {
        commit(SET_LOADING, true)
        var response = await usersClient.getFavouriteUsers()
        commit(SET_LOADING, false)
        return response.data
    },
    [SAVE_USERS]: async ({commit}, users) => {
        commit(SET_LOADING, true)
        usersClient.saveUsers(users)
        commit(SET_LOADING, false)
    }
}