import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { Subject, takeUntil, tap } from 'rxjs';
import moment from 'moment';
import {
  dateToMoment,
  getNoGMTDate,
  getNoGMTMoment,
} from '../../../utils/date.utils';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [MaterialModule, NgClass],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent
  implements AfterViewInit, OnDestroy, OnChanges
{
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() label: string = '';
  @Input() class: string = '';
  @Input() date: moment.Moment | Date | string = null;

  @Output() dateChange = new EventEmitter<Date>();
  @Output() momentChange = new EventEmitter<moment.Moment>();

  control = new FormControl();

  unsubscribe$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['date']?.currentValue) {
      let d = changes?.['date']?.currentValue;

      if (typeof d === 'string') {
        d = moment(d);
      } else if (d instanceof Date) {
        d = dateToMoment(d);
      }

      this.control.setValue(getNoGMTMoment(d), { emitEvent: false });
    }
  }

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((value) =>
          this.momentChange.emit(dateToMoment(getNoGMTDate(value)))
        ),
        tap((value) => this.dateChange.emit(getNoGMTDate(value)))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
