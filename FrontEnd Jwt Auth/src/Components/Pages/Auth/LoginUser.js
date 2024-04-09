import {useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginUser() {
  
  let {register,handleSubmit} = useForm()
    
  let navi = useNavigate()

  function saveData(data){
      axios.post('http://127.0.0.1:8000/api/login/',data).then((response)=>{
      window.localStorage.setItem('token',JSON.stringify(response.data.token.access))
      window.localStorage.setItem('refreshToken',JSON.stringify(response.data.token.refresh))
      window.localStorage.setItem('isLoggedIn',JSON.stringify(true))
      navi('/profile/') 
      }).catch((error)=>{
        console.log(error)
      })
      }

return (
    <div className='container'>
    <form onSubmit={handleSubmit(saveData)}> 
        <label htmlFor='a'><b>EMAIL ADRESS</b></label>
        <input id='a' type='email' className='form-control' {...register('email')}/>
        <br/><br/>
        <label htmlFor='b'><b>PASSWORD</b></label>
        <input id='b' type='password' className='form-control' {...register('password')}/>
        <br/><br/>
        <input type='submit' value='Login' className='btn btn-outline-success col-6'/>
        <NavLink to='/User/forget/'><button type='button' className='btn btn-outline-warning col-6 float-end'>FORGET PASSWORD</button></NavLink>
    </form>
</div>
  )
}
export default LoginUser;