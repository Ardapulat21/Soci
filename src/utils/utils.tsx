export const getDateDifference = (targetDate: Date) => {
  const currentDate = new Date();
  const dayDiff = currentDate.getDay() - targetDate.getDay();
  if (dayDiff < 1) {
    return `${currentDate.getHours() - targetDate.getHours()}h ago`;
  } else if (dayDiff < 7) {
    return `${dayDiff}d ago`;
  }
  return `${dayDiff / 7}g ago`;
};
