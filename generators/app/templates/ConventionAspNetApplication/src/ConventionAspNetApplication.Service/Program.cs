namespace <%= appname %>.Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var application = new <%= appname %>Service();
            application.Run();
        }
    }
}