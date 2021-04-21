
export default function userClient (restClient) {
  function getUsers() {
    return restClient().get('http://localhost:5000/users')
  }

  function getUsersFromExternalApi() {
    return restClient().get('https://randomuser.me/api/?results=100')
  }
  
  function getUsersByUuid(uuid) {
    return restClient().get(`http://localhost:5000/users/${uuid}`)
  }
  
  function updateUser(user) {
    return restClient().put('http://localhost:5000/users', user)
  }
  
  function getFavouriteUsers() {
    return restClient().get('http://localhost:5000/favouriteUsers')
  }
  
  function saveUsers(users) {
    return restClient().post('http://localhost:5000/users', users)
  }

  return {
    getUsers,
    updateUser,
    getUsersFromExternalApi,
    getUsersByUuid,
    getFavouriteUsers,
    saveUsers
  }
}
