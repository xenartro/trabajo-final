import { useWorkspace } from 'components/context/Workspace';
import User from 'components/chat/User';
import 'styles/sidebar.css';

const Sidebar = () => {
  const { workspace, join, setActiveChat, part } = useWorkspace();

  function askAndJoin(e) {
    e.stopPropagation();

    const channel = window.prompt('Nombre del canal');

    if (channel) {
      join(channel);
    }
  }



  return (
    <div className="irc-sidebar">
      <div className="irc-sidebar__section">
        <div className="irc-sidebar__section__header">
          Canales
          <button onClick={askAndJoin}>+</button>
        </div>
        <div className="irc-sidebar__section__content">

            <ul className="channel-list">
              {workspace.channels.map(channel => (
                <li className={workspace.activeChat === channel ? 'font-weight-bold' : ''} onClick={() => setActiveChat(channel)} key={channel.id}>
                  #{channel.name}
                  <button onClick={(e) => { e.stopPropagation(); part(channel) }}>x</button>
                </li>
              ))}
              {workspace.channels.length == 0 &&
                <p className="empty-list">No hay canales. <br/>Crea uno nuevo!</p>
              }

            </ul>

        </div>
      </div>
      <div className="irc-sidebar__section">
        <div className="irc-sidebar__section__header">
          Mensajes privados
        </div>
        <div className="irc-sidebar__section__content">

        <ul className="channel-list">

          {workspace.conversations.map((conversation, i) => (
            <li className={ workspace.activeChat === conversation ? 'font-weight-bold user-item ' : 'user-item '} onClick={() => setActiveChat(conversation)} key={i}>
              <User small user={conversation.user.nickname} color={conversation.user.color} clickable />
              <button onClick={(e) => { e.stopPropagation(); part(conversation) }}>x</button>
            </li>
          ))}
          {workspace.conversations.length == 0 &&
            <p className="empty-list">No hay mensajes directos. <br/>Empieza un nuevo chat!</p>
          }
        </ul>


        </div>
      </div>
    </div>
  );
}

export default Sidebar;
