import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-productdelete',
  templateUrl: './productdelete.component.html',
  styleUrls: ['./productdelete.component.scss']
})
export class ProductdeleteComponent implements OnInit {

  constructor(private service: ProductService, private route:ActivatedRoute,private router:Router ) { }

  ngOnInit(): void {
    this.service.deleteProduct(this.route.snapshot.params.id).subscribe(data=>{
     
      this.router.navigate(["/products"]);
    })
  }

}
