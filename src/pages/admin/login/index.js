import { memo,useState,useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import "./style.scss";
const LoginAdmin=()=>{
    const [phoneNumber,setPhoneNumber]= useState("")
    const [password, setPassword]= useState("")
    const navigate = useNavigate();
    const handleSubmit=async(event)=>{
        event.preventDefault()
        try{
        await axios.post(`http://localhost:8080/identity/auth/login_admin`,{
            phonenumber: phoneNumber,
            pass: password,
        },{
            withCredentials: true,
        })
        navigate(ROUTERS.ADMIN.HOME)
    }catch(error){
            toast.error("Login failed")
        }
    }
    return (
        <div className="container">
        <div className="form_login_admin">
            <h1>Login Admin</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="phone_mumber" onChange={(e)=>setPhoneNumber(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    )
}
export default memo(LoginAdmin)