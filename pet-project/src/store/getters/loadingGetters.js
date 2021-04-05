import {GET_LOADING} from './getterTypes'

export default {
    [GET_LOADING]: (state) => {
        return state.isLoading
    }
}