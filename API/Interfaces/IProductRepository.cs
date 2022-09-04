using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task <Products> GetProductByIdAsync(int id);
        Task <IReadOnlyList<Products>> GetProductsAsync();
        Products update(int id, Products newProducts);
        Products AddProduct(Products newProduct);

        Products delete(int id);
       
    }
}