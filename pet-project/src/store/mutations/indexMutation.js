import UserMutation from './userMutations'
import LoadingMutation from './loadingMutations'

export default {
    ...UserMutation,
    ...LoadingMutation
}