export const getMonthNormalisedString = (dateInstance: Date) => {
  const month = dateInstance.getMonth();
  return month < 9 ? `0${month + 1}` : `${month + 1}`;
};
export const getDayNormalisedString = (dateInstance: Date) => {
  const date = dateInstance.getDate();
  return date <= 9 ? `0${date}` : `${date}`;
};
export const getTimeNormalisedString = (dateInstance: Date) => {
  const hours = dateInstance.getHours();
  const hoursString = hours <= 9 ? `0${hours}` : `${hours}`;
  const minutes = dateInstance.getMinutes();
  const minutesString = minutes <= 9 ? `0${minutes}` : `${minutes}`;
  const seconds = dateInstance.getSeconds();
  const secondsString = seconds <= 9 ? `0${seconds}` : `${seconds}`;
  return `${hoursString}:${minutesString}:${secondsString}`;
};

export const getFormattedDateStirng = (date: Date, options?: { dottes: boolean }) => {
  const year = date.getFullYear();
  const month = getMonthNormalisedString(date);
  const day = getDayNormalisedString(date);
  if (options?.dottes) return `${year}.${month}.${day}`;
  return `${year}-${month}-${day}`;
};

export const parseDateString = (
  dateString: string,
): { year: number; month: number; date: number } | null => {
  const [yearString, monthString, dayString] = dateString.split('-');
  const year = Number(yearString);
  const month = Number(monthString) - 1;
  const date = Number(dayString);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(date)) return null;
  return { year, month, date };
};

export const parseTimeString = (
  timeString: string,
): { hours: number; minutes: number; seconds: number } | null => {
  const [hoursString, minutesString, secondsString] = timeString.split(':');
  const hours = Number(hoursString);
  const minutes = Number(minutesString);
  const seconds = secondsString ? Number(secondsString) : 0;

  if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) return null;
  return { hours, minutes, seconds };
};
