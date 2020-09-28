const convertSematicDate = (timestring) => {
  let current = Date.now();
  console.log(current);
  if (current - timestring <= 60000) {
    return "Vài giây trước";
  } else if (current - timestring <= 3600000) {
    let elapsedMinute = Math.ceil(((current - timestring) % 3600) / 1000);
    return `${elapsedMinute} phút trước`;
  } else {
    return timestring;
  }
};

export default convertSematicDate;
