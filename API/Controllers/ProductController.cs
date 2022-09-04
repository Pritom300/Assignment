using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class ProductController: ControllerBase
    {
        private readonly IProductRepository _repo;
          
        private readonly DataContext _context;
        public ProductController(IProductRepository repo, DataContext context)
        {
            _repo = repo;
            _context = context;
           
        }


        [HttpGet]
        public async Task< ActionResult<List<ProductToReturnDto>>> GetProducts()
        {
           
            
            var product = await _repo.GetProductsAsync(); 

            return product.Select(product => new ProductToReturnDto{ 

                Id = product.Id,
                CategoryName=product.CategoryName,
                UnitName=product.UnitName,
                Name = product.Name,
                Code=product.Code,
                ProductBarcode=product.ProductBarcode,
                Description=product.Description,
                BrandName=product.BrandName,
                SizeName=product.SizeName,
                ColorName=product.ColorName,
                ModelName=product.ModelName,
                VariantName=product.VariantName,
                OldPrice=product.OldPrice,
                Price=product.Price,
                CostPrice=product.CostPrice,
                Stock=product.Stock,
                TotalPurchase=product.TotalPurchase,
                LastPurchaseDate=product.LastPurchaseDate,
                LastPurchaseSupplier=product.LastPurchaseSupplier,
                TotalSales=product.TotalSales,
                LastSalesDate=product.LastSalesDate,
                LastSalesCustomer=product.LastSalesCustomer,
                ImagePath = product.ImagePath,
                Type=product.Type,
                Status=product.Status,
                WarehouseList = product.WarehouseList.WarehouseList,
                
            }).ToList();                          
        }






        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            
            var product =  await _repo.GetProductByIdAsync(id);   

            return new ProductToReturnDto
            {
                Id = product.Id,
                CategoryName=product.CategoryName,
                UnitName=product.UnitName,
                Name = product.Name,
                Code=product.Code,
                ProductBarcode=product.ProductBarcode,
                Description=product.Description,
                BrandName=product.BrandName,
                SizeName=product.SizeName,
                ColorName=product.ColorName,
                ModelName=product.ModelName,
                VariantName=product.VariantName,
                OldPrice=product.OldPrice,
                Price=product.Price,
                CostPrice=product.CostPrice,
                Stock=product.Stock,
                TotalPurchase=product.TotalPurchase,
                LastPurchaseDate=product.LastPurchaseDate,
                LastPurchaseSupplier=product.LastPurchaseSupplier,
                TotalSales=product.TotalSales,
                LastSalesDate=product.LastSalesDate,
                LastSalesCustomer=product.LastSalesCustomer,
                ImagePath = product.ImagePath,
                Type=product.Type,
                Status=product.Status,
                WarehouseList = product.WarehouseList.WarehouseList,
               
            };
        }


        [HttpPut("UpdateProduct/{id}")]
        public IActionResult Update(int id, [FromBody]Products newProduct)
        {
           
             var p = _repo.update(id,newProduct);
             if(p==null)
             {
                return BadRequest();
             }

             return Ok();
            
        }

        [HttpPost("AddProduct")]
        public IActionResult Add(Products product)
         {

             var r = _repo.AddProduct(product);
             return Ok();

         }


           [HttpGet("war")]
           public async Task< ActionResult<List<Warehouse>>> GetWar()
           {
               return  _context.Warehouse.ToList();

           } 


    [HttpDelete("{id:int}")]
     public async Task<ActionResult<Products>> deleteProduct(int id)
     {
         var r = _repo.delete(id);
         if(r==null)
         {
             return NotFound();
         }

         return Ok();

     }



       [HttpPost("up")]
        public async Task<IActionResult> Upload()
        {
            try{
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            var folderName = Path.Combine("wwwroot", "Images");
            var folderName2 = Path.Combine("Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
             if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName2, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

        }




        
    }
}