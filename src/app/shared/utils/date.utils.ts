import moment from 'moment';

export function dateToMoment(date: Date): moment.Moment {
  return moment(date);
}

export function momentToDate(moment: moment.Moment): Date {
  return moment.toDate();
}

export function momentToDateString(
  moment: moment.Moment,
  format?: string
): string {
  return moment.format(format || 'DD-MM-YYYY');
}

export function formatDate(date: Date, format?: string): string {
  return momentToDateString(dateToMoment(date), format || 'DD-MM-YYYY');
}

export function getNoGMTDate(date: Date): Date {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export function formatNoGMTDate(date: Date, format: string): string {
  return formatDate(getNoGMTDate(date), format);
}

export function stringToMoment(date: string, format?: string): moment.Moment {
  return moment(date, format || 'DD-MM-YYYY');
}

export function stringToDate(date: string, format?: string): Date {
  return stringToMoment(date, format).toDate();
}

export function sumMomentDates(dates: moment.Moment[]): moment.Moment {
  return dates.reduce(
    (acc, _date) => acc.add(moment.duration(_date.diff(moment()))),
    moment()
  );
}

export function subtractMomentDates(dates: moment.Moment[]): moment.Moment {
  return dates.reduce(
    (acc, _date) => acc.subtract(moment.duration(_date.diff(moment()))),
    moment()
  );
}

export function getNoGMTMoment(date: moment.Moment): moment.Moment {
  return moment(date.toDate());
}
