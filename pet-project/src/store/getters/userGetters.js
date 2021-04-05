import {GET_USER_BY_UUID} from './getterTypes'
import { deepClone } from '../helper/cloneHelper'

export default {
    [GET_USER_BY_UUID]: (state) => (uuid) => {
        var users = deepClone(state.users)
        var user = users.filter(user => user.login.uuid === uuid)
        if(user[0] != undefined) return user[0]
        return {}
    }
}