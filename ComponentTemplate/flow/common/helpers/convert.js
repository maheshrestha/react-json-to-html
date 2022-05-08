import moment from 'moment';
import type Moment from 'moment';

export function momentToMinutesFromMidnight(m: Moment): number {
  return m.hour() * 60 + m.minute();
}

export function minutesFromMidnightToMoment(
  minutesFromMidnight: number,
  date?: Moment
): Moment {
  return moment(date)
    .hour(0)
    .minute(minutesFromMidnight);
}

export function objectToQueryParams(obj: Object): string {
  const out = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      out.push(`${encodeURI(key)}=${encodeURI(obj[key])}`);
    }
  }

  return out.join('&');
}
