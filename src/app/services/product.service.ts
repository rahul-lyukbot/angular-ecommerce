import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  // here we are mapping our json data from spring to rest to product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    // Build the URL based on the category ID.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    // Fetch the products.
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

// Unwrapping the JSON from the spring data rest _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[]; // now here we are accessing our products
  };
}
