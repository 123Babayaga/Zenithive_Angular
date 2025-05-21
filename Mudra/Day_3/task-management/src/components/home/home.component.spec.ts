import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TaskServices } from '../../services/task.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskServices>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskServices', [
      'showAll',
      'showCompleted',
      'showInProgress',
      'showPending',
      'sortHighToLow',
      'sortLowToHigh',
      'addTask',
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: TaskServices, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    taskServiceSpy = TestBed.inject(
      TaskServices
    ) as jasmine.SpyObj<TaskServices>;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply showAll filter', () => {
    taskServiceSpy.showAll.and.returnValue(true);
    component.showAll();
    expect(taskServiceSpy.showAll).toHaveBeenCalled();
    expect(component.isShowAll).toBeTrue();
    expect(component.isShowCompleted).toBeFalse();
    expect(component.isShowInProgress).toBeFalse();
    expect(component.isShowPending).toBeFalse();
  });

  it('should apply showCompleted filter', () => {
    taskServiceSpy.showCompleted.and.returnValue(true);
    component.showCompleted();
    expect(taskServiceSpy.showCompleted).toHaveBeenCalled();
    expect(component.isShowAll).toBeFalse();
    expect(component.isShowCompleted).toBeTrue();
    expect(component.isShowInProgress).toBeFalse();
    expect(component.isShowPending).toBeFalse();
  });

  it('should apply showInProgress filter', () => {
    taskServiceSpy.showInProgress.and.returnValue(true);
    component.showInProgress();
    expect(taskServiceSpy.showInProgress).toHaveBeenCalled();
    expect(component.isShowAll).toBeFalse();
    expect(component.isShowCompleted).toBeFalse();
    expect(component.isShowInProgress).toBeTrue();
    expect(component.isShowPending).toBeFalse();
  });

  it('should apply showPending filter', () => {
    taskServiceSpy.showPending.and.returnValue(true);
    component.showPending();
    expect(taskServiceSpy.showPending).toHaveBeenCalled();
    expect(component.isShowAll).toBeFalse();
    expect(component.isShowCompleted).toBeFalse();
    expect(component.isShowInProgress).toBeFalse();
    expect(component.isShowPending).toBeTrue();
  });

  it('should sort data as from high to low priority', () => {
    taskServiceSpy.sortHighToLow.and.returnValue(true);

    component.isFilterClicked = true;

    component.sortHighToLow();

    expect(taskServiceSpy.sortHighToLow).toHaveBeenCalled();
    expect(component.isFilterClicked).toBeFalse();
  });

  it('should sort data as from low to high priority', () => {
    taskServiceSpy.sortLowToHigh.and.returnValue(true);

    component.isFilterClicked = true;

    component.sortLowToHigh();

    expect(taskServiceSpy.sortLowToHigh).toHaveBeenCalled();
    expect(component.isFilterClicked).toBeFalse();
  });

  it('should add task in current task list', () => {
    component.title = 'Task';
    component.desc = 'Some description';
    component.status = 'Pending';
    component.priority = 'High';
    component.assignTo = 'Someone';
    component.dueDate = '2025-04-30';

    taskServiceSpy.addTask.and.returnValue(true);
    component.isAddtask = true;
    component.addSubmit();
    expect(taskServiceSpy.addTask).toHaveBeenCalledWith({
      _id: '12345678901232',
      title: 'Task',
      description: 'Some description',
      status: 'Pending',
      priority: 'High',
      assignedTo: 'Someone',
      dueDate: '2025-04-30',
    });

    expect(component.isAddtask).toBeFalse();
  });

  it('should not add task', () => {
    taskServiceSpy.addTask.and.returnValue(false);
    component.isAddtask = true;
    spyOn(window, 'alert');
    component.addSubmit();
    expect(window.alert).toHaveBeenCalledWith(
      'There is an error in adding Task.. Try later..'
    );
  });
});
