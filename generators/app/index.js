'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the posh ' + chalk.red('generator-frontend-dev') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname
    },
    {
      type: 'confirm',
      name: 'onlyFrontend',
      message: 'Is this an only-frontend project?',
      default: true
    },
    {
      type: 'list',
      name: 'cssFramework',
      message: 'What css framework do you want to use?',
      choices: [
        'Bootstrap',
        'Foundation',
        'Pure.css',
        {
          name: 'Other (you will need to install it manually)',
          value: 'Other'
        }
      ],
      default: 'Bootstrap'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { name: this.props.name }
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      { onlyFrontend: this.props.onlyFrontend }
    );
    this.fs.copy(
      this.templatePath('js/app.js'),
      this.destinationPath('src/js/app.js')
    );
    this.fs.copy(
      this.templatePath('fonts/.gitkeep'),
      this.destinationPath('src/fonts/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('img/.gitkeep'),
      this.destinationPath('src/img/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('svg/.gitkeep'),
      this.destinationPath('src/svg/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('styl/**/*'),
      this.destinationPath('src/styl/')
    );
    if (this.props.onlyFrontend) {
      this.fs.copy(
        this.templatePath('nunjucks/**/*'),
        this.destinationPath('src/templates/')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
