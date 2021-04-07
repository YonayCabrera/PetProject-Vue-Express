
export default function userClient (restClient) {
  function getUsers() {
    return restClient().get('http://localhost:5000/users')
  }

  function getUsersFromExternalApi() {
    return restClient().get('https://randomuser.me/api/?results=100')
  }

  return {
    getUsers,
    getUsersFromExternalApi
  }
}
