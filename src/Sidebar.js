import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms,setRoomName] = useState([]) 
    const [{user},dispatch] = useStateValue()
    const addRoom=()=>{
        const chatName = prompt("Enter the chat name")
        if(chatName){
            db.collection('rooms').add({
                name:chatName,
                username:user.displayName,
                profilePic:user.photoURL,
            })
        }
    }

    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot=>{
            setRoomName(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })))
        })
    },[])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__inputContainer">
                    <SearchIcon/>
                    <input type="text" placeholder="Search"/>
                </div>
                <div className="sidebar__Icon" onClick={addRoom}>
                    
                    <RateReviewOutlinedIcon className="sidebar__headerIcon"/>
                </div>
            </div>
            <div className="sidebar__chats">
            {rooms.map(room=>(
                
                <SidebarChat id={room.id} key={room.id} name={room.data.name} username={room.data.username} profilePic={room.data.profilePic}/>
            ))}
                
            </div>

        </div>
    )
}

export default Sidebar
