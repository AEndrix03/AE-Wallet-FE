import { Component } from '@angular/core';
import { AccordionComponent } from '../../../../core/components/accordion/accordion.component';
import {
  FiltersTemplateComponent
} from '../../../../core/components/templates/filters-template/filters-template.component';

@Component({
  selector: 'wlt-transactions-filters',
  imports: [AccordionComponent, FiltersTemplateComponent],
  templateUrl: './transactions-filters.component.html',
})
export class TransactionsFiltersComponent {}
