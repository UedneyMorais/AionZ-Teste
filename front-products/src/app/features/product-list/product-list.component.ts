// src/app/features/product-list/product-list.component.ts

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, catchError, of, finalize, delay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | null = null;

  private _isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this._isLoading.asObservable();

  private _errorMessage = new BehaviorSubject<string | null>(null);
  errorMessage$ = this._errorMessage.asObservable();

  constructor(private productsService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this._isLoading.next(true);
    this._errorMessage.next(null);

    this.products$ = this.productsService.getProducts().pipe(
      catchError((error: Error) => {
        console.error('Erro ao carregar produtos no componente:', error.message);
        this._errorMessage.next(error.message);
        return of([]);
      }),
      finalize(() => {
          // Explicação da gambiarra.
          // Oculta o spinner após a requisição. Um pequeno atraso (setTimeout) é adicionado
          // pois, em ambientes de desenvolvimento (localhost) ou com backend muito rápido,
          // a requisição pode ser tão instantânea que o spinner mal aparece antes de sumir,
          // ou pior caso que não consegue parar de girar pois foi mudado antes de ser renderizado.
          // Isso garante que o usuário veja o indicador de carregamento.
        setTimeout(() => {
          this._isLoading.next(false);
          }, 100);
        })
    );
  }

  onDeleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this._isLoading.next(true);
      this.productsService.deleteProduct(id).pipe(
        finalize(() => this._isLoading.next(false)),
        catchError((error: Error) => {
          return of(undefined);
        })
      ).subscribe({
        next: () => {
          this.loadProducts();
        },
      });
    }
  }
}
