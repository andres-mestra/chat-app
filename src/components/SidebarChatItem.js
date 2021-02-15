import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";


export const SidebarChatItem = ({ usuario }) => {

  const { chatState, dispatch } = useContext(ChatContext);
  const { chatActivo } = chatState;
  const { uid, nombre, email, online } = usuario;

  const handleClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: uid,
    })

    //Cargar los mensajes del chat
    const resp = await fetchConToken(`api/mensajes/${uid}`);
    dispatch({
      type: types.cargarMensajes,
      payload: resp.mensajes,
    })

    //TODO:Mover el scroll

  }

  return (
    <div
      className={`chat_list ${ ( chatActivo === uid ) && 'active_chat' }`}
      onClick={handleClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img src="assets/avatar.png" alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>{nombre} - {email}</h5>
          {
            (online)
              ? <span className="text-success">Online</span>
              : <span className="text-danger">Offline</span>
          }
        </div>
      </div>
    </div>
  )
}
