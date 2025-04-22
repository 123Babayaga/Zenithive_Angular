import { TestBed } from "@angular/core/testing";
import { CalcService } from "./calc.service"
import { SharedService } from "./shared.service";

describe("CalcService",()=>{

  let shared: SharedService;
  let calc: CalcService;

  beforeEach(()=>{
    // shared=new SharedService();
    // calc=new CalcService(shared);
    shared=jasmine.createSpyObj("SharedService",["mySharedFuction"]);
    TestBed.configureTestingModule({
      providers: [CalcService,
        {
          provide:SharedService,useValue:shared
        }]
    })
    
    shared= TestBed.inject(SharedService);
    calc=TestBed.inject(CalcService);
  })

  it("should be multiple two numbers",()=>{
    // const shared=new SharedService();
    // const calc=new CalcService(shared);
    const result=calc.multiply(2,3);
    expect(result).toBe(6);
  })

  it("should be add two numbers",()=>{
    // const shared=new SharedService();
    // const calc=new CalcService(shared);
    const result=calc.add(2,3);
    expect(result).toBe(5);
  })


  // it("should be called mySharedFuction",()=>{
  //   // const shared=new SharedService();
  //   const shared=jasmine.createSpyObj("SharedService",["mySharedFuction"]);
  //   const calc=new CalcService(shared);
  //   // spyOn(shared,"mySharedFuction");
  //   // spyOn(shared,"mySharedFuction").and.callThrough();
  //   const result=calc.multiply(2,3);
  //   // expect(shared.mySharedFuction).toHaveBeenCalled();
  //   expect(result).toBe(6);
  // })
})