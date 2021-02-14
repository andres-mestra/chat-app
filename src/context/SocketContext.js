import { createContext, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { auth } = useContext(AuthContext)  
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.REACT_APP_API_URL);
    
    useEffect(() => {
      if( auth.logged ) {
        conectarSocket();
      }
    },[auth, conectarSocket])

    useEffect(() => {
      if( !auth.logged ) {
        desconectarSocket();
      }
    },[auth, desconectarSocket])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}