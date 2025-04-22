import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  

  private users: User[] = [
    { email: 'test@example.com', name: 'Test User' },
    { email: 'admin@example.com', name: 'Admin User' }
  ];

  constructor() {
  
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email);
    
    if (user) {
      this.currentUserSignal.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUserSignal() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }
}