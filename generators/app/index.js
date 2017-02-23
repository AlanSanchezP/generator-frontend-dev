'use strict';
var Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  latinize = require('latinize');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the posh ' + chalk.green('generator-frontend-dev') + ' generator!'
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
    },
    {
      type: 'confirm',
      name: 'useFontAwesome',
      message: 'Do you want to use FontAwesome?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var filename = latinize(this.props.name).toLowerCase().replace(/ /g, '_');

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
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {
        name: this.props.name,
        cssFramework: this.props.cssFramework,
        useFontAwesome: this.props.useFontAwesome
      }
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        onlyFrontend: this.props.onlyFrontend
      }
    );
    this.fs.copy(
      this.templatePath('.jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copyTpl(
      this.templatePath('gulpconfig.js'),
      this.destinationPath('gulpconfig.js'),
      {
        filename: filename,
        projectName: this.props.name,
        onlyFrontend: this.props.onlyFrontend
      }
    );
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {
        onlyFrontend: this.props.onlyFrontend
      }
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
    this.fs.copy(
      this.templatePath('gulptasks/bower.js'),
      this.destinationPath('gulptasks/bower.js')
    );
    this.fs.copy(
      this.templatePath('gulptasks/fonts.js'),
      this.destinationPath('gulptasks/fonts.js')
    );
    this.fs.copy(
      this.templatePath('gulptasks/images.js'),
      this.destinationPath('gulptasks/images.js')
    );
    this.fs.copy(
      this.templatePath('gulptasks/scripts.js'),
      this.destinationPath('gulptasks/scripts.js')
    );
    this.fs.copy(
      this.templatePath('gulptasks/styles.js'),
      this.destinationPath('gulptasks/styles.js')
    );
    if (this.props.onlyFrontend) {
      this.fs.copy(
        this.templatePath('nunjucks/**/*'),
        this.destinationPath('src/templates/')
      );
      this.fs.copy(
        this.templatePath('gulptasks/html.js'),
        this.destinationPath('gulptasks/html.js')
      );
      this.fs.copy(
        this.templatePath('gulptasks/cname.js'),
        this.destinationPath('gulptasks/cname.js')
      );
      this.fs.copy(
        this.templatePath('gulptasks/ghpages.js'),
        this.destinationPath('gulptasks/ghpages.js')
      );
      this.fs.copy(
        this.templatePath('gulptasks/server.js'),
        this.destinationPath('gulptasks/server.js')
      );
    }
  }/*,

  install: function () {
    this.installDependencies();
  }*/
});
