import React, { useState } from 'react'
import './App.css'
import Chat from './Chat'
import Login from './Login'
import Sidebar from './Sidebar'
import { useStateValue } from './StateProvider'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [{user},dipatch] = useStateValue()
  return (
    <div className="app">
      
      {!user?(
<Login/>
     
      ):(
   <div className="app__body">
     <BrowserRouter>
   
    <Switch>
        <Route exact path="/">
        <Sidebar/>
        </Route>
        <Route exact path="/rooms/:roomId">
        <Chat/>
        </Route>
     </Switch>
     
     </BrowserRouter>
    </div>
      )
      }
    
    </div>
  )
}

export default App
