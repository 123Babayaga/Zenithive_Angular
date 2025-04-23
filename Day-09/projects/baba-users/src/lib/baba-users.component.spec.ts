import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabaUsersComponent } from './baba-users.component';

describe('BabaUsersComponent', () => {
  let component: BabaUsersComponent;
  let fixture: ComponentFixture<BabaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BabaUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BabaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
