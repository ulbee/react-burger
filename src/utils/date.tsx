export function getFormattedDate(dateStr: string | Date) {
  const dateNow: Date = new Date();
  const date: Date = new Date(dateStr);
  const dateTimezone: string = 'i-GMT' + date.getTimezoneOffset()/60;
  const hours: number = date.getHours();
  const formattedHours: string = hours < 10 ? '0' + hours : hours.toString();
  const minutes: number = date.getMinutes();
  const formattedMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();
  const dateOffsetHours: number = (dateNow.getTime() - date.getTime())/3600000;
  
  let dateFormat: string = '';
  
  if (dateNow.toDateString() === date.toDateString()) { // Если даты совпадают
    dateFormat = 'Сегодня';
  } else if (dateOffsetHours < 24) { // Если прошло не более суток
    dateFormat = 'Вчера';
  } else {
    const dateNumber: number = Math.floor(dateOffsetHours/24);
    dateFormat += dateNumber;
    dateNumber < 5 ? dateFormat += ' дня' : dateFormat += ' дней';
  }

  return dateFormat + ' ' + formattedHours + ':' + formattedMinutes + ' ' + dateTimezone;
}