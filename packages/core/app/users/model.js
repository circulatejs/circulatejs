const Joi = require('@hapi/joi')
const Schwifty = require('schwifty')

const User = async (server) => {
  server.schwifty(
    class User extends Schwifty.Model {
      static get tableName() {
        return 'User'
      }

      static get joiSchema() {
        return Joi.object({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string().email(),
          username: Joi.string(),
          password: Joi.string()
        })
      }

      static createNotFoundError(queryContext) {
        // eslint-disable-next-line
        return new this.createNotFoundError()
      }
    }
  )

  const knex = server.knex()

  await knex.schema.hasTable('User').then(async (exists) => {
    if (!exists) {
      await knex.schema
        .createTable('User', (table) => {
          table.increments('id').primary()
          table.string('name').notNullable()
          table.string('email').unique().notNullable()
          table.string('username').unique().notNullable()
          table.string('password').notNullable()
        })
        .then(() => {
          console.log('Successfully created User table.')
        })
        .catch((e) => {
          console.error('Error when trying to create User table', e)
        })
    }
  })
}

module.exports = User
