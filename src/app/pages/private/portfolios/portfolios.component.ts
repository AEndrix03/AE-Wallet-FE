import { Component, inject, OnDestroy } from '@angular/core';
import { PortfolioNewCardComponent } from './components/portfolio-new-card/portfolio-new-card.component';
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card.component';
import { PortfolioDto } from '../../../core/models/portfolio.models';
import { Router } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { userStore } from '@aredegalli/ng-auth';
import { AsyncPipe } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PortfolioCreateComponent } from './components/portfolio-create/portfolio-create.component';

@Component({
  selector: 'wlt-portfolios',
  imports: [PortfolioNewCardComponent, PortfolioCardComponent, AsyncPipe],
  templateUrl: './portfolios.component.html',
  providers: [PortfolioService, userStore, DialogService, DynamicDialogRef],
})
export class PortfoliosComponent implements OnDestroy {
  private readonly router: Router = inject(Router);
  private readonly portfolioService = inject(PortfolioService);
  private readonly userStore = inject(userStore);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);

  protected readonly portfolios$: Observable<PortfolioDto[]>;

  protected readonly portfoliosSubject: BehaviorSubject<void> =
    new BehaviorSubject<void>(undefined);
  protected readonly unsubscribe$: Subject<void> = new Subject();

  constructor() {
    this.portfolios$ = this.portfoliosSubject.pipe(
      switchMap(() => {
        const userId = this.userStore.user()?.id;
        if (!userId) {
          console.error('User not logged in');
          return of([]);
        }
        return this.portfolioService.getAllUserPortfolios(userId);
      }),
      shareReplay(1),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.ref) {
      this.ref.close();
    }
  }

  protected openDetail(id: string) {
    this.router.navigate([`portfolios/detail`], { queryParams: { id } });
  }

  protected addNewPortfolio() {
    this.portfolioService
      .getAllPortfolioTypes()
      .pipe(
        tap((portfolioTypeOptions) => {
          this.ref = this.dialogService.open(PortfolioCreateComponent, {
            header: 'Crea Nuovo Portfolio',
            modal: true,
            closeOnEscape: true,
            closable: true,
            width: '60vw',
            inputValues: {
              portfolioTypeOptions,
            },
          });

          this.ref.onClose
            .pipe(
              filter((r) => r != null),
              tap(() => this.portfoliosSubject.next())
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  protected deletePortfolio(id: string) {
    this.portfolioService
      .deletePortfolio(id)
      .pipe(
        tap(() => {
          this.portfoliosSubject.next();
        })
      )
      .subscribe();
  }

  protected editPortfolio(id: string) {
    forkJoin({
      portfolioTypeOptions: this.portfolioService.getAllPortfolioTypes(),
      portfolio: this.portfolioService.getPortfolioById(id),
    })
      .pipe(
        tap(({ portfolioTypeOptions, portfolio }) => {
          this.ref = this.dialogService.open(PortfolioCreateComponent, {
            header: 'Modifica Portfolio',
            modal: true,
            closeOnEscape: true,
            closable: true,
            width: '60vw',
            inputValues: {
              portfolioTypeOptions,
              portfolio,
            },
          });

          this.ref.onClose
            .pipe(
              filter((r) => r != null),
              tap(() => this.portfoliosSubject.next())
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
