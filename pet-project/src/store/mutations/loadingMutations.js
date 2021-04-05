import {SET_LOADING} from './mutationTypes'

export default {
    [SET_LOADING]: (state, loading) => {
        state.isLoading = loading
    }
}