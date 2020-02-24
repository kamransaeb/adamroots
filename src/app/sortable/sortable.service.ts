import { Injectable } from '@angular/core';
import { SortableColumn } from './sortable.model';

@Injectable({
  providedIn: 'root'
})
export class SortableService {

  constructor() { }

  public getSortableColumn(sortableColumns: SortableColumn[]): SortableColumn {
    return sortableColumns.find(
      column => column.direction != null
    );
  }

  public clearPreviousSorting(chosenColumn: SortableColumn, sortableColumns: SortableColumn[]) {
    sortableColumns.filter(
      column => column !== chosenColumn
    ).forEach(
      column => column.direction = null
    );
  }
}
