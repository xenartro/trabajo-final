import Workspace from 'models/Workspace';
import { createContext, useContext, useState } from 'react';
import { join } from 'services/commands';

const WorkspaceContext = createContext(Workspace.getDefault());

const WorkspaceProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(Workspace.getDefault());

  function join(channel) {
    workspace.join(channel);
    
    join(channel);

    setWorkspace(workspace);
  }

  function privateMessage(username) {
    workspace.startConversation(username);

    setWorkspace(workspace);
  }

  return <WorkspaceContext.Provider value={{ workspace, join, privateMessage }}>{children}</WorkspaceContext.Provider>
}

export const useWorkspace = () => {
  return useContext(WorkspaceContext);
}

export default WorkspaceProvider;
