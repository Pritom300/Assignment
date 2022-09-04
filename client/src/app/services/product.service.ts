import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductHandle } from '../_interfaces/ProductHandle';
import { Products } from '../_interfaces/Products';
import { Warehouse } from '../_interfaces/Warehouse';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  readonly baseUrl = "https://localhost:5001/api/product";

  


  getAllProduct()
  {
    return this.http.get<Products[]>(this.baseUrl);
  }

  getProductById(id:number){
    return this.http.get<ProductHandle>(this.baseUrl+"/"+id);
  }

  upDateProduct(product:ProductHandle){
    return this.http.put<ProductHandle>(this.baseUrl+"/UpdateProduct/"+product.id,product);
  }

  addProduct(product:ProductHandle)
  {
    return this.http.post(this.baseUrl+"/AddProduct/",product);

  }

  getAllWar()
  {
    return this.http.get<Warehouse[]>(this.baseUrl+"/war");
  }


  deleteProduct(id:number){
    return this.http.delete<ProductHandle>(this.baseUrl+"/"+id);
  }

  
}
