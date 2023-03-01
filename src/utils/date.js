export function getFormattedDate(dateStr) {
  const dateNow = new Date();
  const date = new Date(dateStr);
  const dateTimezone = 'i-GMT' + date.getTimezoneOffset()/60;
  const hours = date.getHours();
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const dateOffsetHours = (dateNow - date)/3600000;
  
  let dateFormat = '';
  
  if (dateNow.toDateString() === date.toDateString()) { // Если даты совпадают
    dateFormat = 'Сегодня';
  } else if (dateOffsetHours < 24) { // Если прошло не более суток
    dateFormat = 'Вчера';
  } else {
    dateFormat = Math.floor(dateOffsetHours/24);
    dateFormat < 5 ? dateFormat += ' дня' : dateFormat += ' дней';
  }

  return dateFormat + ' ' + formattedHours + ':' + formattedMinutes + ' ' + dateTimezone;
}