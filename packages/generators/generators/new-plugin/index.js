var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  /* eslint-disable */
  // The name `constructor` is important here
  constructor (args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)
  }
  /* eslint-enable */

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'pluginName',
        message: 'What is the name of your plugin?'
      },
      {
        type: 'input',
        name: 'version',
        message: 'What version would you like to start your plugin?',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'Your Model name?'
        // default: this.answers.pluginName
      },
      {
        type: 'input',
        name: 'controllerName',
        message: 'Your controller name?'
        // default: this.answers.pluginName
      }
    ])
  }

  writing() {
    const pluginPath = `./${this.options.path}/${this.answers.pluginName}`
    const modelName = this.answers.modelName
    const controllerName = this.answers.controllerName

    let formattedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1)
    let formattedControllerName = controllerName.charAt(0).toUpperCase() + controllerName.slice(1)

    if (!formattedModelName) {
      formattedModelName = 'Model'
    }

    if (!formattedControllerName) {
      formattedControllerName = 'Controller'
    } else {
      formattedControllerName = formattedControllerName + 'Controller'
    }

    this.fs.copyTpl(
      this.templatePath('./routes.js'),
      this.destinationPath(`${pluginPath}/routes.js`),
      {
        pluginName: this.answers.pluginName,
        version: this.answers.version
      }
    )

    this.fs.copyTpl(
      this.templatePath('./manifest.json'),
      this.destinationPath(`${pluginPath}/manifest.json`),
      {
        pluginName: this.answers.pluginName,
        version: this.answers.version
      }
    )

    this.fs.copyTpl(
      this.templatePath('./models/model.js'),
      this.destinationPath(`${pluginPath}/models/${formattedModelName}.js`),
      {
        modelName: formattedModelName
      }
    )

    this.fs.copyTpl(
      this.templatePath('./controllers/controller.js'),
      this.destinationPath(`${pluginPath}/controllers/${formattedControllerName}.js`),
      {
        controllerName: formattedControllerName
      }
    )
  }

  end() {
    console.log('')
    console.log(`Your plugin ${this.answers.pluginName} has been created. Have fun!`)
    console.log('')
  }
}
