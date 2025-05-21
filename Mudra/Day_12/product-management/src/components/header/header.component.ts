import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
// import { filterByCategory } from '../../store/actions/product.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements DoCheck {
  isFilterClicked: Boolean = false;
  // store: Store = inject(Store);
  selectedFilter: string[] = [];
  isHome: Boolean = true;
  router: Router = inject(Router);

  ngDoCheck(): void {
    if (this.router.url === '/') {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
  }

  filterClicked() {
    this.isFilterClicked = !this.isFilterClicked;
  }

  // selectFilter(filter: string) {
  //   if (filter == '') {
  //     this.selectedFilter = this.selectedFilter.filter((cat) => cat == '');
  //     // this.store.dispatch(filterByCategory({ categories: [] }));
  //   } else {
  //     if (filter == 'womens clothing') {
  //       if (this.selectedFilter.includes("women's clothing")) {
  //         this.selectedFilter = this.selectedFilter.filter(
  //           (cat) => cat != "women's clothing"
  //         );
  //       } else {
  //         this.selectedFilter = [...this.selectedFilter, "women's clothing"];
  //       }
  //     } else if (filter == 'mens clothing') {
  //       if (this.selectedFilter.includes("men's clothing")) {
  //         this.selectedFilter = this.selectedFilter.filter(
  //           (cat) => cat != "men's clothing"
  //         );
  //       } else {
  //         this.selectedFilter = [...this.selectedFilter, "men's clothing"];
  //       }
  //     } else {
  //       if (this.selectedFilter.includes(filter)) {
  //         this.selectedFilter = this.selectedFilter.filter(
  //           (cat) => cat != filter
  //         );
  //       } else {
  //         this.selectedFilter = [...this.selectedFilter, filter];
  //       }
  //     }
  //     console.log(this.selectedFilter);
  //     this.store.dispatch(
  //       filterByCategory({ categories: this.selectedFilter })
  //     );
  //   }
  // }

  closeFilter() {
    this.isFilterClicked = false;
  }
}
