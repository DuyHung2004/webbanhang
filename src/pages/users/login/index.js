import { memo,useState,useEffect } from "react";
import "./style.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = ()=>{
    const [phonenumber, setPhonenumber] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate(ROUTERS.USER.HOME);
        }
    }, [navigate]);
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/identity/auth/login', {
          phonenumber,
          pass,
        },{
            withCredentials: true,
       }
    );
        console.log(response);
        if(response.data.code===1000){
        navigate(ROUTERS.USER.HOME); 
        toast.success('Đăng nhập thành công!');       
    }
      } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data.message || 'Có lỗi xảy ra! Vui lòng thử lại.');
            console.log(error.response.data.code);
        } else {
            toast.error('Có lỗi xảy ra! Vui lòng thử lại.');
        }
      }
    };
    return(
        <>
        <div className="container">
            <div className="row">
                <div className=" login_form">
                    <h2>Dang nhap voi</h2>
                    <div className="login_icons">
                        <div className="login_icon">
                        <Link to="" >
                            <FcGoogle />
                            <span>Google</span>
                        </Link>
                        </div>
                        <div className="login_icon">
                            <Link to="" >
                            <FaFacebook />
                            <span>Facebook</span>
                            </Link>
                        </div>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="phonenumber" value={phonenumber} >Phonenumber</label>
                            <input type="text" className="form-control" onChange={(e) => setPhonenumber(e.target.value)} id="phonenumber" placeholder="Enter phonenumber"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass" value={pass} >Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)} className="form-control" id="pass" placeholder="Enter password"/>
                        </div>
                        <button type="submit" className="btn btn-primary button_form">Submit</button>
                        <div className="text_form">
                            <div>
                                <a href="#" className="forgot_password">Forgot Password?</a>
                            </div>
                            <div className="register">
                                <p>Ban chua co tai khoan?</p>
                                <a href={ROUTERS.USER.REGISTER} className="register ">Dang ky ngay</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default memo(Login)