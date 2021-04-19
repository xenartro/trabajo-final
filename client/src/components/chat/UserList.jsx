import { useWorkspace } from 'components/context/Workspace';
import 'styles/user-list.css';
import User from 'components/chat/User';

const UserList = ({ channel }) => {
  const { privateMessage } = useWorkspace();

  return (
    <div className="irc-user-list">
      <div className="irc-user-list__title">
        Usuarios:
      </div>

      <div>
        {channel.users.map(user => (
          <div key={user.id} onClick={() => privateMessage(user.nickname)}>
            <User  key={user.id} user={user.nickname} color={user.color} small clickable/>
          </div>
        ))}
      </div>
    </div>
  )
};

export default UserList;
