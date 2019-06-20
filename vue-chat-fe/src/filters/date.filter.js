import dayjs from 'dayjs';

export default function formatFilter(
  date,
  pattern = 'YYYY-MM-DD HH:mm:ss',
) {
  return dayjs(date).format(pattern);
}
