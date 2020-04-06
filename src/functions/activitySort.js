import { isThisWeek } from "./dates";
const moment = require("moment");

export const sortData = (activities) => {
  let tempSortedDays = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };
  if (typeof activities !== "undefined") {
    activities.forEach((activity) => {
      if (typeof activity.day !== "undefined") {
        const date = new Date(activity.day.date);
        const dateToday = new Date();
        let thisWeek = isThisWeek(date);

        if (typeof thisWeek !== "undefined") {
          if (thisWeek) {
            if (date > dateToday) {
              switch (date.getDay()) {
                case 1:
                  tempSortedDays.Monday.push(activity);

                  break;
                case 2:
                  tempSortedDays.Tuesday.push(activity);
                  break;
                case 3:
                  tempSortedDays.Wednesday.push(activity);
                  break;
                case 4:
                  tempSortedDays.Thursday.push(activity);
                  break;
                case 5:
                  tempSortedDays.Friday.push(activity);
                  break;
                case 6:
                  tempSortedDays.Saturday.push(activity);
                  break;
                case 7:
                  tempSortedDays.Sunday.push(activity);
                  break;
                default:
                  break;
              }
            }
          }
        }
      }

      if (typeof activity.days !== "undefined") {
        activity.days.forEach((day) => {
          if (day.startTime !== "" && day.endTime !== "") {
            if (day.name === "Monday") {
              tempSortedDays.Monday.push(activity);
            }
            if (day.name === "Tuesday") {
              tempSortedDays.Tuesday.push(activity);
            }
            if (day.name === "Wednesday") {
              tempSortedDays.Wednesday.push(activity);
            }
            if (day.name === "Thursday") {
              tempSortedDays.Thursday.push(activity);
            }
            if (day.name === "Friday") {
              tempSortedDays.Friday.push(activity);
            }
            if (day.name === "Saturday") {
              tempSortedDays.Saturday.push(activity);
            }
            if (day.name === "Sunday") {
              tempSortedDays.Sunday.push(activity);
            }
          }
        });
      }
    });
  }
  return sortArray(tempSortedDays);
};

export const sortArray = (arr) => {
  Object.keys(arr).forEach(function (key) {
    arr[key].sort((a, b) => {
      return (
        moment
          .duration(a.days.find((item) => item.name === key).startTime)
          .asSeconds() -
        moment
          .duration(b.days.find((item) => item.name === key).startTime)
          .asSeconds()
      );
    });
  });

  return arr;
};
