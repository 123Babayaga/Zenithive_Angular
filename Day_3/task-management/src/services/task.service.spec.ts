import { TaskServices } from './task.service';

describe('TaskService', () => {
  let service: TaskServices;

  //run before every test runs
  beforeEach(() => {
    service = new TaskServices();

    service['tasks'] = [
      {
        _id: '661394a4f5e8b15b9c4f1d01',
        title: 'Design Landing Page',
        description: 'Create a responsive landing page for the website.',
        status: 'In Progress',
        priority: 'High',
        assignedTo: 'Aarav Patel',
        dueDate: '2025-04-10T23:59:59.999Z',
      },
      {
        _id: '661394a4f5e8b15b9c4f1d02',
        title: 'Backend API Integration',
        description: 'Connect frontend with backend API for authentication.',
        status: 'Pending',
        priority: 'Medium',
        assignedTo: 'Riya Sharma',
        dueDate: '2025-04-12T23:59:59.999Z',
      },
      {
        _id: '661394a4f5e8b15b9c4f1d03',
        title: 'Database Schema Design',
        description: 'Design MongoDB schema for task and user management.',
        status: 'Completed',
        priority: 'High',
        assignedTo: 'Vikram Mehta',
        dueDate: '2025-03-30T23:59:59.999Z',
      },
      {
        _id: '661394a4f5e8b15b9c4f1d04',
        title: 'Unit Testing',
        description: 'Write Jest test cases for authentication module.',
        status: 'In Progress',
        priority: 'Low',
        assignedTo: 'Neha Singh',
        dueDate: '2025-04-15T23:59:59.999Z',
      },
      {
        _id: '661394a4f5e8b15b9c4f1d05',
        title: 'UI Enhancements',
        description: 'Improve the UI/UX of the dashboard page.',
        status: 'Pending',
        priority: 'Medium',
        assignedTo: 'Anjali Verma',
        dueDate: '2025-04-18T23:59:59.999Z',
      },
    ];
  });

  //test for get method
  it('should return current task list as observable', (done) => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBeGreaterThan(0);
      done();
    });
  });

  //test for add method
  it('should add task to the task list', () => {
    const task = {
      _id: 'custom_id',
      title: 'Test Title',
      description: 'Test Description',
      status: 'Pending',
      priority: 'Medium',
      assignedTo: 'Someone',
      dueDate: '2025-04-30T23:59:59.999Z',
    };

    const spy = spyOn(service as any, 'emitTask');

    const result = service.addTask(task);

    expect(spy).toHaveBeenCalled();
    expect(result).toBeTrue();
    expect(service['tasks'].some((t) => t._id === 'custom_id')).toBeTrue();
  });

  //test for update method
  it('should update task', () => {
    const original = service['tasks'][0];
    const updated = { ...original, title: 'Updated Title' };

    const spy = spyOn(service as any, 'emitTask');

    const result = service.updateTask(updated);

    expect(spy).toHaveBeenCalled();
    expect(result).toBeTrue();
    expect(service['tasks'][0].title).toBe('Updated Title');
  });

  //test for delete method
  it('should delete task', () => {
    const idToDelete = service['tasks'][0]._id;

    const spy = spyOn(service as any, 'emitTask');

    const result = service.deleteTask(idToDelete);

    expect(spy).toHaveBeenCalled();
    expect(result).toBeTrue();
    expect(service['tasks'].find((t) => t._id === idToDelete)).toBeUndefined();
  });

  //test for showAll filter
  it('should return all tasks from current task list', () => {
    service.showAll();

    service.getTasks().subscribe((alltask) => {
      expect(alltask.length).toBe(service['tasks'].length);

      expect(alltask).toEqual(service['tasks']);
    });
  });

  //test for showComplete filter
  it('should filter current task list and return completed tasks only', () => {
    service.showCompleted();

    service.getTasks().subscribe((filtered) => {
      expect(filtered.every((task) => task.status === 'Completed')).toBeTrue();
    });
  });

  //test for showInProgress filter
  it('should filter current task list and return in pregress tasks only', () => {
    service.showInProgress();

    service.getTasks().subscribe((filtered) => {
      expect(
        filtered.every((task) => task.status === 'In Progress')
      ).toBeTrue();
    });
  });

  //test for showPending filter
  it('should filter current task list and return pending tasks only', () => {
    service.showPending();

    service.getTasks().subscribe((filtered) => {
      expect(filtered.every((task) => task.status === 'Pending')).toBeTrue();
    });
  });

  //test for sortHighToLow filter
  it('should sort task list in high to low priority', () => {
    service.sortHighToLow();

    service.getTasks().subscribe((sorted) => {
      const priorities = sorted.map(
        (task) => service['priorityOrder'][task.priority]
      );
      const sortedCopy = [...priorities].sort((a, b) => b - a);
      expect(priorities).toEqual(sortedCopy);
    });
  });

  //test for sortLowToHigh filter
  it('should sort task list in low to high priority', () => {
    service.sortLowToHigh();

    service.getTasks().subscribe((sorted) => {
      const priorities = sorted.map(
        (task) => service['priorityOrder'][task.priority]
      );
      const sortedCopy = [...priorities].sort((a, b) => a - b);
      expect(priorities).toEqual(sortedCopy);
    });
  });

  //test for mark task as completed
  it('should mark task as completed', () => {
    const task = service['tasks'][0];

    const spy = spyOn(service as any, 'emitTask');

    service.markTaskAsComplete(task);

    expect(service['tasks'][0].status).toBe('Completed');
    expect(spy).toHaveBeenCalled();
  });

  //test for mark task as in progress
  it('should mark task as in progress again', () => {
    const task = service['tasks'][0];

    const spy = spyOn(service as any, 'emitTask');

    service.unmarkTaskAsComplete(task);

    expect(service['tasks'][0].status).toBe('In Progress');
    expect(spy).toHaveBeenCalled();
  });
});
