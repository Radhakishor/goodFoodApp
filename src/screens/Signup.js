import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/api/CreateUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.geolocation
            })

        });
        const json=await response.json()
        console.log(json);

        if(!json.success){
            alert('enter valid credentials');
        }
    }

    const onChange= (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (

        <div>
            <Navbar/>
            <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input type="text" className="form-control"  placeholder="Enter name" name='name' value={credentials.name} onChange={onChange} />
                </div> <div className="form-group">
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="email" className='form-label'>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="address" className='form-label'>Address</label>
                    <input type="text" className="form-control"  placeholder="enter address" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-primary" >Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
        </div>
    )
}