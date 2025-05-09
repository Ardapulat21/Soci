export const getDateDifference = (targetDate: Date) => {
  const currentDate = new Date();
  const diffInMs = currentDate.getDate() - targetDate.getDate();
  const diffInM = Math.floor(diffInMs / (60 * 1000));
  const diffInDays = Math.floor(diffInM / (60 * 24));
  console.log(`Ms:${diffInMs}\nM:${diffInM}\nH:${diffInM / 60}`);
  // if (diffInM < 60) return `${diffInM}m ago`;
  if (diffInDays < 1) return `${diffInM / 60}h ago`;
  else if (diffInDays < 7) return `${diffInDays}d ago`;
  return `${diffInDays / 7}w ago`;
};
