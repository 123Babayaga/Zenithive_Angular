// src/app/services/task.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Main state signal for tasks
  private _tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Learn Angular @Input',
      description: 'Study how to pass data from parent to child',
      status: 'completed',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Master @Output & EventEmitter',
      description: 'Learn how to send data from child to parent',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Build sample project',
      description: 'Create a task management app to practice component communication',
      status: 'pending',
      priority: 'medium'
    }
  ]);

  // Filter and sort signals
  private _activeFilter = signal<string>('all');
  private _activeSorting = signal<string>('none');

  // Public readable signals
  readonly tasks = this._tasks.asReadonly();
  readonly activeFilter = this._activeFilter.asReadonly();
  readonly activeSorting = this._activeSorting.asReadonly();

  // Computed signal for filtered tasks
  readonly filteredTasks = computed(() => {
    // Filter tasks based on status
    let filtered = this._tasks();
    const filterValue = this._activeFilter();
    
    if (filterValue !== 'all') {
      filtered = filtered.filter(task => task.status === filterValue);
    }
    
    // Sort tasks based on criteria
    const sortCriteria = this._activeSorting();
    
    if (sortCriteria === 'priority') {
      const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
      return [...filtered].sort((a, b) => 
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    } else if (sortCriteria === 'title') {
      return [...filtered].sort((a, b) => 
        a.title.localeCompare(b.title)
      );
    }
    
    return filtered;
  });

  constructor() {
    console.log('TaskService initialized');
  }

  // CRUD operations
  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId()
    };
    
    this._tasks.update(tasks => [...tasks, newTask]);
  }

  updateTask(updatedTask: Task): void {
    this._tasks.update(tasks => 
      tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  }

  deleteTask(id: number): void {
    this._tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  getTasks(): Task[] {
    return this._tasks();
  }

  getTaskById(id: number): Task | undefined {
    return this._tasks().find(task => task.id === id);
  }

  // Filter and sorting methods
  setFilter(filter: string): void {
    this._activeFilter.set(filter);
  }

  setSorting(sorting: string): void {
    this._activeSorting.set(sorting);
  }

  // Helper methods
  private generateId(): number {
    const tasks = this._tasks();
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  }
}