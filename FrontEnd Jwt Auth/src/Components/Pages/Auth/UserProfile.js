import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChangePassword from './ChangePassword'
import { useSelector } from 'react-redux'

function UserProfile() {
   
   // const {userToken} = useParams()

   // console.log(userToken, '----access----')


    const [user, setUser] = useState({});
    const [pass, setpass] = useState(false);
    

    let navi = useNavigate()

    const token = useSelector(store=>store.auth.authToken)
      //const access = token.access
      //console.log('store token', token)
     // console.log('access', token.access)
      //console.log('refresh', token.refresh)
     const access1 =  JSON.parse(window.localStorage.getItem('AccessToken'))
     console.log('access1 -----', access1)
     function getUserProfile(){
            axios.get('http://127.0.0.1:8000/api/profile/',
            {headers: {'Accept':'application/json', 'Authorization': `Bearer ${access1}`} 
                                                                          }    
            ).then((response)=>{
                console.log(response.data,'------userData----')
                setUser(response.data)
            }).catch((error)=>{
              console.log(error)
           })
          
        }
        useEffect(()=>{getUserProfile()}, []) 

        function changePass(){
         if (pass) {
            setpass(false)
         }else{
          setpass(true)
         }
        }

    return (
    <div className='container'>
       <div className='row'>
        { user ?  <div style={{paddingLeft:'870px'}}>
            <h5 style={{display:'inline'}} >USER: {user.name}</h5>
           </div>:null}
       </div>

       <div className='row'>
          <button className='btn btn-outline-warning btn-sm' onClick={changePass}>CHANGEPASSWORD</button>
          
       </div>

       <div className='row'>
       {pass ? <ChangePassword /> : null}
        </div>
        
   </div>
  )
}



export default UserProfile