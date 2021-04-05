import { FETCH_LOADING } from './actionTypes'
import {SET_LOADING} from '../mutations/mutationTypes'

export default {
    [FETCH_LOADING]: ({commit}, loading) => {
        commit(SET_LOADING, loading)
    }
}