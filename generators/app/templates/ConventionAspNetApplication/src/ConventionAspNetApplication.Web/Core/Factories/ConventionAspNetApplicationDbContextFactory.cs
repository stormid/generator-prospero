using System;
using System.IO;
using Microsoft.Extensions.PlatformAbstractions;
using Prospero.Extensions.EntityFramework.Conventions.Migrations;

namespace <%= appname %>.Web.Core.Factories
{
    public class <%= appname %>DbContextFactory : GenericConventionDbContextFactory<Startup>
    {
    }
}