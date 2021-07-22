import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  editProduct!: Product;
  deleteProduct!: Product;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public onAddProduct(addForm: NgForm): void{


    this.productService.addProduct(addForm.value).subscribe(
      (response:  Product)=>{
        console.log(response);
        this.getProducts(); 
        

      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )

  }
  public onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  
  public onOpenModal(product: Product, mode: string): void {
    const container = document.getElementById('maincontainer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editProduct = product;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {

      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container?.appendChild(button);
    button.click();
  }

}

