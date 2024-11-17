import { environment } from '../../environments/environment';

export class UriCostants {
  public static readonly apiPath = `${environment.apiUrl}`;
  public static readonly authPath = `${this.apiPath}/auth`;
  public static readonly walletPath = `${this.apiPath}/wallet`;
}
