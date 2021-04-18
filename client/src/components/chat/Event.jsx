import Timestamp from './Timestamp';
import { eventToString } from 'services/messages';
import './event.css';

const Event = ({ event }) => {
  return (
    <div>
      <div><strong>{event.nickname}</strong>: <Timestamp event={event} /></div>
      <div>ℹ <span className="chat__event">{eventToString(event.event)}</span></div>
    </div>
  )
}

export default Event;
