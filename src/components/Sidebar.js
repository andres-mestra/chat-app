import { useContext } from "react"
import { ChatContext } from "../context/chat/ChatContext"
import { AuthContext } from "../auth/AuthContext";
import { SidebarChatItem } from "./SidebarChatItem"


export const Sidebar = () => {

  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  const usuarios = chatState?.usuarios;
  const currentUser = auth.uid;

  return (
    <div className="inbox_chat">
      {
        (usuarios) && (
          usuarios
          .filter( user => user.uid !== currentUser )
          .map((usuario) => (
           <SidebarChatItem  key={usuario.uid} usuario={usuario} /> 
          ))
        )
      }

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>

    </div>
  )
}
