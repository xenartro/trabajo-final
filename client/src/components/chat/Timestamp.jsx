import dayjs from 'dayjs';

const Timestamp = ({ event }) => {
  const ts = dayjs.unix(event.ts);
  const now = dayjs().unix();

  const timestamp = (now - ts > 86400) ? ts.fromNow() : ts.format('H:mm');

  return (<small>{timestamp}</small>);
}

export default Timestamp;
