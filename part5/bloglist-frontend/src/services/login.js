import axios from 'axios'

const login = async (username, password) => {
  const data = { username, password }
  const response = await axios.post('/api/login', data)
  const token = response.data
  return token
}

const loginService = { login }

export default loginService
