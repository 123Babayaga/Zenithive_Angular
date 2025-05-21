import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { catchError, debounceTime, of, Subject, switchMap, tap } from 'rxjs';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // userName!: String;
  apiService: ApiService = inject(ApiService);
  loading: Boolean = false;
  user!: any;
  noUser: Boolean = false;
  noInput: Boolean = true;
  @ViewChild('searchInput') searchInputRef!: ElementRef;

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        tap(() => {
          this.noInput = false;
          this.loading = true;
          this.noUser = false;
        }),
        switchMap((username) => {
          if (!username) {
            setTimeout(() => {
              this.loading = false;
              this.noInput = true;
            }, 3000);
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement) {
              activeElement.blur();
            }
            return of(null);
          }
          return this.apiService.get(username).pipe(
            catchError((error) => {
              setTimeout(() => {
                this.loading = false;
                this.noUser = true;
              }, 3000);

              return of(null);
            })
          );
        })
      )
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
        setTimeout(() => {
          this.loading = false;
          // const activeElement = document.activeElement as HTMLElement;
          // if (activeElement) {
          //   activeElement.blur();
          // }
        }, 3000);
      });
  }

  // onInputChange() {
  //   console.log('input change called');

  //   this.findUser.next(this.userName);
  // }
}
