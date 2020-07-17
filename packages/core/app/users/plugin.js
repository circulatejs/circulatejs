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
        const user = await User.query().findOne({ username })

        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) {
            const token = jwt.sign({ username, name: user.name }, settings.AUTH_KEY)
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

    // Get all users
    await server.route({
      method: 'GET',
      path: `${settings.ADMIN_LOCATION}/api/users`,
      handler: async (request, h) => {
        const { User } = server.models()
        const users = await User.query().select('id', 'name', 'email')

        return await h.response({ users })
      },
      options: {
        auth: 'jwt'
      }
    })

    // Get single user
    await server.route({
      method: 'GET',
      path: `${settings.ADMIN_LOCATION}/api/user/{id}`,
      handler: async (request, h) => {
        const { User } = server.models()
        const id = request.params.id
        const user = await User.query().findById(id).select('username', 'name', 'email')

        return await h.response({ user })
      },
      options: {
        auth: 'jwt'
      }
    })

    // Remove single user
    await server.route({
      method: 'DELETE',
      path: `${settings.ADMIN_LOCATION}/api/user/remove/{id}`,
      handler: async (request, h) => {
        const { User } = server.models()
        const id = request.params.id
        const removed = {
          message: '',
          error: false
        }

        const removeUser = await User.query().deleteById(id)

        if (removeUser === 1) {
          removed.message = 'User has been removed'
        } else {
          removed.message = 'There was an error removing the user'
          removed.error = true
        }

        return await h.response(removed)
      },
      options: {
        auth: 'jwt'
      }
    })
  }
}
