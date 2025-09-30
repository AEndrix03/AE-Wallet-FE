import { Component, inject } from '@angular/core';
import { PortfolioNewCardComponent } from './components/portfolio-new-card/portfolio-new-card.component';
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card.component';
import { PortfolioDto } from '../../../core/models/portfolio.models';
import { Router } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { filter, Observable, switchMap, tap } from 'rxjs';
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
export class PortfoliosComponent {
  private readonly router: Router = inject(Router);
  private readonly portfolioService = inject(PortfolioService);
  private readonly userStore = inject(userStore);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);

  protected readonly portfolios$: Observable<PortfolioDto[]>;

  constructor() {
    this.portfolios$ = this.portfolioService.getAllUserPortfolios(
      this.userStore.user()?.id
    );
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
              switchMap((r) =>
                this.portfolioService.savePortfolio({
                  ...r,
                  userId: this.userStore.user()?.id,
                })
              )
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
