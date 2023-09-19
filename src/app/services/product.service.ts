import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.lyukshopApiUrl + '/products';
  private categoryUrl = environment.lyukshopApiUrl + '/product-category';
  constructor(private httpClient: HttpClient) {}

  // here we are mapping our json data from spring to rest to product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    // Build the URL based on the category ID.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    // Fetch the products.
    return this.getProducts(searchUrl);
  }

  getProductLisPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    // Build the URL based on the category ID, Page and Size.
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    console.log(`getting products from ~ ${searchUrl}`);

    // Fetch the products.
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // Build the URL based on the keyword.
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    // Fetch the products.
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    // Build the URL based on the keyword, Page and Size.
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    // Fetch the products.
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getProduct(theProductId: number): Observable<Product> {
    // building url based on product id so we can access the details of the product from out database
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}

// Unwrapping the JSON from the spring data rest _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[]; // now here we are accessing our products
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]; // now here we are accessing our productCategory
  };
}
