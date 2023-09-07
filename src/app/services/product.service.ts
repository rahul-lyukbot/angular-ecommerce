import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) {}

  // here we are mapping our json data from spring to rest to product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    // Build the URL based on the category ID.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    // Fetch the products.
    return this.getProduct(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // Build the URL based on the keyword.
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    // Fetch the products.
    return this.getProduct(searchUrl);
  }

  private getProduct(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

// Unwrapping the JSON from the spring data rest _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[]; // now here we are accessing our products
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]; // now here we are accessing our productCategory
  };
}
