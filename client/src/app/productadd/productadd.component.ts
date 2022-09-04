import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Warehouse } from '../_interfaces/Warehouse';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.scss']
})
export class ProductaddComponent implements OnInit {

  @Output() public onUploadFinished = new EventEmitter();

  
  response: {dbPath: ''};
  imageC:string;
  progress: number;
  message: string;

  addProductForm:FormGroup;
  war:Warehouse[];
  
  
 
  constructor(private service : ProductService, private fb : FormBuilder,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      id:[Math.floor(Math.random()*100)],
      name:[null],
      imagePath:[null],
      warehouseId:[null]
    });

    this.service.getAllWar().subscribe(data=>{
      console.log(data);
      this.war=data;
    })
  }

  public uploadFile=(files) =>
  {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:5001/api/product/up',formData,{reportProgress:true,observe:'events'})
    .subscribe(event=>{
      if(event.type==HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success! now you should SAVE this data.';
        this.onUploadFinished.emit(event.body);
        this.convertS(event.body);

       
      }
    });

  }

  public convertS = (event) => {
    this.response = event;
    this.imageC = this.response.dbPath;
  }

  onSubmit(addProductForm)
  {
    this.addProductForm.value.imagePath=this.imageC;
    console.log(this.addProductForm.value.image);
    this.service.addProduct(this.addProductForm.value).subscribe(data=>{
      this.router.navigate(["/product"])
    })
  }

}
