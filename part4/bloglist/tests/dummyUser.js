const bcrypt = require('bcrypt')

const dummyUser = async () => {
  const password = 'password'
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const userData = {
    username: 'username',
    name: 'name',
    passwordHash: passwordHash
  }
  return userData
}

module.exports = dummyUser
