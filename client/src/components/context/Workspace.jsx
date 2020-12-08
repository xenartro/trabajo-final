import Workspace from 'models/Workspace';
import { createContext, useContext, useState, useEffect } from 'react';
import { handleResponse, join as joinChannel } from 'services/commands';

const WorkspaceContext = createContext(Workspace.getDefault());

const WorkspaceProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(Workspace.getDefault());

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

  return <WorkspaceContext.Provider value={{ workspace, join, privateMessage }}>{children}</WorkspaceContext.Provider>
}

export const useWorkspace = () => {
  return useContext(WorkspaceContext);
}

export default WorkspaceProvider;
