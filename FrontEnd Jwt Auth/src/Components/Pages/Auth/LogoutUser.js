import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginUser from './LoginUser';

function LogoutUser() {
    window.localStorage.setItem('token',JSON.stringify(null))
    window.localStorage.setItem('refreshToken',JSON.stringify(null))
    window.localStorage.setItem('isLoggedIn',JSON.stringify(false))
    window.location.href = 'http://localhost:3000/login/'

  return (
      <div>
        
      </div>
  )
}

export default LogoutUser;