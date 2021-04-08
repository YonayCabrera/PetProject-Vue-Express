import axios from 'axios'
export default function restClient() {
    function get(url) {
        return axios.get(url)
    }

    function post(url, body) {
        axios.post(url,body)
    }

    function put(url, body) {
        axios.put(url,body)
    }

    return {
        get,
        post,
        put
    }
}