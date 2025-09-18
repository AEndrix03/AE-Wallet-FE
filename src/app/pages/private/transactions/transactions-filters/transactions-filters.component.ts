import { Component } from '@angular/core';
import { FiltersTemplateComponent } from '../../../../core/components/templates/filters-template/filters-template.component';

@Component({
  selector: 'wlt-transactions-filters',
  imports: [FiltersTemplateComponent],
  templateUrl: './transactions-filters.component.html',
})
export class TransactionsFiltersComponent {}
