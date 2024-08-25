import { HttpParams } from '@angular/common/http';

export function setHttpParams(params: HttpParams, obj: any): HttpParams {
  Object.keys(obj).forEach((key) => {
    if (params != null) {
      params = params.set(key, obj[key]);
    }
  });
  return params;
}
