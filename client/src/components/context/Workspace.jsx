import Workspace from 'models/Workspace';
import { createContext, useContext, useState } from 'react';

const WorkspaceContext = createContext(Workspace.getDefault());

const WorkspaceProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(Workspace.getDefault());

  function join(channel) {
    workspace.join(channel);

    setWorkspace(workspace);
  }

  function privateMessage(username) {
    workspace.startConversation(username);

    setWorkspace(workspace);
  }

  <WorkspaceContext.Provider value={{ workspace, join, privateMessage }}>{children}</WorkspaceContext.Provider>
}

export const useWorkspace = () => {
  return useContext(WorkspaceContext);
}

export default WorkspaceProvider;
