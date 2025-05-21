import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailHomeComponent } from './product-detail-home.component';

describe('ProductDetailHomeComponent', () => {
  let component: ProductDetailHomeComponent;
  let fixture: ComponentFixture<ProductDetailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
