import { createContext, useContext, useEffect } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'
import { ChatContext } from './chat/ChatContext';

import { types } from '../types/types';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { auth } = useContext(AuthContext)  
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.REACT_APP_API_URL);
    const { dispatch } = useContext(ChatContext)

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

    //Escuchar los cambios en los usuarios conectados
    useEffect(() => {
      socket?.on('lista-de-usuarios', (usuarios) => {
        dispatch({
          type: types.usuariosCargados,
          payload: usuarios
        })
      })
    },[socket, dispatch])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}