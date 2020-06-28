const Generator = require('yeoman-generator')
const fs = require('fs')
const crypto = require('crypto')
const colors = require('colors/safe')

module.exports = class extends Generator {
  /* eslint-disable */
  // The name `constructor` is important here
  constructor (args, opts) {
    super(args, opts)
  }
  /* eslint-enable */

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your CirculateJS project?',
        default: this.options.path.replace(/^.\//, '')
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Description for the project:',
        default: 'My amazing new CirculateJS project!'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author of the project:'
      },
      {
        type: 'list',
        name: 'database',
        message: 'Database Type:',
        choices: ['sqlite', 'mysql'],
        default: 'sqlite'
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'Database Name:',
        default: 'circulatejs'
      },
      {
        type: 'input',
        name: 'dbHost',
        message: 'Database Host:',
        when: (answers) => dbRequiresOptions(answers)
      },
      {
        type: 'input',
        name: 'dbPort',
        message: 'Database Port:',
        when: (answers) => dbRequiresOptions(answers)
      },
      {
        type: 'input',
        name: 'dbUn',
        message: 'Database Username:',
        when: (answers) => dbRequiresOptions(answers)
      },
      {
        type: 'input',
        name: 'dbPw',
        message: 'Database Password:',
        when: (answers) => dbRequiresOptions(answers)
      },
      {
        type: 'input',
        name: 'pluginsPath',
        message:
          "What path would you like for plugins? (you'll most likely not want to change this)",
        default: 'plugins'
      },
      {
        type: 'list',
        name: 'installType',
        message: 'Install with Yarn or NPM?',
        choices: ['Yarn', 'NPM']
      }
    ])

    function dbRequiresOptions(answers) {
      return answers.database === 'mysql'
    }
  }

  configuring() {
    if (fs.existsSync(this.options.path)) {
      console.log(colors.red('That project already exists. Please choose another directory.'))
      console.log('')
      process.exit(1)
    }
  }

  writing() {
    const destination = this.destinationPath(this.options.path)
    const authKey = crypto.randomBytes(256).toString('base64')

    this.fs.copy(this.templatePath('bootstrap.js'), destination + '/bootstrap.js')

    this.fs.copy(this.templatePath('README.md'), destination + '/README.md')

    this.fs.copy(this.templatePath('_gitignore'), destination + '/.gitignore')

    this.fs.copy(this.templatePath('circulate.js'), destination + '/circulate.js')

    // Copy plugins dir
    this.fs.copyTpl(this.templatePath('./_package.json'), destination + '/package.json', {
      name: this.answers.projectName,
      description: this.answers.desc,
      author: this.answers.author
    })

    // Create Environment file
    this.fs.copyTpl(this.templatePath('./_env'), destination + '/.env', {
      pluginsPath: this.answers.pluginsPath,
      database: this.answers.database,
      dbName: this.answers.dbName,
      dbHost: this.answers.dbHost,
      dbPort: this.answers.dbPort,
      dbUn: this.answers.dbUn,
      dbPw: this.answers.dbPw,
      authKey
    })

    // Copy plugins dir
    this.fs.copyTpl(
      this.templatePath('./plugins/_gitkeep'),
      destination + '/' + this.answers.pluginsPath + '/.gitkeep',
      {
        pluginsPath: this.answers.pluginsPath
      }
    )
  }

  async install() {
    process.chdir(this.destinationPath(this.options.path))
    if (this.answers.installType === 'Yarn') {
      this.yarnInstall()
    } else {
      this.npmInstall()
    }
    this.spawnCommand('git', ['init'])
  }

  end() {
    console.log('')
    console.log(colors.blue('Your new CirculateJS app has been created. Have fun!'))
    console.log('')
  }
}
