import { DateTime } from 'luxon';

export const horaMes = (fecha) => {
  const hoyMes = DateTime.fromISO(fecha).toFormat('t | LLL dd')
  return hoyMes;
}