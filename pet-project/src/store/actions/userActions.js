import { FETCH_USERS, FETCH_USERS_FROM_API } from './actionTypes'
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
    }
}