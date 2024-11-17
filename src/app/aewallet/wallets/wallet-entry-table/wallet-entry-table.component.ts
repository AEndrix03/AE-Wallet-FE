import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EntryDto } from '../../store/models/wallet.model';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormContainerComponent } from '../../../shared/components/utils/form-container/form-container.component';

@Component({
  selector: 'app-wallet-entry-table',
  standalone: true,
  imports: [MaterialModule, FormContainerComponent],
  templateUrl: './wallet-entry-table.component.html',
  styleUrl: './wallet-entry-table.component.scss',
})
export class WalletEntryTableComponent implements OnChanges, AfterViewInit {
  @Input() walletId: number = null;
  @Input() entries: EntryDto[] = [];
  @Input() hideAdd: boolean = true;

  @Output() add = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() filter = new EventEmitter<void>();

  displayedColumns: string[] = [
    'title',
    'description',
    'value',
    'date',
    'actions',
  ];
  dataSource = new MatTableDataSource<EntryDto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.['entries'].currentValue) {
      this.dataSource.data = this.entries;
    }
  }
}
