import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Tasks {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  private tasks: Tasks[] = [
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
    {
      _id: '661394a4f5e8b15b9c4f1d06',
      title: 'Bug Fixing',
      description: 'Fix reported bugs in task filtering feature.',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'Rajesh Kumar',
      dueDate: '2025-04-08T23:59:59.999Z',
    },
    {
      _id: '661394a4f5e8b15b9c4f1d07',
      title: 'Deployment Setup',
      description: 'Set up CI/CD pipeline for automated deployment.',
      status: 'Pending',
      priority: 'High',
      assignedTo: 'Megha Tiwari',
      dueDate: '2025-04-20T23:59:59.999Z',
    },
    {
      _id: '661394a4f5e8b15b9c4f1d08',
      title: 'Write Documentation',
      description: 'Create a README file with setup and usage instructions.',
      status: 'Pending',
      priority: 'Low',
      assignedTo: 'Aman Gupta',
      dueDate: '2025-04-25T23:59:59.999Z',
    },
  ];

  private priorityOrder: any = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  filteredTasks: any = this.tasks;

  private taskSubject = new BehaviorSubject<Tasks[]>(this.filteredTasks);

  getTasks(): Observable<Tasks[]> {
    return this.taskSubject.asObservable();
  }

  addTask(task: Tasks): Boolean {
    this.tasks.push(task);
    this.filteredTasks = this.tasks;
    this.emitTask();
    return true;
  }

  updateTask(updatedTask: Tasks): Boolean {
    const index = this.tasks.findIndex((t) => t._id === updatedTask._id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.filteredTasks = this.tasks;
      this.emitTask();
      return true;
    } else {
      return false;
    }
  }

  deleteTask(id: String): Boolean {
    this.tasks = this.tasks.filter((task) => task._id !== id);
    this.filteredTasks = this.tasks;
    this.emitTask();
    return true;
  }

  showAll(): Boolean {
    this.filteredTasks = this.tasks;
    this.emitTask();
    return true;
  }

  showCompleted(): Boolean {
    this.filteredTasks = this.tasks.filter(
      (task) => task.status === 'Completed'
    );
    this.emitTask();
    console.log(this.taskSubject);
    return true;
  }

  showInProgress(): Boolean {
    this.filteredTasks = this.tasks.filter(
      (task) => task.status === 'In Progress'
    );
    this.emitTask();
    return true;
  }

  showPending(): Boolean {
    this.filteredTasks = this.tasks.filter((task) => task.status === 'Pending');
    this.emitTask();
    return true;
  }

  sortHighToLow(): Boolean {
    this.filteredTasks = [...this.filteredTasks].sort((a, b) => {
      return this.priorityOrder[b.priority] - this.priorityOrder[a.priority];
    });
    this.emitTask();
    return true;
  }

  sortLowToHigh(): Boolean {
    this.filteredTasks = [...this.filteredTasks].sort((a, b) => {
      return this.priorityOrder[a.priority] - this.priorityOrder[b.priority];
    });
    this.emitTask();
    return true;
  }

  private emitTask(): void {
    this.taskSubject.next([...this.filteredTasks]);
  }

  markTaskAsComplete(item: Tasks): Boolean {
    const index = this.tasks.findIndex((task) => task._id === item._id);
    this.tasks[index].status = 'Completed';
    this.filteredTasks = this.tasks;
    this.emitTask();
    return true;
  }

  unmarkTaskAsComplete(item: Tasks) {
    const index = this.tasks.findIndex((task) => task._id === item._id);
    this.tasks[index].status = 'In Progress';
    this.filteredTasks = this.tasks;
    this.emitTask();
    return true;
  }
}
