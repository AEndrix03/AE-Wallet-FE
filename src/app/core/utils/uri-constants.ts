import { environment } from '../../environments/environment';

export class UriConstants {
  private static readonly base: string = environment.apiUrl;

  public static readonly portfolioUrl: string = `${UriConstants.base}/portfolio`;
  public static readonly transactionUrl: string = `${UriConstants.base}/transaction`;
  public static readonly userUrl: string = `${UriConstants.base}/user`;
}
