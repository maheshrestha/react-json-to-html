import moment from 'moment';

export const formatPrice = function(value: number): string {
  return value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
};

export const formatDateTolongDate = function(timestamp: number): string {
  return moment(timestamp).format('DD MMM YYYY');
};

export const timestampToShortDate = function(timestamp: number): string {
  return moment(timestamp).format('DD/MM/YYYY');
};

export const timestampToShortDateWithDay = function(timestamp: number): string {
  return moment(timestamp).format('dddd, DD/MM/YYYY');
};

export const timestampToUTC = function(timestamp: number): string {
  return moment(timestamp).format();
};

export const timestampToTime = function(timestamp: number): string {
  return moment(timestamp).format('hh:mm a');
};

export const formatRecurringFrequency = function(value: string): string {
  if (value) {
    return (
      value
        .replace('_', ' ')
        .charAt(0)
        .toUpperCase() + value.replace('_', ' ').slice(1)
    );
  } else {
    return 'Once only';
  }
};

export const formatRecurringEndDate = function(value: string): string {
  if (value) {
    return 'Ends on ' + moment(value).format('DD/MM/YYYY');
  } else {
    return 'Never ends';
  }
};
