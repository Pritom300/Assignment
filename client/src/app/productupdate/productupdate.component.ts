import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductHandle } from '../_interfaces/ProductHandle';
import { Warehouse } from '../_interfaces/Warehouse';

@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.scss']
})
export class ProductupdateComponent implements OnInit {

  updateForm : FormGroup;
  product:ProductHandle;

  war : Warehouse[];

  constructor(private service:ProductService, private route : ActivatedRoute, private router : Router, private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.service.getProductById(this.route.snapshot.params.id).subscribe(data=>{

      this.product=data;
      console.log(data);

      this.updateForm = this.fb.group({
        id:[data.id],
        name:[data.name],
        imagePath:[data.imagePath],
        warehouseId:[data.warehouseId],
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
   
    this.router.navigate(["/product"]);
  })
}

public createImgPath = (serverPath: string) => {
  return `https://localhost:5001/${serverPath}`;
}

}
