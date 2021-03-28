import { useWorkspace } from 'components/context/Workspace';

const UserList = ({ channel }) => {
  const { privateMessage } = useWorkspace();

  return (
    <>
      Usuarios:
      <ul>
        {channel.users.map(user => (
          <li key={user.id} onClick={() => privateMessage(user.nickname)}>{user.nickname}</li>
        ))}
      </ul>
    </>
  )
};

export default UserList;
