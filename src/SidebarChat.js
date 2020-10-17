import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import db from './firebase'
import './SidebarChat.css'
import { useStateValue } from './StateProvider'
function SidebarChat({id,name,username,profilePic}) {
    const [{user},dispatch] = useStateValue()
    const [messages,setMessages] = useState([])
    const {roomId} = useParams()

    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
                setMessages(snapshot.docs.map(doc=>doc.data()))
            })
        }
    },[])
    return (
        <Link to={`/rooms/${id}`}>
          <div className='sidebarChat'>
            <Avatar  src={profilePic} className="sidebarChat__avatar"/>
            <div className="sidebarChat__info">
                <h3>{name}</h3>
    <p>{messages[0]?.message}</p>
                <small>34:54</small>
            </div>
        </div>
        </Link>
      
)
}

export default SidebarChat
