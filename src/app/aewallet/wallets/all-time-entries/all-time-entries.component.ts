import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WalletEntryTableComponent } from '../wallet-entry-table/wallet-entry-table.component';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { EntryDto, EntryFilterDto } from '../../store/models/wallet.model';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-all-time-entries',
  standalone: true,
  imports: [WalletEntryTableComponent],
  templateUrl: './all-time-entries.component.html',
  styleUrl: './all-time-entries.component.scss',
})
export class AllTimeEntriesComponent {
  @Input() entries: EntryDto[] = [];

  @Output() refresh = new EventEmitter<void>();
  @Output() filter = new EventEmitter<EntryFilterDto>();

  refreshEntries() {
    this.refresh.emit();
  }

  filterEntries(filter: EntryFilterDto) {
    this.filter.emit(filter);
  }
}
