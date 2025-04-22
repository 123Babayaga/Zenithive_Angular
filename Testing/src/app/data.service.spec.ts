import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { USERs } from './mock-data/user';

describe('DataService', () => {
  let service: DataService;
  let testingCntroller:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    testingCntroller=TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it("should get All Users",()=>{
    service.getAllUsers().subscribe((Users:any)=>{
      expect(Users).toBeTruthy();
      expect(Users.length).toBe(3);
      const secondUser=Users.find((Users:any)=> Users.id === 2);
      expect(secondUser.name).toBe("Prince Gandu");
    })

    const mockReq=testingCntroller.expectOne('api/users');
    expect(mockReq.request.method).toBe('GET');
    mockReq.flush(Object.values(USERs));
  });
  
  it("should get User By id",()=>{
    service.getUserById(1).subscribe((User:any)=>{
      expect(User).toBeTruthy();
      expect(User.name).toBe("Aayush Parekh");
    })

    const mockReq=testingCntroller.expectOne('api/users/1');
    expect(mockReq.request.method).toBe('GET');
    mockReq.flush(USERs[1]);
  });

  it("should update User By id",()=>{
    let changes= {age:24};
    service.updateUser(1,changes).subscribe((User:any)=>{
      expect(User).toBeTruthy();
      expect(User.id).toBe(1);
    })

    const mockReq=testingCntroller.expectOne('api/users/1');
    expect(mockReq.request.method).toBe('PUT');
    let modifiedUser= USERs[1];
    modifiedUser.age = 24;
    expect(mockReq.request.body.age).toEqual(changes.age);
    mockReq.flush(modifiedUser);
  });

  afterEach(()=>{
    testingCntroller.verify();
  })
});
