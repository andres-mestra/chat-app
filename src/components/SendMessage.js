import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";


export const SendMessage = () => {
  

  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const [mensaje, setMensaje] = useState('');

  const handleChange = ({ target }) => {
    setMensaje(target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if( mensaje.length === 0 ){ return } 

    //Emitir un evento de socket para enviar el mensaje
    socket.emit('mensaje-personal', {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje,
    });
    
    setMensaje('')
  }
  

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            name="mensaje"
            value={mensaje}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  )
}
