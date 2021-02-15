import { types } from "../../types/types";

// const initialState = {
//   uid: '',
//   chatActivo: null, //Uid del  usuario que quiero enviar un mensaje.
//   usuarios: [], //Todo los usuarios de la db
//   mensajes: [], //El chat seleccionado
// }

export const ChatReducer = (state, action) => {
  switch (action?.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: [...action.payload],
      }

    case types.activarChat:
      if (state.chatActivo === action.payload) return state;
      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      }

    case types.nuevoMensaje:
      if (
        state?.chatActivo === action.payload.de ||
        state?.chatActivo === action.payload.para
      ) {
        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        }
      } else {
        return state;
      }

    case types.cargarMensajes:
      return {
        ...state,
        mensajes: [...action.payload]
      }

    case types.clearChat:
      return {
        uid: '',
        chatActivo: null, 
        usuarios: [], 
        mensajes: [], 
      }

    default:
      return state;
  }
}
