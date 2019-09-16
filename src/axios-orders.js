import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://food-app-cbb1c.firebaseio.com/'
})

export default instance;