import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryID: number = 1;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using "+" symbol
      this.currentCategoryID = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not category id available.... default to category 1
      this.currentCategoryID = 1;
    }
    // now get the product for the given category id
    this.productService.getProductList(this.currentCategoryID).subscribe(
      // method is invoked when we subscribed so we can get the api data
      (data) => {
        this.products = data; // assign results to the Product array
      }
    );
  }
}
function listProducts() {
  throw new Error('Function not implemented.');
}
