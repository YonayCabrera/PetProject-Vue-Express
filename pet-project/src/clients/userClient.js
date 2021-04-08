
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
    restClient().put('http://localhost:5000/users', user)
  }

  return {
    getUsers,
    updateUser,
    getUsersFromExternalApi,
    getUsersByUuid
  }
}
