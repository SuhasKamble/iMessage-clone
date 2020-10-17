import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth,provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
function Login() {
    const [state,dispatch] = useStateValue()

    const signIn = ()=>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch(
            {type:actionTypes.SET_USER,
            user:result.user,})
        })
        .catch((error)=>alert(error.message))
    }

    return (
        <div className="login">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/IMessage_logo_%28Apple_Inc.%29.png/180px-IMessage_logo_%28Apple_Inc.%29.png" alt=""/>
            <Button onClick={signIn} variant="contained">
                Sign in with google
            </Button>
            <h3>By <br></br> Suhas Kamble</h3>
        </div>
    )
}

export default Login
