const Generator = require('yeoman-generator');
const fs = require('fs');
const colors = require('colors');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

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
            type: 'input',
            name: 'pluginsPath',
            message: `What path would you like for plugins? (you'll most likely not want to change this)`,
            default: 'plugins'
          },
        {
            type: 'list',
            name: 'installType',
            message: 'Install with Yarn or NPM?',
            choices: ['Yarn', 'NPM']
          }
      ]);
    }

    configuring () {
        if (fs.existsSync(this.options.path)) {
            console.log('That project already exists. Please choose another directory.')
            process.exit(1)
        }
    }

    writing() {
        const destination = this.destinationPath(this.options.path)

        this.fs.copy(
            this.templatePath('bootstrap.js'),
            destination + '/bootstrap.js'
        );

        this.fs.copy(
            this.templatePath('README.md'),
            destination + '/README.md'
        );

        // Copy plugins dir
        this.fs.copyTpl(
            this.templatePath('./_package.json'),
            destination + '/package.json',
            {
                name: this.answers.projectName,
                description: this.answers.desc,
                author: this.answers.author
            }
        );

        this.fs.copyTpl(
            this.templatePath('./_env'),
            destination + '/.env',
            {
                pluginsPath: this.answers.pluginsPath
            }
        );

        // Copy plugins dir
        this.fs.copyTpl(
            this.templatePath('./plugins/_gitkeep'),
            destination + '/' + this.answers.pluginsPath + '/.gitkeep',
            {
                pluginsPath: this.answers.pluginsPath
            }
        );
    }

    async install() {
        if (this.answers.installType === 'Yarn') {
            this.yarnInstall();
        } else {
            this.npmInstall();
        }
    }

    end() {
        console.log('')
        console.log('CircualteJS app created. Have fun!')
        console.log('')
    }
  };
