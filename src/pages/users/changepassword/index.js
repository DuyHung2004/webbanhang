import { memo, useState,useEffect } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import axios from 'axios'; 
import { toast } from "react-toastify";
const ChangePassword = () => {
    const [userid,setUserId]=useState();
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
          navigate(ROUTERS.USER.HOME);
        } else {
          const decoded = jwtDecode(token);
          setUserId(decoded.userid);
        }
      }, []);
    const [passcurrent,setPasscurrent] =useState("")
    const [passnew,setPassnew]=useState("")
    const [passwordnhaplai, setPasswordnhaplai] = useState("");

    const validatePasswords = () => {
        return passnew === passwordnhaplai;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePasswords()) {
            alert("Mật khẩu và mật khẩu nhập lại không trùng nhau!");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/identity/users/changepassword/${userid}`, {
                passcurrent,
                passnew,
              },
              {
                headers: {
                  'Content-Type': 'application/json', 
                  Authorization: `Bearer ${ Cookies.get('token')}`,
                },
              }
            )
            if(response.data.result==="mat khau hien tai khong dung"){
                alert(`${response.data.result}`)
            } else{
                toast.success(`${response.data.result}`);
                navigate(ROUTERS.USER.HOME) 
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="login_form">
                    <h2>Doi mat khau:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="pass">Mật khẩu hien tai</label>
                            <input required value={passcurrent}
                                   onChange={(e)=>setPasscurrent(e.target.value)} type="password" className="form-control" id="passcurrent" placeholder="Nhập mật khẩu hien tai"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Mật khẩu moi</label>
                            <input required value={passnew}
                                   onChange={(e)=>setPassnew(e.target.value)} type="password" className="form-control" id="passnew" placeholder="Nhập mật khẩu moi"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordnhaplai">Nhập lại Mật khẩu</label>
                            <input required value={passwordnhaplai}
                                   onChange={(e)=>setPasswordnhaplai(e.target.value)} type="password" className="form-control" id="passwordnhaplai" placeholder="Nhập lại mật khẩu"/>
                        </div>
                        <button type="submit" className="btn btn-primary button_form">Luu Thay Doi</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default memo(ChangePassword);
