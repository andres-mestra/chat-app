import { useContext } from 'react'
import '../css/chat.css'
import { ChatContext } from '../context/chat/ChatContext'
import { InboxPeople } from '../components/InboxPeople'
import { Messages } from '../components/Messages'
import { ChatSelect } from '../components/ChatSelect'

export const ChatPage = () => {

  const { chatState } = useContext(ChatContext)

  return (
    <div className="messaging">
      <div className="inbox_msg">

        <InboxPeople />
        {
          (chatState.chatActivo)
            ? <Messages />
            : <ChatSelect />

        }

      </div>
    </div>
  )
}
