function appendZeroBeforeIntSmallerThan10(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

function getHour(numberInSecond) {
  return appendZeroBeforeIntSmallerThan10(Math.floor(numberInSecond / 3600));
}

function getMinute(numberInSecond) {
  return appendZeroBeforeIntSmallerThan10(Math.floor(numberInSecond / 60));
}

function getSecond(numberInSecond) {
  return appendZeroBeforeIntSmallerThan10(Math.floor(numberInSecond));
}

const convertToReadableTime = (timeInMilisecs) => {
  let timeInSecond = timeInMilisecs / 1000;
  if (timeInSecond < 1 || !timeInSecond) {
    return "00:00";
  } else if (timeInSecond < 60) {
    return `00:${getSecond(timeInSecond)}`;
  } else if (timeInSecond < 3600) {
    return `${getMinute(timeInSecond)}:${getSecond(timeInSecond % 60)}`;
  } else {
    return `${getHour(timeInSecond)}:${getMinute(
      timeInSecond % 3600
    )}:${getSecond((timeInSecond % 3600) % 60)}`;
  }
};

export default convertToReadableTime;
