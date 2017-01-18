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
      this.templatePath('.jshintrc'),
      this.destinationPath('.jshintrc')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
