import userClient from './userClient'
import RestClient from '../utils/restClient'


export const usersClient = userClient(RestClient)