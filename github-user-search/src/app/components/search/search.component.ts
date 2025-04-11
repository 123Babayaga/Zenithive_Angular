import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, finalize, takeUntil } from 'rxjs/operators';
import { GithubService } from '../../services/github.service';
import { GitHubUser, GitHubSearchResponse } from '../../models/github-user';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    UserDetailsComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  users: GitHubUser[] = [];
  loading = false;
  error: string | null = null;
  selectedUser: string | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.setupSearchObservable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchObservable(): void {
    this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500), 
      distinctUntilChanged(),
      switchMap((query: string | null) => {
        this.users = [];
        this.error = null;
        this.selectedUser = null;
        
        if (!query || query.trim() === '') {
          return of(null);
        }
        
        this.loading = true;
        
        return this.githubService.searchUsers(query).pipe(
          finalize(() => this.loading = false),
          catchError(err => {
            this.error = err.message;
            return of(null);
          })
        );
      })
    ).subscribe((response: GitHubSearchResponse | null) => {
      if (response) {
        this.users = response.items;
      }
    });
  }

  selectUser(user: GitHubUser): void {
    this.selectedUser = user.login;
  }
}