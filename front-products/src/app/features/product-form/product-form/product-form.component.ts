// src/app/features/product-form/product-form/product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/models/product.model';
import { Observable, switchMap, of } from 'rxjs';
import { getFullPathImage } from '../../../core/utils/url-path.utils';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode: boolean = false;
  productId: number | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  fileName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router, // Mantido como 'public' para o botão Cancelar
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.productId = parseInt(id, 10);
          return this.productService.getProductById(this.productId);
        } else {
          this.isEditMode = false;
          this.productId = null;
          return of(null);
        }
      })
    ).subscribe(product => {
      if (product) {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price
        });
        if (product.imagePath) {
          this.imagePreview = getFullPathImage(product.imagePath);
        }
      }
    });
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const productData = new FormData();
    productData.append('name', this.productForm.value.name);
    productData.append('description', this.productForm.value.description);

    // --- MUDANÇA AQUI: TRATAMENTO DO PREÇO ---
    let priceValue = this.productForm.value.price;

    // Se o valor for uma string e contiver vírgula, substitua por ponto
    if (typeof priceValue === 'string' && priceValue.includes(',')) {
      priceValue = priceValue.replace(',', '.');
    }
    // Garante que é um número antes de converter para string para o FormData
    // Se ele já é um número, .toString() funcionará. Se era uma string convertida, parseFloat a transformará.
    productData.append('price', parseFloat(priceValue).toString());
    // --- FIM DA MUDANÇA NO PREÇO ---


    if (this.selectedFile) {
      productData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe(
        (product) => {
          this.router.navigate(['/products', product.slug]);
        },
        (error) => {
          console.error('Erro ao atualizar produto:', error);
        }
      );
    } else {
      this.productService.createProduct(productData).subscribe(
        (product) => {
          this.router.navigate(['/products', product.slug]);
        },
        (error) => {
          console.error('Erro ao criar produto:', error);
        }
      );
    }
  }
}
