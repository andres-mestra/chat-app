import { horaMes } from "../helpers/horaMes"


export const OutgoingMessage = ({ msg }) => {

  const fecha = horaMes(msg.createdAt);

  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{ msg.mensaje }</p>
        <span className="time_date">{ fecha }</span>
      </div>
    </div>
  )
}
