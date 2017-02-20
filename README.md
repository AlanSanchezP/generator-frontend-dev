# generator-frontend-dev [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Yeoman generator for frontend development using gulp, stylus, nunjucks and jshint.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-frontend-dev using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-frontend-dev
```

Then generate your new project:

```bash
yo frontend-dev
```

And it's done! You can now run gulp and start to code!

```bash
gulp
```

**IMPORTANT!**

Yeoman will try to install all the node and bower dependencies that you need to work, but if it fails you will have to run **npm install** and **bower install** before coding. Also, you need to install the following global packages:

```bash
npm install -g gulp bower stylus jshint
```

## What does this generator do?

It basically uses stylus and nunjucks to help you to keep your html/css code modularized (of course, these files are compiled into html/css...). But there are some extra stuff you are able to do, such as...

* Add 'active' classes in your navbar, or any other section-dependant css class, without repeating code
* Code without worrying about vendor prefixes
* Run a local server using an avaibalbe port
* Automatically concatenate all your code
* Automatically concatenate your bower dependencies
* Improve the quality of your js code
* Generate your own iconfont with custom svg images, without having to manually create the font files
* Minify all your images, styles, scripts and bower dependencies
* Use your favourite css framework. Because not everyone likes to use bootstrap.
* Upload your compiled files to gh-pages
* Set your custom domain to gh-pages

Additionally, the stylus core of this generator comes with some useful mixins and classes (more information below).

## Directory structure

Here is a short explanation of each file and directory that is generated (excluding the obvious ones...):

* **.jshintrc**: Contains the jshint settings, feel free to modify it. [Learn more about it](http://jshint.com/docs/options/)
* **gulpfile.js**: Main gulpfile that imports single gulptasks
* **gulpconfig.js**: Configuration file for paths and other values used in gulptasks.
* **gulptasks/**:  A folder that contains individual files for each gulptask that is used by the main gulpfile.
* **src/**: All the code and resources that you will create to your project.
  * **templates/**: Nunjucks files
    * **partials/**: subfolder that contains the base layout, as well as navbar and footer files. You can add as many partials you need.
    * **sections/**: subfolder that contains all the files that are going to be actual sections on your website.
  * **styl/**: Just like the templates folder, it's divided in sections and partials subfolders.
    * **vars.styl**: Contains declaration of variables
    * **mixins.styl**: Contains declaration of mixins and functions
    * **fonts.styl**: Declaration of fonts
    * **utils.styl**: Utility classes that are not directly part of the website's styles.
    * **base.styl**: Styles shared between all (or most) of sections and that are part of the website's styles. It includes navbar and footer files by default.
    * **main.styl**: Imports all the other files.

## Stylus utilities

**vars.styl**, **mixins.styl** and **utils.styl** files come with some useful resources.

* **vars.styl** (All variables begin with $ symbol)
  * Variables for font-weights (based on [MDN name mapping](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)).
  * $baseFontSize: font-size of the whole (desktop) website.

* **mixins.styl**
  * center-block(): short alias for margin-left: auto; margin-right: auto;
  * remify(pxsize): Transforms a pixel-based size into a rem-based one (depends on $baseFontSize)
  * simple-border(side, width, color, style [default: solid]): Creates a border. **side** parameter could take the following values: 'top', 'bottom', 'right', 'left', 'topbottom', 'leftright', 'notop', 'nobottom', 'noleft', 'noright', 'all'

* **utils.styl**
  * .cover: background-size: cover; background-position: center;
  * .simple-parallax: Uses background-attachment property to emulate a parallax effect (although it's not the same). It is deleted on mobile devices.
  * .vertical-center: Uses flexbox to allow you to finally center vertically anything (Use it in the parent element)

## Gulptasks

All the tasks, with the only exception of **deploy** can take the --production flag. If you don't use it, all the files will be compiled into the build/ directory. If you use it, the destination directory will be dist/, and all the resources are going to be minified. This is useful to keep the development and production final resources separated.

* **build:html**: Renders nunjucks code into html files. Each .njk file inside /templates/sections is going to be rendered into an html file with the same name (e.g. contact.njk -> contact.html)

* **build:styles**: Compiles stylus code into a single css file called main.css

* **build:scripts**: Concatenates all files inside /js folder into a single js named as the project.

* **build:bower**: Concatenates all css and js code of bower dependencies into single files that follow the structure project.libs.extension

* **copy:fonts**: Copies both your custom fonts and bower dependencies' fonts.

* **copy:images**: Copies all images to the destination folder.

* **server:run**: Launches a localserver to serve all destination files

* **server:reload**: Reloads the localserver.

* **create:cname**: Creates a CNAME file with the domain that you want to use in your page

* **deploy**: Uploads /dist folder to github pages.

* **build**: Shorcut for all build:* tasks.

* **watch**: Watches all build:* tasks

* **serve**: Shorcut for server:run and server:reload

* **default**: Launches build, watch and serve tasks.

**IMPORTANT!**

* build:styles and build:scripts taks will concatenate your files in an alphabetical order.
* If you use --production, create:cname will be included into the default task. Otherwise, serve and watch will take its place.

## Gulpconfig file

The gulpconfig file manages the paths that gulptasks will use to listen and create files, as well as some values such as the website domain (create:cname). Since you can look at it to see the paths values, we will explain just the last section of the file, the **etc** object.

* **etc**: Contains all values that are not paths and are needed in any gulptask.
  * **domain**: Custom (and already bought) domain for your gh-page. Its default value is '' (empty string). You can use this value, as well as false, undefined and null, to tell the cname gulptask not to create CNAME file.
  * **projectName**: Value that is used by build:html task to access to the original project name that you passed to the generator options.
  * **formattedName**: This property is used by nunjucks templates to access to the project's formatted name (lowercased and with all spaces replaced by underscores). However, this property is an alias for the package variable of the gulpconfig file. This means that if you want to change its value you'd rather change the **package**'s value, since **outputs** object also depends on this value.

## Generator options

> Project name (default: directory name)

This is the name that will be used in the package.json and bower.json files. It's also the name of the index section.

> Only-frontend project (default: true)

If false, the following gulptasks won't be available:
 * build:html
 * serve (both run and reload)
 * create:cname
 * deploy

Additionally, the whole src/templates directory won't be generated.

> CSS Framework (default: Bootstrap)

CSS Framework that you will use. This helps you by writing the proper bower overrides.

> Use Font Awesome (default: true)

It works just like the css framework option.

## Section subgenerator

You can create a new section, with its respective nunjucks and styus files, by running

```bash
yo frontend-dev:section
```

> Section name (default: Contact)

Text that will be used in the title tag of this section. It's also the name of the file, formatted just as follows:

'About us' generates 'about_us.njk'

> Create stylus file (default: true)

Lets you choose if you want to create the stylus empty file inside styl/sections

You can use the --name flag to change the default section name

```bash
yo frontend-dev:section --name='Gallery'
```

**IMPORTANT!**

If your project was generated as an only-frontend one, this subgenerator won't be useful (the nunjucks template won't be compiled).

## Using NVM?

If after installing the generator you are still unable to use it? You may want to see [this issue](https://github.com/yeoman/yo/issues/406) in the yeoman repository.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Alan Sanchez]()


[npm-image]: https://badge.fury.io/js/generator-frontend-dev.svg
[npm-url]: https://npmjs.org/package/generator-frontend-dev
[travis-image]: https://travis-ci.org/AlanSanchezP/generator-frontend-dev.svg?branch=master
[travis-url]: https://travis-ci.org/AlanSanchezP/generator-frontend-dev
[daviddm-image]: https://david-dm.org/AlanSanchezP/generator-frontend-dev.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/AlanSanchezP/generator-frontend-dev
[coveralls-image]: https://coveralls.io/repos/AlanSanchezP/generator-frontend-dev/badge.svg
[coveralls-url]: https://coveralls.io/r/AlanSanchezP/generator-frontend-dev
