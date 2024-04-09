import React from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from './Api';

function ChangePassword() {
    let {register,handleSubmit} = useForm()
    const navi = useNavigate()

    function saveData(data){
        api.post('http://127.0.0.1:8000/api/changepassword/',data,
        ).then((response)=>{
            alert(`${response.data.msg}.Plz Login again ......`)
            navi('/logout/')
        }).catch((error)=>{
          console.log(error)
       })}

  return (
    <div className='container'>
    <form onSubmit={handleSubmit(saveData)}> 
    <label htmlFor='b'><b>PASSWORD</b></label>
        <input id='b' type='password' className='form-control' {...register('password')}/>
        <br/><br/>
        <label htmlFor='C'><b>CONFIRM PASSWORD</b></label>
        <input id='C' type='password' className='form-control' {...register('password2')}/>
        <br/><br/>
        <input type='submit' value='CHANGE PASSWORD' className='btn btn-outline-success col-6'/>
        <input type='reset' value='RESET' className='btn btn-outline-warning col-6 float-end' />
    </form>
</div>
  )
}

export default ChangePassword;