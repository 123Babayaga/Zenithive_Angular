import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { TaskServices } from '../../services/task.service';
import { of } from 'rxjs';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskServices>;

  const mockTasks = [
    {
      _id: '1',
      title: 'Task 1',
      description: 'Desc 1',
      status: 'Pending',
      priority: 'Medium',
      assignedTo: 'User 1',
      dueDate: '2025-04-30',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskServices', [
      'getTasks',
      'updateTask',
      'deleteTask',
      'markTaskAsComplete',
      'unmarkTaskAsComplete',
    ]);

    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
      providers: [{ provide: TaskServices, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(
      TaskServices
    ) as jasmine.SpyObj<TaskServices>;

    taskServiceSpy.getTasks.and.returnValue(of(mockTasks));
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(component.filteredTasks).toEqual(mockTasks);
  });

  it('should open update form with correct task', () => {
    component.updateTask(mockTasks[0]);
    expect(component.isUpdate).toBeTrue();
    expect(component.title).toBe('Task 1');
  });

  it('should call taskService.updateTask on updateSubmit', () => {
    component.updateTask(mockTasks[0]);
    taskServiceSpy.updateTask.and.returnValue(true);
    spyOn(window, 'alert');
    component.updateSubmit();
    expect(taskServiceSpy.updateTask).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Task Updated Successfully..');
    expect(component.isUpdate).toBeFalse();
  });

  it('should not update the task', () => {
    component.updateTask(mockTasks[0]);
    taskServiceSpy.updateTask.and.returnValue(false);
    spyOn(window, 'alert');
    component.updateSubmit();
    expect(window.alert).toHaveBeenCalledWith('Error in Update Task..');
    expect(component.isUpdate).toBeFalse();
  });

  it('should close update form on cancel', () => {
    component.isUpdate = true;
    component.closeUpdate();
    expect(component.isUpdate).toBeFalse();
  });

  it('should call deleteTask and show alert', () => {
    spyOn(window, 'alert');
    taskServiceSpy.deleteTask.and.returnValue(true);
    component.deleteTask(mockTasks[0]);
    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith('1');
    expect(window.alert).toHaveBeenCalledWith('Task Deleted Successfully..');
  });

  it('should mark task as completed when checkbox is checked', () => {
    const event = { target: { checked: true } };
    taskServiceSpy.markTaskAsComplete.and.returnValue(true);
    spyOn(window, 'alert');
    component.handleCheckToggle(event, mockTasks[0]);
    expect(taskServiceSpy.markTaskAsComplete).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Task marked as completed successfully..'
    );
  });

  it('should unmark task as completed when checkbox is unchecked', () => {
    const event = { target: { checked: false } };
    taskServiceSpy.unmarkTaskAsComplete.and.returnValue(true);
    spyOn(window, 'alert');
    component.handleCheckToggle(event, mockTasks[0]);
    expect(taskServiceSpy.unmarkTaskAsComplete).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Task is still pending..');
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component['taskSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
