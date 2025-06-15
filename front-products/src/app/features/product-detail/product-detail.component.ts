import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product, productFromDto } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product/product.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { getFullPathImage } from '../../core/utils/url-path.utils';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  currentUrl: string = '';
  fullImagePath!: string;
  private isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.product$ = this.productService
      .getProductBySlug(this.route.snapshot.params['slug'])
      .pipe(map(productFromDto));
  }


  ngOnInit() {
    if (this.isBrowser) {
      this.currentUrl = window.location.href;
    } else {
      this.currentUrl = 'URL não disponível no servidor para este contexto.';
    }

    this.product$.subscribe(product => {
      this.fullImagePath = getFullPathImage(product.imagePath);
      this.seoService.updateMetaTags({
        title: `${product.name} | Nossa Loja`,
        description: product.description,
        image: this.fullImagePath
      });
    });
  }
}
