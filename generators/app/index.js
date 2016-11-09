'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('generator-prospero') + ' - the Prospero Template Generator!'
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

    var templates = this.createTemplates();
    var appname = templates.appname;
    var globalFiles = [
      'global.json',
      'NuGet.config',
      {'ConventionAspNetApplication.sln': appname + '.sln'}
    ];
    
    var coreFiles = [
      'ConventionAspNetApplication.Core.xproj',
      'project.json',
      {'ConventionAspNetApplicationModelBuilderAlteration.cs': appname + 'ModelBuilderAlteration.cs'},
      'Properties/AssemblyInfo.cs'
    ];

    var buildFiles = [
      'build.cake',
      'build.ps1',
      'build.cmd'
    ];

    this.copyFilesToDestination(globalFiles, '', '');
    this.copyFilesToDestination(buildFiles, '', '');

    this.copyFilesToDestination(coreFiles, 'src/ConventionAspNetApplication.Core/', 'src/' + appname + '.Core/');
    this.createWebProject(appname, 'Web');
    this.createConsoleProject(appname, 'Service');
    this.createTestProject(appname)
  },

  createTestProject:function(solutionName, testName) {
    // There's an issue where for some reason an additional project with 'undefined' is created...
    if(solutionName === undefined) return;
    var destinationFolderExtension = testName === undefined ? '' : '.' + testName;  
    var destinationPath = 'test/' + solutionName + destinationFolderExtension + '.Tests' + '/';
    var sourcePath = 'test/ConventionAspNetApplication.Tests/';

    var files = [
      {
        'ConventionAspNetApplication.Tests.xproj':solutionName + (testName || '') + '.Tests.xproj'
      },
      'project.json',
      'SanitySpec.cs',
      'Properties/AssemblyInfo.cs'
    ];
    this.copyFilesToDestination(files, sourcePath, destinationPath);
  },

  createWebProject:function(solutionName, appName){
    // There's an issue where for some reason an additional project with 'undefined' is created...
    if(solutionName === undefined) return;
    var destinationPath = 'src/' + solutionName + '.' + appName + '/';
    var sourcePath = 'src/ConventionAspNetApplication.Web/';
    var files = [
     {
        'ConventionAspNetApplication.Web.xproj':solutionName + '.' + appName + '.xproj',
        'Core/Factories/ConventionAspNetApplicationDbContextFactory.cs':'Core/Factories/' + solutionName + appName + 'DbContextFactory.cs'
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

    this.copyFilesToDestination(files, sourcePath, destinationPath);
  },

  createConsoleProject:function(solutionName, appName){
    // There's an issue where for some reason an additional project with 'undefined' is created...
    if(solutionName === undefined) return;
    var destinationPath = 'src/' + solutionName + '.' + appName + '/';
    var sourcePath = 'src/ConventionAspNetApplication.Service/';

    var files = [
      {
        'ConventionAspNetApplication.Service.xproj':solutionName + '.' + appName + '.xproj',
        'ConventionAspNetApplicationService.cs':solutionName + appName + '.cs'
      },
      'project.json',
      'appsettings.json',
      'run.cmd',
      'Program.cs',
      'Properties/AssemblyInfo.cs'
    ];
    this.copyFilesToDestination(files, sourcePath, destinationPath);
  },

  copyFilesToDestination:function(files, sourcePath, destinationPath){
    for(var index in files)
    {
      var element = files[index];
      if(typeof(element) === 'string'){
        this.scc(sourcePath + element, destinationPath + element);
      } else {
        for(var key in element)
          this.scc(sourcePath + key, destinationPath + element[key]);
      }
    }
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
