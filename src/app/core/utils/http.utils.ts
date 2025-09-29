import { HttpParams } from '@angular/common/http';

export class HttpUtils {
  public static getParams<T>(object: T): HttpParams {
    const params = new HttpParams();
    Object.entries(object).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.set(key, value.toString());
      }
    });
    return params;
  }
}
