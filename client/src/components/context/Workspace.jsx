import Workspace from 'models/Workspace';
import { createContext, useContext, useState, useEffect } from 'react';
import { handleResponse, join as joinChannel, sendMessage } from 'services/commands';
import { useUserContext } from 'components/context/User';

const WorkspaceContext = createContext(Workspace.getDefault());

const WorkspaceProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(Workspace.getDefault());
  const { user } = useUserContext();

  useEffect(() => {
    handleResponse('message', ({ from, to, message }) => {
      console.log(from, to, message);
      workspace.messageReceived(from, to, message);

      setWorkspace(workspace.clone());
    });
    return () => {
      handleResponse('message', undefined);
    }
  }, []); // eslint-disable-line

  function join(channel) {
    workspace.join(channel);

    joinChannel(channel);

    setWorkspace(workspace.clone());
  }

  function privateMessage(username) {
    workspace.startConversation(username);

    setWorkspace(workspace.clone());
  }

  function say(target, message) {
    workspace.messageReceived(user.nickname, target.nickname || target.name, message);

    sendMessage(target, message);
  }

  return <WorkspaceContext.Provider value={{ workspace, join, privateMessage, say }}>{children}</WorkspaceContext.Provider>
}

export const useWorkspace = () => {
  return useContext(WorkspaceContext);
}

export default WorkspaceProvider;
