import ReactMarkdown from 'react-markdown';
import 'styles/user.css';

const User = ({ user, small, avatarOnly, clickable, right, color }) => {
  let initials = user.substring(0,2);

  var userClass = "irc-user" + (color ? " irc-user--color-"+color : "") + (right ? " irc-user--right" : "") + (small ? " irc-user--small" : "") + (avatarOnly ? " irc-user--avatar-only" : "") + (clickable ? " irc-user--clickable" : "");

  return (
    <div className={userClass}>
      <div className="irc-user__avatar">
        {initials}
      </div>
      <div className="irc-user__name">
        {user}
      </div>
    </div>
  )
}

export default User;
