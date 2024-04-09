import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function UsercreationForm() {
    let {register,handleSubmit} = useForm()
    const [user, setUser] = useState({});
    let navi = useNavigate()

    function saveData(data){
            axios.post('http://127.0.0.1:8000/api/register/',data).then((response)=>{
                console.log(response.data)
                console.log(response.data.token, '----token----')

                console.log('------', response)

                console.log(response.data.token.access, '----accesstoken----')
                console.log('-----------')
                console.log(response.data.token.refresh, '----reftreshtoken----')
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
        <label htmlFor='t'><b>Name</b></label>
        <input id='t' type='text' className='form-control' {...register('name')}/>
        <br/><br/>
        <label htmlFor='b'><b>PASSWORD</b></label>
        <input id='b' type='password' className='form-control' {...register('password')}/>
        <br/><br/>
        <label htmlFor='C'><b>CONFIRM PASSWORD</b></label>
        <input id='C' type='password' className='form-control' {...register('password2')}/>
        <br/><br/>
        <label htmlFor='u'><b>TC</b></label>
        <input id='u' type='text' className='form-control' {...register('tc')}/>
       
        <br/><br/>
        <input type='submit' value='Login' className='btn btn-outline-success col-6'/>
        <input type='reset' value='RESET' className='btn btn-outline-warning col-6 float-end' />
    </form>
    <h3 id='h1'></h3>
</div>
  )
}

export default UsercreationForm