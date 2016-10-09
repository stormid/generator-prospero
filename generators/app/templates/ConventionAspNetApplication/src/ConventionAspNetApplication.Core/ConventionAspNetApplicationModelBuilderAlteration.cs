using FluentModelBuilder.Alterations;
using FluentModelBuilder.Builder;
using FluentModelBuilder.Relational.Conventions;

namespace <%= appname %>.Core
{
    public class <%= appname %>ModelBuilderAlteration : IAutoModelBuilderAlteration
    {
        public void Alter(AutoModelBuilder builder)
        {
            builder.UseConvention<PluralizingTableNameGeneratingConvention>();
        }
    }
}
