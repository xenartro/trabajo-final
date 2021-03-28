const UserList = ({ channel }) => {
  return (
    <>
      Usuarios:
      <ul>
        {channel.users.map(user => (
          <li key={user.id}>{user.nickname}</li>
        ))}
      </ul>
    </>
  )
};

export default UserList;
