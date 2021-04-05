import { FETCH_USERS } from './actionTypes'
import {SET_USERS} from '../mutations/mutationTypes'

export default {
    [FETCH_USERS]: ({commit}, users) => {
        commit(SET_USERS, users)
    }
}