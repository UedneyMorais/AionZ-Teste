import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'; // Adicione OnInit
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model'; // Ajuste o caminho se for diferente
import { getFullPathImage } from '../../../core/utils/url-path.utils';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  @Output() deleteProduct = new EventEmitter<number>();


  fullImagePath!: string;

  constructor(private productService: ProductService){}

  ngOnInit(): void {

    if (this.product.imagePath) {
      this.fullImagePath = getFullPathImage(this.product.imagePath);
    }
  }

  onDeleteClick(): void {
    this.deleteProduct.emit(+this.product.id);
    this.productService.deleteProduct(+this.product.id);
  }
}
