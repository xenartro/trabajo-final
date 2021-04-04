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

  useEffect(() => {
    function topicHandler({ channel, topic, nickname }) {
      workspace.receivedTopic(channel, topic, nickname);

      setWorkspace(workspace.clone());
    }

    handleResponse('topic', topicHandler);

    return () => {
      unHandleResponse('topic', topicHandler);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    function joinHandler({ channel, nickname }) {
      workspace.userJoined(channel, nickname);

      setWorkspace(workspace.clone());
    }

    handleResponse('join', joinHandler);

    return () => {
      unHandleResponse('join', joinHandler);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    function partHandler({ channel, nickname }) {
      workspace.userLeft(channel, nickname);

      setWorkspace(workspace.clone());
    }

    handleResponse('part', partHandler);
    handleResponse('kick', partHandler);

    return () => {
      unHandleResponse('part', partHandler);
      unHandleResponse('kick', partHandler);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    function userDisconnectedHandler({ nickname }) {
      workspace.userDisconnected(nickname);

      setWorkspace(workspace.clone());
    }

    handleResponse('quit', userDisconnectedHandler);

    return () => {
      unHandleResponse('quit', userDisconnectedHandler);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    function nicknameChangeHandler({ oldnick, newnick }) {
      workspace.userNicknameChanged(oldnick, newnick);

      setWorkspace(workspace.clone());
    }

    handleResponse('nick', nicknameChangeHandler);

    return () => {
      unHandleResponse('nick', nicknameChangeHandler);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    function userInfoHandler({ nickname, name, user, host }) {
      workspace.receivedUserInfo(nickname, name, user, host);

      setWorkspace(workspace.clone());
    }

    handleResponse('whois', userInfoHandler);

    return () => {
      unHandleResponse('whois', userInfoHandler);
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
    workspace.messageSent(user.nickname, target, message);

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
