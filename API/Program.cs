using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
           using (var scope = host.Services.CreateScope())
           {
               var Services = scope.ServiceProvider;
               var loggerFactory = Services.GetRequiredService<ILoggerFactory>();

               try
               {
                   var context = Services.GetRequiredService<DataContext>();
                   await context.Database.MigrateAsync();
                   await StoreContextSeed.SeedAsync(context,loggerFactory); //Seeding Data
               }
               catch(Exception ex)
               {
                   var logger = loggerFactory.CreateLogger<Program>();
                   logger.LogError(ex,"An Error Ocoured During Migrations");

               }
           }

           host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}