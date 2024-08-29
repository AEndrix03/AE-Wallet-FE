import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFacadeService } from './aewallet/store/auth-facade.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'AE-Wallet';

  constructor(private authFacade: AuthFacadeService) {}

  ngOnInit(): void {
    this.authFacade.dispatchRefreshToken();
  }
}
