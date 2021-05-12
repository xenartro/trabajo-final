import Timestamp from './Timestamp';
import { eventToString } from 'services/messages';
import 'styles/events.css';

const Event = ({ event }) => {
  return (
    <div className="chat__event">
      <div className="chat__event__message"><span > <strong>{event.nickname}</strong> {eventToString(event.event)}</span></div>
      <div className="chat__event__time"> <Timestamp event={event} /></div>
    </div>
  )
}

export default Event;
