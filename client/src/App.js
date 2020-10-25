import './App.css';
import { init, send } from 'services/commands';
import { useState, useEffect } from 'react';

function App() {
  const [command, setCommand] = useState('');

  function handleChange(e) {
    setCommand(e.currentTarget.value);
  }

  function submit(e) {
    e.preventDefault();

    send(command);

    setCommand('');
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input type="text" value={command} onChange={handleChange} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
