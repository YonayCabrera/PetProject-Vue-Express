import axios from 'axios'
export default function restClient() {
    function get(url) {
        return axios.get(url)
    }

    function post(url, body) {
        return axios.post(url,body)
    }

    function put(url, body) {
        return axios.put(url,body)
    }

    return {
        get,
        post,
        put
    }
}