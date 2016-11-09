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
      type:'list',
      name:'action',
      default:'new',
      message:'What would you like to do?',
      choices:[
        {
          name:'Create new Solution (creates a directory)',
          value:'new'
        },{
          name:'Add a Project (inside {current directory}/src)',
          value:'add'
        }
      ]
    },{
      when:function(props){ return (/new/).test(props.action); },
      type: 'input',
      name: 'appname',
      message: 'Your project name',
      store: true
    },{
      when:function(props){return(/add/).test(props.action);},
      type:'list',
      name: 'projecttype',
      message: 'Project type',
      choices: [
        'Web',
        'Service',
        {
          name:'Class Library',
          value:'Library'
        },
        {
          name:'Test Project',
          value:'Test'
        }
      ]
    },{
      when:function(props){return(/add/).test(props.action);},
      type:'input',
      name: 'projectname',
      message: 'Project Name',
    }];

    return this.prompt(prompts).then(function (props) {
      this.log(props);      
      this.props = props;
    }.bind(this));
  },
  writing: function () {
    if(this.props.action === 'new')
    {
      this.createNewSolution();
    }

    if(this.props.action === 'add')
    {
      
    }
    
  },
  createNewSolution:function(){
    //var appname = this.props.appname;
    var templates = this.createTemplates();
    var appname = templates.appname;
    this.log(appname);
    this.log(templates);

    // Root
    this.scc('global.json', 'global.json', templates);
    this.scc('NuGet.config', 'NuGet.config', templates);
    this.scc('ConventionAspNetApplication.sln', appname + '.sln', templates);


    // Core
    this.scc('src/ConventionAspNetApplication.Core/ConventionAspNetApplication.Core.xproj', 'src/' + appname + '.Core/' + appname + '.Core.xproj', templates);
    this.scc('src/ConventionAspNetApplication.Core/project.json', 'src/' + appname + '.Core/project.json', templates);
    this.scc('src/ConventionAspNetApplication.Core/ConventionAspNetApplicationModelBuilderAlteration.cs', 'src/' + appname + '.Core/' + appname + 'ModelBuilderAlteration.cs', templates);
    this.scc('src/ConventionAspNetApplication.Core/Properties/AssemblyInfo.cs', 'src/' + appname + '.Core/Properties/AssemblyInfo.cs', templates);

    this.createWebProject(appname + '.Web');
    this.createConsoleProject(appname + '.Service');
    
    // // Web
    // this.scc('src/ConventionAspNetApplication.Web/web.release.config', 'src/' + appname + '.Web/web.release.config', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Properties/launchSettings.json', 'src/' + appname + '.Web/Properties/launchSettings.json', templates);
    // this.scc('src/ConventionAspNetApplication.Web/ConventionAspNetApplication.Web.xproj', 'src/' + appname + '.Web/' + appname + '.Web.xproj', templates);
    // this.scc('src/ConventionAspNetApplication.Web/bundleconfig.json', 'src/' + appname + '.Web/bundleconfig.json', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Program.cs', 'src/' + appname + '.Web/Program.cs', templates);
    // this.scc('src/ConventionAspNetApplication.Web/project.json', 'src/' + appname + '.Web/project.json', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Startup.cs', 'src/' + appname + '.Web/Startup.cs', templates);
    // this.scc('src/ConventionAspNetApplication.Web/web.config', 'src/' + appname + '.Web/web.config', templates);
    // this.scc('src/ConventionAspNetApplication.Web/appsettings.json', 'src/' + appname + '.Web/appsettings.json', templates);

    // this.scc('src/ConventionAspNetApplication.Web/wwwroot/css/site.css', 'src/' + appname + '.Web/wwwroot/css/site.css', templates);
    // this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner1.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);
    // this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner2.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);
    // this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner3.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);
    // this.scc('src/ConventionAspNetApplication.Web/wwwroot/images/banner4.svg', 'src/' + appname + '.Web/wwwroot/css/banner1.svg', templates);

    // this.scc('src/ConventionAspNetApplication.Web/wwwroot/js/site.js', 'src/' + appname + '.Web/wwwroot/js/site.js', templates);
    // this.scc('src/ConventionAspNetApplication.Web/wwwroot/favicon.ico', 'src/' + appname + '.Web/wwwroot/favicon.ico', templates);

    // this.scc('src/ConventionAspNetApplication.Web/Core/Factories/ConventionAspNetApplicationDbContextFactory.cs', 'src/' + appname + '.Web/Core/Factories/' + appname + 'DbContextFactory.cs', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Controllers/HomeController.cs', 'src/' + appname + '.Web/Controllers/HomeController.cs', templates);

    // this.scc('src/ConventionAspNetApplication.Web/Views/Home/About.cshtml', 'src/' + appname + '.Web/Views/Home/About.cshtml', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Views/Home/Contact.cshtml', 'src/' + appname + '.Web/Views/Home/Contact.cshtml', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Views/Home/Index.cshtml', 'src/' + appname + '.Web/Views/Home/Index.cshtml', templates);

    // this.scc('src/ConventionAspNetApplication.Web/Views/Shared/_Layout.cshtml', 'src/' + appname + '.Web/Views/Shared/_Layout.cshtml', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Views/Shared/Error.cshtml', 'src/' + appname + '.Web/Views/Shared/Error.cshtml', templates);

    // this.scc('src/ConventionAspNetApplication.Web/Views/_ViewImports.cshtml', 'src/' + appname + '.Web/Views/_ViewImports.cshtml', templates);
    // this.scc('src/ConventionAspNetApplication.Web/Views/_ViewStart.cshtml', 'src/' + appname + '.Web/Views/_ViewStart.cshtml', templates);

    this.scc('test/ConventionAspNetApplication.Tests/ConventionAspNetApplication.Tests.xproj', 'test/' + appname + '.Tests/' + appname + '.Tests.xproj', templates);
    this.scc('test/ConventionAspNetApplication.Tests/project.json', 'test/' + appname + '.Tests/project.json', templates);
    this.scc('test/ConventionAspNetApplication.Tests/SanitySpec.cs', 'test/' + appname + '.Tests/SanitySpec.cs', templates);
    this.scc('test/ConventionAspNetApplication.Tests/Properties/AssemblyInfo.cs', 'test/' + appname + '.Tests/Properties/AssemblyInfo.cs', templates);

    this.scc('build.cake', 'build.cake', templates);
    this.scc('build.ps1', 'build.ps1', templates);
    this.scc('build.cmd', 'build.cmd', templates)
  },

  createWebProject:function(appName){
    // There's an issue where for some reason an additional project with 'undefined' is created...
    if(appName === undefined) return;
    var destinationPath = 'src/' + appName + '/';
    var sourcePath = 'src/ConventionAspNetApplication.Web/';
    var files = [
     {
        'ConventionAspNetApplication.Web.xproj':appName + '.Web.xproj',
        'Core/Factories/ConventionAspNetApplicationDbContextFactory.cs':'Core/Factories/' + appName + 'DbContextFactory.cs'
     },

     'Program.cs',
     'project.json',
     'Startup.cs',

     'web.config',
     'web.release.config',
     'Properties/launchSettings.json',
     'bundleconfig.json',
          
     'appsettings.json',

     'wwwroot/css/site.css',
     'wwwroot/images/banner1.svg',
     'wwwroot/images/banner2.svg',
     'wwwroot/images/banner3.svg',
     'wwwroot/images/banner4.svg',

     'wwwroot/js/site.js',
     'wwwroot/favicon.ico',

     'Controllers/HomeController.cs',

     'Views/Home/About.cshtml',
     'Views/Home/Contact.cshtml',
     'Views/Home/Index.cshtml',

     'Views/Shared/_Layout.cshtml',
     'Views/Shared/Error.cshtml',

     'Views/_ViewImports.cshtml',
     'Views/_ViewStart.cshtml'
    ];

    for(var index in files)
    {
      var element = files[index];
      this.log(element);
      if(typeof(element) === 'string'){
        this.scc(sourcePath + element, destinationPath + element);
      } else {
        for(var key in element)
          this.scc(sourcePath + key, destinationPath + element[key]);
      }
    }
  },


  createConsoleProject:function(appName){
    // There's an issue where for some reason an additional project with 'undefined' is created...
    if(appName === undefined) return;
    var destinationPath = 'src/' + appName + '/';
    var sourcePath = 'src/ConventionAspNetApplication.Service/';
    this.log(appName);
    this.log(destinationPath);
    var scc = this.scc;
    var copyFile = function(sourceFile, destinationFile) {
      destinationFile = destinationFile || sourceFile;
      this.scc(sourcePath + sourceFile, destinationPath + destinationFile);
    }.bind(this);

    copyFile('ConventionAspNetApplication.Service.xproj', appName + '.xproj');
    copyFile('project.json');
    copyFile('appsettings.json')
    copyFile('run.cmd');
    copyFile('Program.cs');
    copyFile('ConventionAspNetApplicationService.cs', appName + 'Service.cs');
    copyFile('Properties/AssemblyInfo.cs');
  },

  scc: function(tp, dp) {
    if(tp != undefined){
      var templates = this.createTemplates();
      var useCurrentDirectory = templates.action === 'new' || false;
      dp = (useCurrentDirectory ? templates.appname : '.') + '/' + dp; 

      this.fs.copyTpl(this.templatePath('ConventionAspNetApplication/' + tp), this.destinationPath(dp), templates);
    }
  },
  createTemplates:function(){
    var templates = {
        appname:this.props.appname,
        action:this.props.action
    };
    return templates;
  },
  install: function () {
    //this.installDependencies();
  }
});
