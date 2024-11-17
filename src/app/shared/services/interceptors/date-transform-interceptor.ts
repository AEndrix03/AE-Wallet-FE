import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getNoGMTDate, momentToDate } from '../../utils/date.utils';
import moment from 'moment';

export const dateTransformInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  if (req.body != null) {
    const transformedBody = transformDates(req.body);
    const newReq = req.clone({ body: transformedBody });
    return next(newReq);
  }
  return next(req);
};

function transformDates(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformDates(item));
  } else if (typeof obj === 'object' && obj !== null) {
    const transformedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        transformedObj[key] =
          obj[key] instanceof Date
            ? getNoGMTDate(obj[key])
            : moment.isMoment(obj[key])
            ? addTwoHours(momentToDate(obj[key]))
            : transformDates(obj[key]);
      }
    }
    return transformedObj;
  } else {
    return obj;
  }
}

//Fixa momentaneamente il problema del timezone
function addTwoHours(date: Date): Date {
  const newDate = new Date(date.getTime());
  newDate.setHours(newDate.getHours() + 2);
  return newDate;
}
