import moment from "moment";

export const formatPrice = function (value) {
  return value.toLocaleString("en-AU", { style: "currency", currency: "AUD" });
};

export const formatDateTolongDate = function (timestamp) {
  return moment(timestamp).format("DD MMM YYYY");
};

export const timestampToShortDate = function (timestamp) {
  return moment(timestamp).format("DD/MM/YYYY");
};

export const timestampToShortDateWithDay = function (timestamp) {
  return moment(timestamp).format("dddd, DD/MM/YYYY");
};

export const timestampToUTC = function (timestamp) {
  return moment(timestamp).format();
};

export const timestampToTime = function (timestamp) {
  return moment(timestamp).format("hh:mm a");
};
