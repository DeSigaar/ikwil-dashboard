let moment = require("moment");

export function GetDayByNumber(n) {
  let day = "";
  switch (n) {
    case 1:
      day = "maandag";
      break;
    case 2:
      day = "dinsdag";
      break;
    case 3:
      day = "woensdag";
      break;
    case 4:
      day = "donderdag";
      break;
    case 5:
      day = "vrijdag";
      break;
    case 6:
      day = "zaterdag";
      break;
    case 7:
      day = "zondag";
      break;
    default:
      break;
  }
  return day;
}
export function isThisWeek(input) {
  return moment(input).isSame(new Date(), "week");
}

export function getDayNumber(day) {
  let number = 0;
  switch (day) {
    case "monday":
      number = 1;
      break;
    case "tuesday":
      number = 2;
      break;
    case "wednesday":
      number = 3;
      break;
    case "thursday":
      number = 4;
      break;
    case "friday":
      number = 5;
      break;
    case "saturday":
      number = 6;
      break;
    case "sunday":
      number = 7;
      break;
    default:
      break;
  }
  return number;
}
