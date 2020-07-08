const Joi = require('@hapi/joi')
const Schwifty = require('schwifty')

module.exports = async (server) => {
  server.schwifty(
    class <%= modelName %> extends Schwifty.Model {
      static get tableName() {
        return '<%= modelName %>'
      }

      static get joiSchema() {
        return Joi.object({
          // Joi schema goes here
        })
      }
    }
  )
}
