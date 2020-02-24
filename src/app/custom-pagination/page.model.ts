import { ɵangular_packages_platform_browser_platform_browser_g } from '@angular/platform-browser';
import { Pageable } from './pageable.model';
import { Sort } from './sort';

export class Page<T> {
  content: Array<T>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;

  public constructor() {
    this.pageable = new Pageable();
  }
}
