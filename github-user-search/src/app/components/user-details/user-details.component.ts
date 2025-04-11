import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitHubUser } from '../../models/github-user';
import { GithubService } from '../../services/github.service';
import { finalize } from 'rxjs/operators';


import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnChanges {
  @Input() username: string | null = null;
  
  user: GitHubUser | null = null;
  loading = false;
  error: string | null = null;

  constructor(private githubService: GithubService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && this.username) {
      this.loadUserDetails();
    }
  }

  private loadUserDetails(): void {
    if (!this.username) return;
    
    this.loading = true;
    this.error = null;
    
    this.githubService.getUserDetails(this.username)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (err) => {
          this.error = err.message;
        }
      });
  }
}