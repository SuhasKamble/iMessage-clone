import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { Link, useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import firebase from 'firebase'
function Chat() {
const [input,setInput] = useState('')
    const {roomId} = useParams()
    const [roomName,setRoomName] = useState('')
    const [messages,setMessages] = useState([])
    const [{user},dispatch] = useStateValue()

    useEffect(()=>{
        if(roomId){
           db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
               setRoomName(snapshot.data().name)
           })
           db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
               setMessages(snapshot.docs.map(doc=>doc.data()))
           })

        }
    },[roomId])

const sendMessage=(e)=>{
    e.preventDefault()
    if(roomId){

        db.collection('rooms').doc(roomId).collection('messages').add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            
        })
    }
    setInput("")
}
    return (
        <div className='chat'>
           <div className="chat__header">
               <div className="chat__info">
                   <Link to="/">
                   <ArrowBackIcon className="chat__back"/>
                   </Link>
    <p>To: <strong>{roomName}</strong></p>
               </div>
               <h4>Details</h4>
           </div>
           <div className="chat__body">
               {messages.map(message=>(
                   
               <p className={`chat__message ${message.name===user.displayName &&"chat__reciever"}`}>
                   <span className="chat__name">{message.name}</span>
                {message.message}
                   <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toDateString()}</span>  
               </p>
               
               ))}
             
           </div>
          <div className="chat__footer">
              <div className="chat__inputContainer">
                  <form >
                  <input value={input}  onChange={e=>setInput(e.target.value)} type="text" placeholder="iMessage"/>
                   
                  <Button onClick={sendMessage} disabled={!input} type="submit" variant="contained" className="chat__button">
                    <SendIcon className="chat__send"/>
                  </Button>
                  </form>
                  {/* <IconButton>

                  <MicIcon className="chat__mic"/>
                  </IconButton> */}
              </div>
          </div>
        </div>
    )
}

export default Chat
