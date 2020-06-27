const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const settings = require('../settings')

const userModel = require('./model')

exports.plugin = {
  name: '@circulatejs/users',
  register: async (server) => {
    await userModel(server)

    // Create Login route
    await server.route({
      method: 'POST',
      path: `${settings.ADMIN_LOCATION}/api/login`,
      handler: async (request, h) => {
        const { User } = server.models()
        const { username, password } = request.payload

        const user = await User.query()
          .findOne({
            username: username
          })
          .then((userData) => {
            return userData
          })
          .catch((err) => {
            return err
          })

        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) {
            const token = await jwt.sign(username, settings.AUTH_KEY)
            return { auth: true, token }
          } else {
            return {
              auth: false,
              text: 'Username or password invalid'
            }
          }
        } else {
          return {
            auth: false,
            text: 'Username or password invalid'
          }
        }
      }
    })

    // Create new user
    await server.route({
      method: 'POST',
      path: `${settings.ADMIN_LOCATION}/api/user/create`,
      handler: async (request, h) => {
        const { User } = server.models()
        const { username, password, email, name } = request.payload

        const addUser = await bcrypt.hash(password, 10).then(async (hash) => {
          return await Promise.all([
            User.query().insert({
              username,
              email,
              name,
              password: hash
            })
          ])
            .then((response) => {
              const user = response[0]
              return `User ${user.username} successfully created`
            })
            .catch((error) => {
              console.error(error)
              if (error.nativeError.errno === 19) {
                return 'That user already exists'
              }
              return 'There was an error creating user'
            })
        })

        return await h.response({ user: addUser })
      },
      options: {
        auth: 'jwt'
      }
    })
  }
}
