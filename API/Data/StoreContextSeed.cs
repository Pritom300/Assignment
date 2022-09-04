using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if(!context.Warehouse.Any())
                {

                     var Wardata = 
                        File.ReadAllText("../API/Data/SeedData/Warehouse.json");
                    var war = JsonSerializer.Deserialize<List<Warehouse>>(Wardata);

                    foreach(var item in war)
                    {
                        context.Warehouse.Add(item);
                    }

                    await context.SaveChangesAsync();


                }

                 if(!context.Products.Any())
                {
                    var productsData = 
                        File.ReadAllText("../API/Data/SeedData/Products.json");
                    
                    var products = JsonSerializer.Deserialize<List<Products>>(productsData);

                    foreach(var item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

            }

            catch(Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}