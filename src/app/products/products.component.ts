import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: Product[] = [];
  sortBy: string = 'name';
  sortOrder: string = 'asc';
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.product = data;
    });
  }

  deleteProduct(id: number): void {
    console.log('Deleting product with id:', id);
    this.productService.deleteProduct(id).subscribe(() => {
      this.product = this.product.filter(product => product.id !== id);
      console.log('Product deleted');
    }, error => {
      console.error('Delete failed', error);
    });
  }

onSearch() {
  this.productService.searchProducts(this.searchTerm).subscribe((products) => {
    this.product = products;
  });
}

sortProducts(): void {
  this.productService.getSortedProducts(this.sortBy, this.sortOrder)
    .subscribe(products => this.product = products);
}
}