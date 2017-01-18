'use strict';
var Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  argv = require('yargs').argv;

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the posh ' + chalk.red('section') + ' generator!'
    ));
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Section name. It will be lower-cased to create the file name, but remain as you write it inside the nunjucks title block.',
      default: argv.name ? argv.name : 'Contact'
    },
    {
      type: 'confirm',
      name: 'stylus',
      message: 'Do you want to create a stylus file too?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },
  writing: function () {
    var filename = this.props.name.replace(' ', '_').toLowerCase();

    this.fs.copyTpl(
      this.templatePath('section.njk'),
      this.destinationPath('src/templates/sections/' + filename + '.njk'),
      {
        name: this.props.name
      }
    );
    if (this.props.stylus) {
      this.fs.copy(
        this.templatePath('section.styl'),
        this.destinationPath('src/styl/sections/' + filename + '.styl')
      );
    }
  },
});