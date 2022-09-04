import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductHandle } from '../_interfaces/ProductHandle';
import { Products } from '../_interfaces/Products';
import { Warehouse } from '../_interfaces/Warehouse';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  
  updateForm : FormGroup;
  product:ProductHandle;

  constructor(private service : ProductService,private route:ActivatedRoute, private router:Router, private fb:FormBuilder) { }

  war:Warehouse[];

  ngOnInit(): void {
    this.service.getProductById(this.route.snapshot.params.id).subscribe(data=>{

      this.product=data;
      console.log(data);

      this.updateForm = this.fb.group({
        id:[data.id],
        name:[data.name],
        imagePath:[data.imagePath],
        warehouseList:[data.warehouseList.warehouseList]
        
      });

      this.service.getAllWar().subscribe(data=>{
        console.log(data);
        this.war=data;
      })

     

      


    })
  }

  onSubmit(updateForm)
  {
  
    this.service.upDateProduct(this.updateForm.value).subscribe(data=>{
     
      this.router.navigate(["/products"]);
    })
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }

}
