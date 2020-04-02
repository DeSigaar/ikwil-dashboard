let moment = require("moment");

export function GetDayByNumber(n) {
  let day = "";
  switch (n) {
    case 0:
      day = "maandag";
      break;
    case 1:
      day = "dinsdag";
      break;
    case 2:
      day = "woensdag";
      break;
    case 3:
      day = "donderdag";
      break;
    case 4:
      day = "vrijdag";
      break;
    case 5:
      day = "zaterdag";
      break;
    case 6:
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
