import { handleResponse, unHandleResponse } from 'services/commands';
import { isConnected } from 'services/connection';
import { useState, useEffect } from 'react';

const useConnectionStatus = () => {
  const [connected, setConnected] = useState(isConnected());

  useEffect(() => {
    function handleDisconnection() {
      console.log('User disconnected from IRC');

      setConnected(false);
    }

    handleResponse('disconnected', handleDisconnection);

    return () => unHandleResponse('disconnected', handleDisconnection);
  }, []);

  return connected;
}

export default useConnectionStatus;
