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
        message: 'Your Model name?',
        default: 'Model'
      },
      {
        type: 'input',
        name: 'controllerName',
        message: 'Your Controller name?',
        default: 'Controller'
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Your Admin component name?',
        default: 'Component'
      }
    ])
  }

  writing() {
    const pluginPath = `./${this.options.path}/${this.answers.pluginName}`
    const modelName = this.answers.modelName
    const controllerName = this.answers.controllerName
    const componentName = this.answers.componentName

    let formattedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1)
    let formattedControllerName = controllerName.charAt(0).toUpperCase() + controllerName.slice(1)
    let formattedcomponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

    if (!formattedModelName) {
      formattedModelName = 'Model'
    }

    if (!formattedControllerName) {
      formattedControllerName = 'Controller'
    } else {
      formattedControllerName = formattedControllerName + 'Controller'
    }

    if (!formattedcomponentName) {
      formattedcomponentName = 'Component'
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
      this.templatePath('./models/model.txt'),
      this.destinationPath(`${pluginPath}/models/${formattedModelName}.js`),
      {
        modelName: formattedModelName
      }
    )

    this.fs.copyTpl(
      this.templatePath('./controllers/controller.txt'),
      this.destinationPath(`${pluginPath}/controllers/${formattedControllerName}.js`),
      {
        controllerName: formattedControllerName
      }
    )

    this.fs.copyTpl(
      this.templatePath('./admin/Component.vue'),
      this.destinationPath(`${pluginPath}/admin/${formattedcomponentName}.vue`),
      {
        componentName: formattedcomponentName
      }
    )
    this.fs.copyTpl(
      this.templatePath('./admin/adminRoutes.txt'),
      this.destinationPath(`${pluginPath}/admin/adminRoutes.js`),
      {
        path: componentName.toLowerCase(),
        webpackChunkName: componentName.toLowerCase(),
        componentName: formattedcomponentName
      }
    )
  }

  end() {
    console.log('')
    console.log(`Your plugin ${this.answers.pluginName} has been created. Have fun!`)
    console.log('')
  }
}
