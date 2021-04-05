import {SET_USERS} from './mutationTypes'

export default {
    [SET_USERS]: (state, users) => {
        state.users = users
    }
}