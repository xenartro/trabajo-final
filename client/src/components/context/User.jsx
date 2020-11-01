import React, { useContext, useState } from 'react';
import { getUser, setUser as storeUser } from 'services/user';

const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const value = {
    user,
    set: (user) => {
      setUser(user);
      storeUser(user);
    }
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);

  return context?.user;
}

export default UserContextProvider;
