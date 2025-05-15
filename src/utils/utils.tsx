export const getDateDifference = (date: string) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = now.getTime() - targetDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return `${diffMinutes}m ago`;
  else if (diffDays < 1) return `${diffHours}h ago`;
  else if (diffDays < 7) return `${diffDays}d ago`;
  return `${diffDays / 7}w ago`;
};
