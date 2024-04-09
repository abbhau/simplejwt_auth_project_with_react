import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import axios from 'axios';

function ResetPassword() {
    let {register,handleSubmit} = useForm()

    const {uid, token } = useParams()

    let navi = useNavigate()

    function saveData(data){
            axios.post(`http://127.0.0.1:8000/api/reset-pass/${uid}/${token}/`,data).then((response)=>{
                alert(`${response.data.msg}...Plz Login into Acount`)
                navi('/login/')
            }).catch((error)=>{
              console.log(error)
          
        })
        
    }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit(saveData)}> 
        <label htmlFor='b'><b>PASSWORD</b></label>
        <input id='b' type='password' className='form-control' {...register('password')}/>
        <br/><br/>
        <label htmlFor='C'><b>CONFIRM PASSWORD</b></label>
        <input id='C' type='password' className='form-control' {...register('password2')}/>
        <br/><br/>
        <input type='submit' value='RESET PASSWORD' className='btn btn-outline-success col-6'/>
        <input type='reset' value='CLEAR' className='btn btn-outline-warning col-6 float-end' />
    </form>
    </div>
  )
}

export default ResetPassword