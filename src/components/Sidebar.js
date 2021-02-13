import { SidebarChatItem } from "./SidebarChatItem"


export const Sidebar = () => {
  return (
    <div className="inbox_chat">

      <SidebarChatItem/>

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>

    </div>
  )
}
