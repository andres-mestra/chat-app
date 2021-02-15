import { types } from "../../types/types";



export const ChatReducer = ( state , action ) => {
  switch (action?.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: [...action.payload],
      }
      
  
    default:
      return state;
  }
}
