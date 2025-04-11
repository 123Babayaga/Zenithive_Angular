import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GitHubUser, GitHubSearchResponse } from '../models/github-user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private token = environment.githubToken;

  constructor(private http: HttpClient) { }

  searchUsers(query: string): Observable<GitHubSearchResponse> {
    const url = `${this.apiUrl}/search/users?q=${query}`;
    return this.http.get<GitHubSearchResponse>(url, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserDetails(username: string): Observable<GitHubUser> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.http.get<GitHubUser>(url, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    
    if (this.token) {
      headers = headers.set('Authorization', `token ${this.token}`);
    }
    
    headers = headers.set('User-Agent', 'GitHub-User-Search-App');
    
    return { headers };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = 'Network error occurred. Please check your connection.';
    } else if (error.status === 403) {
      errorMessage = 'GitHub API rate limit exceeded. Please try again later or add authentication.';
    } else if (error.status === 404) {
      errorMessage = 'User not found.';
    } else {
      errorMessage = `GitHub API error: ${error.status}. ${error.error?.message || 'Unknown error'}`;
    }
    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}