import Message from 'components/chat/Message';
import { useLayoutEffect, useState } from 'react';
import { searchMessages } from 'services/messages';

const Search = ({ text }) => {
  const [results, setResults] = useState(null);

  useLayoutEffect(() => {
    searchMessages(text)
      .then(setResults);
  }, [text])

  return (
    <div className="irc-chat-container">
      <div className="irc-chat-body">
        <div className="chat-content">
          <h1>Resultados de la búsqueda de "{text}"</h1>

          <div>
            {results && results.length === 0 && (
              <>No se encontraron coincidencias.</>
            )}
          </div>

          {results && results.map((result, j) => (
            <div key={j}>
              <h3>#{result.channel}</h3>
              {result.messages.map((message, i) => (
                <Message key={i} message={message} previousMessage={i > 0 ? result.messages[i - 1] : null} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="irc-chat-input">
        <div className="irc-chat-input__box">
          <div className="box_input">
            <form>
              <button type="submit">Cerrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search;
