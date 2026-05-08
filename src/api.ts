import axios from 'axios'

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities'

function createAPI() {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  })
}

export { createAPI }
