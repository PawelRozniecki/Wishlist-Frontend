import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private apiServerUrl = environment.apiBaseUrl;


  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product_manager/getProducts`);
  }
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/product_manager/add`, product);
  }
  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/product_manager/update`, product);
  }
  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiServerUrl}/product_manager/delete/${id}`);
  }

}
