# generator-prospero [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Template generator for the Storm Bespoke Solution Framework targeting .NET Core

## Installation

First, install [Yeoman](http://yeoman.io) and generator-prospero using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-prospero
```


Alternatively, you can just link the source directory:

```bash
npm link
```

Then go to the directory where you would like to contain it and generate your new project:

```bash
yo prospero
```




## Getting To Know Prospero

This generator creates a standard Core + Service + Web + UnitTests solution, together with Cake build scripts, using the Prospero stack. This template is fully configured with Data Access, and also supports Entity Framework Code First Migrations.


Migrations can be accessed via <Project>.Web > "dotnet ef [migrations|database] <command>". Any concrete class inheriting from `Entity` is added to the model. When using collection properties, make sure to add an implementation of IEntityTypeOverride<YourEntity> and configure the HasOne() and HasMany() sides.

Documentation: [https://stormid.github.io](https://stormid.github.io)

## License

MIT ©


[npm-image]: https://badge.fury.io/js/generator-prospero.svg
[npm-url]: https://npmjs.org/package/generator-prospero
[travis-image]: https://travis-ci.org/stormid/generator-prospero.svg?branch=master
[travis-url]: https://travis-ci.org/stormid/generator-prospero
[daviddm-image]: https://david-dm.org/stormid/generator-prospero.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stormid/generator-prospero
[coveralls-image]: https://coveralls.io/repos/stormid/generator-prospero/badge.svg
[coveralls-url]: https://coveralls.io/r/stormid/generator-prospero
