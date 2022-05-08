import moment from "moment";
export function momentToMinutesFromMidnight(m) {
  return m.hour() * 60 + m.minute();
}

export function minutesFromMidnightToMoment(minutesFromMidnight, date) {
  return moment(date).hour(0).minute(minutesFromMidnight);
}

export function objectToQueryParams(obj) {
  const out = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      out.push(`${encodeURI(key)}=${encodeURI(obj[key])}`);
    }
  }

  return out.join("&");
}
