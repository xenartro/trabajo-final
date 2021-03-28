import Channel from 'models/Channel';
import Workspace from 'models/Workspace';
import { createContext, useContext, useState, useEffect } from 'react';
import { handleResponse, join as joinChannel, sendMessage, part as partChannel, unHandleResponse } from 'services/commands';
import { useUserContext } from 'components/context/User';

const WorkspaceContext = createContext(Workspace.getDefault());

const WorkspaceProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(Workspace.getDefault());
  const { user } = useUserContext();

  useEffect(() => {
    function messageHandler({ from, to, message }) {
      workspace.messageReceived(from, to, message);

      setWorkspace(workspace.clone());
    }

    handleResponse('message', messageHandler);

    return () => {
      unHandleResponse('message', messageHandler);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    function userListHandler({ channel, nicknames }) {
      workspace.receivedUserList(channel, nicknames);

      setWorkspace(workspace.clone());
    }

    handleResponse('user_list', userListHandler);

    return () => {
      unHandleResponse('user_list', userListHandler);
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

  function setActiveChat(chat) {
    workspace.setActiveChat(chat);

    setWorkspace(workspace.clone());
  }

  function part(chat) {
    workspace.part(chat);

    if (chat instanceof Channel) {
      partChannel(chat.name);
    }

    setWorkspace(workspace.clone());
  }

  return <WorkspaceContext.Provider value={{ workspace, join, privateMessage, say, setActiveChat, part }}>{children}</WorkspaceContext.Provider>
}

export const useWorkspace = () => {
  return useContext(WorkspaceContext);
}

export default WorkspaceProvider;
