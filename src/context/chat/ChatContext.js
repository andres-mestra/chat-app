import { createContext, useReducer } from "react";
import { ChatReducer } from "./ChatReducer";


export const ChatContext = createContext();

const initialState = {
  uid: '',
  chatActivo: null, //Uid del  usuario que quiero enviar un mensaje.
  usuarios: [], //Todo los usuarios de la db
  mensajes: [], //El chat seleccionado
}

export const ChatProvider = ({children}) => {

  const [ chatState, dispatch ] = useReducer( ChatReducer, initialState );

  return (
    <ChatContext.Provider value={{
      chatState,
      dispatch,
    }} >
      {children}
    </ChatContext.Provider>
  )
}