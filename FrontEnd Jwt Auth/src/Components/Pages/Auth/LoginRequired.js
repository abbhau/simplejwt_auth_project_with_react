import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function LoginRequired(props) {
    const navi = useNavigate()
    const {Component} = props;

    function auth(){
        const token = JSON.parse(localStorage.getItem('token'))
        if(!token){
         navi('/login/')
        }
    }
    useEffect(()=>{auth()}, [])
    
  return (
    <div>
        <Component/>
    </div>
  )
}

export default LoginRequired;