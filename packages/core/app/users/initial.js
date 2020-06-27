const inquirer = require('inquirer')
const bcrypt = require('bcrypt')

module.exports = async (server) => {
  const { User } = server.models()
  const initialUser = await User.query().first()
  const usersExist = initialUser instanceof Object

  // Check to see if there is at least one user in the DB
  if (!usersExist) {
    console.log("There is no default Admin user in the database. Let's create one now...")
    console.log('')

    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'username',
          message: 'Username:',
          default: 'admin'
        },
        {
          type: 'input',
          name: 'name',
          message: 'Real Name:'
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email:'
        },
        {
          type: 'password',
          name: 'password',
          message: 'Password:'
        }
      ])
      .then(async (answers) => {
        await bcrypt.hash(answers.password, 10).then(async (hash) => {
          await Promise.all([
            User.query().insert({
              username: answers.username,
              name: answers.name,
              email: answers.email,
              password: hash
            })
          ])
            .then((data) => {
              const user = data[0]
              console.log(`User ${user.username} successfully created`)
            })
            .catch((error) => {
              console.log('')
              console.error(error)
              console.log('')
            })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
