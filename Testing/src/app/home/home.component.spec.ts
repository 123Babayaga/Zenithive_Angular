import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el:DebugElement;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [HomeComponent]
  //   })
  //   .compileComponents();

  //   fixture = TestBed.createComponent(HomeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(waitForAsync(
    ()=>{
      TestBed.configureTestingModule({
        imports:[HomeComponent]
      }).compileComponents().then(()=>{
        fixture = TestBed.createComponent(HomeComponent);
        component= fixture.componentInstance;
        el=fixture.debugElement;
      })
    }
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have correct contents",()=>{
   let pElement = el.queryAll(By.css('p'));
   expect(pElement[0].nativeElement.textContent).toBe("home works!");
   let buttonDiss= el.queryAll(By.css('.btn'));
   expect(buttonDiss[0].nativeElement.disabled).toBeTrue();
  })
  
});
