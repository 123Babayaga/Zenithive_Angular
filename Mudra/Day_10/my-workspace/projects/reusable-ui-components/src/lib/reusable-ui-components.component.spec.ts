import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableUiComponentsComponent } from './reusable-ui-components.component';

describe('ReusableUiComponentsComponent', () => {
  let component: ReusableUiComponentsComponent;
  let fixture: ComponentFixture<ReusableUiComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableUiComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableUiComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
