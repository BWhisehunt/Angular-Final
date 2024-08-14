import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  deleteProduct(id: number): void {
    console.log('Deleting product with id:', id);
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      console.log('Product deleted');
    }, error => {
      console.error('Delete failed', error);
    });
  }

  searchTerm: string = '';

onSearch() {
  this.productService.searchProducts(this.searchTerm).subscribe((products) => {
    this.products = products;
  });
}
}