import axios from 'axios'

const login = async (username, password) => {
  const data = { username, password }
  try {
    const response = await axios.post('/api/login', data)
    const token = response.data
    return token
  }
  catch(err) {
    const response = err.response
    console.log(response.status, response.data)
    return null
  }
}

const loginService = { login }

export default loginService
