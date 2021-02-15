import { horaMes } from "../helpers/horaMes"


export const IncomingMessage = ({ msg }) => {

  const fecha = horaMes(msg.createdAt)

  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src="assets/avatar.png" alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{ msg.mensaje }</p>
          <span className="time_date">{ fecha }</span>
        </div>
      </div>
    </div>
  )
}
