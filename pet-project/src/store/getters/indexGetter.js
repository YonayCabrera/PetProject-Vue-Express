import UserGetter from './userGetters'
import LoadingGetter from './loadingGetters'

export default {
    ...UserGetter,
    ...LoadingGetter
}