import React from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    let {register,handleSubmit} = useForm()

    const navi = useNavigate()

    function saveData(data){
        axios.post('http://127.0.0.1:8000/api/email/reset/',data).then((response)=>{
            console.log(response.data)
            alert(response.data.msg)
            navi('/login/')
        }).catch((error)=>{
          console.log(error)
      
    })}
  return (
    <div className='container'>
    <form onSubmit={handleSubmit(saveData)}> 
        <label htmlFor='a'><b>EMAIL ADRESS</b></label>
        <input id='a' type='email' className='form-control' {...register('email')}/>
        <br/><br/>
       
        <input type='submit' value='SUBMIT' className='btn btn-outline-success col-6'/>
        <input type='reset' value='CLEAR' className='btn btn-outline-warning col-6 float-end' />
    </form>
    <h3 id='h1'></h3>
</div>
  )
}

export default ForgotPassword