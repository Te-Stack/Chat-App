import "./navbar.css"
import Notification from "../../img/notification.svg"
import Message from "../../img/message.svg"
import Settings from "../../img/settings.svg"
import { useEffect, useState } from "react"


const Navbar = ({socket}) => {
    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)





    useEffect(()=>{
        socket.on("getNotification", (data)=>{
            setNotifications((prev)=>[...prev, data])
        })
    },[socket])

    console.log(notifications)

    const displayNotification =({senderName, type})=>{
        let action;

        if (type===1){
            action="liked"
        } else if(type===2){
            action="commented"
        } else{
            action = "shared"
        }

        return (
            <span className="notification">
                {`${senderName} ${action} your post `}
            </span>
        )
    }
    return ( 
        <div className="navbar">
            <span className="logo">React Chat App</span>
            <div className="icons">
                <div className="icon" onClick={()=>setOpen(!open)}>
                    <img src={Notification} className="iconImg" alt="" />
                    <div className="counter">{notifications.length}</div>
                </div>
                <div className="icon" onClick={()=>setOpen(!open)} >
                    <img src={Message} className="iconImg" alt="" />
                    
                </div>
                <div className="icon" onClick={()=>setOpen(!open)} >
                    <img src={Settings} className="iconImg" alt="" />
                    
                </div>
            </div>
            {open && (
            <div className="notifications">
                {notifications.map((n)=>displayNotification(n))}
                <button className="nButton">Mark as read</button>
            </div>
            )}
        </div>
     );
}
 
export default Navbar;