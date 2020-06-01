var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async prompting() {
      this.answers = await this.prompt([
        {
          type: 'input',
          name: 'pluginName',
          message: 'What is the name of your plugin?'
        },
        {
          type: input,
          name: 'version',
          message: 'What version would you like to start your plugin?',
          default: '1.0.0'
        }
      ]);
    }

    writing() {
        this.fs.copyTpl(
          this.templatePath('./'),
          this.destinationPath('./plugins/' + this.answers.pluginName),
          {
            pluginName: this.answers.pluginName,
            version: his.answers.version
          }
        );
    }

    end() {
        console.log(`Your plugin ${this.answers.pluginName} created.`)
    }
  };
