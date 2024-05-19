import React,{useState} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link,useNavigate} from 'react-router-dom';


export default function Login(){
    let navigate=useNavigate();
    const [credentials,setcredentials]=useState({email:"",password:""})

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/api/loginuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:credentials.email,
                password:credentials.password,
            })

        });
        const json=await response.json()
        console.log(json);

        if(!json.success){
            alert('enter valid credentials');
        }
        if(json.success){
        navigate('/');
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        }
        
    }

    const onChange= (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
        <div>
            <Navbar/>
            <div className='container '>
            <form onSubmit={handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="email" className='form-label'>Email address</label>
                    <input type="email" className="form-control col-md-4" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-primary" >Submit</button>
                <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
            </form>
        </div>
            <Footer/>
        </div>
    )
}