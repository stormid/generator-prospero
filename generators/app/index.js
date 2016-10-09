'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the magnificent ' + chalk.red('generator-prospero') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appname',
      message: 'Your project name',
      default: this.appname
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var appname = this.props.appname;
    var templates = {
      appname:this.props.appname
    };
    
    // Root
    this.scc('global.json', 'global.json', templates);
    this.scc('NuGet.config', 'NuGet.config', templates);
    this.scc('ConventionAspNetApplication.sln', appname + '.sln', templates);


    // Core
    this.scc('src/ConventionAspNetApplication.Core/ConventionAspNetApplication.Core.xproj', 'src/' + appname + '.Core/' + appname + '.Core.xproj', templates);
    this.scc('src/ConventionAspNetApplication.Core/project.json', 'src/' + appname + '.Core/project.json', templates);
    this.scc('src/ConventionAspNetApplication.Core/ConventionAspNetApplicationModelBuilderAlteration.cs', 'src/' + appname + '.Core/' + appname + 'ModelBuilderAlteration.cs', templates);
    this.scc('src/ConventionAspNetApplication.Core/Properties/AssemblyInfo.cs', 'src/' + appname + '.Core/Properties/AssemblyInfo.cs', templates);


    // Service
    this.scc('src/ConventionAspNetApplication.Service/ConventionAspNetApplication.Service.xproj', 'src/' + appname + '.Service/' + appname + '.Service.xproj', templates);
    this.scc('src/ConventionAspNetApplication.Service/project.json', 'src/' + appname + '.Service/project.json', templates);
    this.scc('src/ConventionAspNetApplication.Service/appsettings.json', 'src/' + appname + '.Service/appsettings.json', templates);
    this.scc('src/ConventionAspNetApplication.Service/run.cmd', 'src/' + appname + '.Service/run.cmd', templates);
	this.scc('src/ConventionAspNetApplication.Service/Program.cs', 'src/' + appname + '.Service/Program.cs', templates);
    this.scc('src/ConventionAspNetApplication.Service/ConventionAspNetApplicationService.cs', 'src/' + appname + '.Service/' + appname + 'Service.cs', templates);
    this.scc('src/ConventionAspNetApplication.Service/Properties/AssemblyInfo.cs', 'src/' + appname + '.Service/Properties/AssemblyInfo.cs', templates);


    // Web
    this.scc('src/ConventionAspNetApplication.Web/web.release.config', 'src/' + appname + '.Web/web.release.config', templates);
    this.scc('src/ConventionAspNetApplication.Web/Properties/launchSettings.json', 'src/' + appname + '.Web/Properties/launcSettings.json', templates);
    this.scc('src/ConventionAspNetApplication.Web/ConventionAspNetApplication.Web.xproj', 'src/' + appname + '.Web/' + appname + '.Web.xproj', templates);
    this.scc('src/ConventionAspNetApplication.Web/bundleconfig.json', 'src/' + appname + '.Web/bundleconfig.json', templates);
    this.scc('src/ConventionAspNetApplication.Web/Program.cs', 'src/' + appname + '.Web/Program.cs', templates);
    this.scc('src/ConventionAspNetApplication.Web/project.json', 'src/' + appname + '.Web/project.json', templates);
    this.scc('src/ConventionAspNetApplication.Web/Startup.cs', 'src/' + appname + '.Web/Startup.cs', templates);
    this.scc('src/ConventionAspNetApplication.Web/web.config', 'src/' + appname + '.Web/web.config', templates);
    this.scc('src/ConventionAspNetApplication.Web/appsettings.json', 'src/' + appname + '.Web/appsettings.json', templates);

    this.scc('src/ConventionAspNetApplication.Web/wwwroot/css/site.css', 'src/' + appname + '.Web/wwwroot/css/site.css', templates);
    this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner1.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);
    this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner2.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);
    this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner3.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);
    this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner4.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);

    this.scc('src/ConventionAspNetApplication.Web/wwwroot/js/site.js', 'src/' + appname + '.Web/wwwroot/js/site.js', templates);
    this.scc('src/ConventionAspNetApplication.Web/wwwroot/favicon.ico', 'src/' + appname + '.Web/wwwroot/favicon.ico', templates);

    this.scc('src/ConventionAspNetApplication.Web/Core/Factories/ConventionAspNetApplicationDbContextFactory.cs', 'src/' + appname + '.Web/Core/Factories/' + appname + 'DbContextFactory.cs', templates);
    this.scc('src/ConventionAspNetApplication.Web/Controllers/HomeController.cs', 'src/' + appname + '.Web/Controllers/HomeController.cs', templates);

    this.scc('src/ConventionAspNetApplication.Web/Views/Home/About.cshtml', 'src/' + appname + '.Web/Views/Home/About.cshtml', templates);
    this.scc('src/ConventionAspNetApplication.Web/Views/Home/Contact.cshtml', 'src/' + appname + '.Web/Views/Home/Contact.cshtml', templates);
    this.scc('src/ConventionAspNetApplication.Web/Views/Home/Index.cshtml', 'src/' + appname + '.Web/Views/Home/Index.cshtml', templates);

    this.scc('src/ConventionAspNetApplication.Web/Views/Shared/_Layout.cshtml', 'src/' + appname + '.Web/Views/Shared/_Layout.cshtml', templates);
    this.scc('src/ConventionAspNetApplication.Web/Views/Shared/Error.cshtml', 'src/' + appname + '.Web/Views/Shared/Error.cshtml', templates);

    this.scc('src/ConventionAspNetApplication.Web/Views/_ViewImports.cshtml', 'src/' + appname + '.Web/Views/_ViewImports.cshtml', templates);
    this.scc('src/ConventionAspNetApplication.Web/Views/_ViewStart.cshtml', 'src/' + appname + '.Web/Views/_ViewStart.cshtml', templates);

    this.scc('test/ConventionAspNetApplication.Tests/ConventionAspNetApplication.Tests.xproj', 'test/' + appname + '.Tests/' + appname + '.Tests.xproj', templates);
    this.scc('test/ConventionAspNetApplication.Tests/project.json', 'test/' + appname + '.Tests/project.json', templates);
    this.scc('test/ConventionAspNetApplication.Tests/SanitySpec.cs', 'test/' + appname + '.Tests/SanitySpec.cs', templates);
    this.scc('test/ConventionAspNetApplication.Tests/Properties/AssemblyInfo.cs', 'test/' + appname + '.Tests/Properties/AssemblyInfo.cs', templates);

    this.scc('build.cake', 'build.cake', templates);
    this.scc('build.ps1', 'build.ps1', templates);
    this.scc('build.cmd', 'build.cmd', templates)
  },

  scc: function(tp, dp, templates) {
      if(tp != undefined)
        this.fs.copyTpl(this.templatePath('ConventionAspNetApplication/' + tp), this.destinationPath(templates.appname + '/' + dp), templates);
  },

  install: function () {
    //this.installDependencies();
  }
});
