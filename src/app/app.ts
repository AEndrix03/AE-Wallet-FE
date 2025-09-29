import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './core/services/user.service';
import { userStore } from '@aredegalli/ng-auth';

@Component({
  imports: [RouterModule],
  selector: 'wlt-root',
  template: '<router-outlet></router-outlet>',
  providers: [userStore],
})
export class App {
  private readonly userService = inject(UserService);
  private readonly _userStore = inject(userStore);

  constructor() {
    effect(() => {
      const user = this._userStore.user();
      if (user) {
        this.userService.hello().subscribe();
      }
    });
  }
}
