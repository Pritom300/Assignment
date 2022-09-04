import { Warehouse } from "./Warehouse";

export interface ProductHandle {

  id: number;
  categoryName: string;
  unitName : string,
  name: string;
  code: string;
  productBarcode: string;
  description: string;
  brandName: string;
  sizeName: string;
  colorName: string;
  modelName: string,
  variantName : string,
  oldPrice: number;
  price : number;
  costPrice: number;
  stock : number;
  totalPurchase : number;
  lastPurchaseDate: string;
  lastPurchaseSupplier: string;
  totalSales : number;
  lastSalesDate:string;
  lastSalesCustomer: string;
  imagePath : string,
  type : string;
  status: string;
  warehouseId? : number;
  warehouseList? : Warehouse;

   
  }

  

  