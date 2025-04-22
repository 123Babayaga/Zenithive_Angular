import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentDecorator, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture:ComponentFixture<AppComponent>;
  let el:DebugElement;
  let componet:AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
      el= fixture.debugElement;
      componet= fixture.componentInstance;
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Testing' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Testing');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Testing');
  // });

  //  it('should render a button with text subscribe', () => {
  //     const btnElemnt= el.queryAll(By.css('.subscribe'));
  //     componet.isSubscribe = false;
  //     componet.btnText = "Subscribe"; 
  //     fixture.detectChanges();
  //     expect(btnElemnt[0].nativeElement.textContent).toBe("Subscribe");
  //     expect(btnElemnt[0].nativeElement.disabled).toBeFalse();
  // });

  it('should render a button with text subscribe', () => {
    componet.isSubscribe = false;
    fixture.detectChanges();
    let btnElemnt= el.queryAll(By.css('.subscribe'));
    // componet.btnText = "Subscribe"; 
    expect(btnElemnt[0].nativeElement.textContent).toBe("Subscribe");
    expect(btnElemnt[0].nativeElement.disabled).toBeFalse();
});

  it('should render a button with text subscribe and button should be disabled', () => {
    componet.isSubscribe = true;
    fixture.detectChanges();

    let btnElemnt= el.queryAll(By.css('.subscribe'));
    console.log("btnElemnt",btnElemnt);
    // componet.btnText = "Subscribe"; 
    btnElemnt[0].nativeElement.click();
    fixture.detectChanges();
    btnElemnt= el.queryAll(By.css('.subscribe'));
    expect(btnElemnt[0].nativeElement.textContent).toBe("Subscribed");
    expect(btnElemnt[0].nativeElement.disabled).toBeTrue();
});
});
