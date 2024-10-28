import { memo, useState  } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
const Register = ()=>{
    const [formData, setFormData] = useState({
        phonenumber: "",
        fullname: "",
        date_of_birth: "",
        address: "",
        pass: "",
        
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { id, value } = e.target; 
        setFormData((prevData) => ({
            ...prevData,
            [id]: value, 
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:8080/identity/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), 
            });

            if (!response.ok) {
                const data = await response.json();
                alert(` ${JSON.stringify(data.message)}`);
                console.log(data.message);
               
            }
        
            const data = await response.json();
            
            alert("Dang Ky Thanh Cong");
            navigate(ROUTERS.USER.LOGIN);
        } catch (error) {
            alert("Dang Ky Khong Thanh Cong");
        }
    };
    return(
        <>
        <div className="container">
            <div className="row">
                <div className=" login_form">
                    <h2>Dang ky</h2>
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="phonenumber">Phonenumber</label>
                            <input required  value={formData.phonenumber}
                                    onChange={handleChange} type="text" className="form-control" id="phonenumber" placeholder="Enter phonenumber"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullname">Ho va ten</label>
                            <input required value={formData.fullname}
                                    onChange={handleChange} type="text" className="form-control" id="fullname" placeholder="Enter fullname"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_of_birth">Ngay sinh</label>
                            <input required  value={formData.date_of_birth}
                                    onChange={handleChange} type="date" className="form-control" id="date_of_birth" placeholder="Enter Ngay sinh"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dia chi</label>
                            <input required value={formData.address}
                                    onChange={handleChange} type="text" className="form-control" id="address" placeholder="Enter address"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Password</label>
                            <input required value={formData.pass}
                                    onChange={handleChange} type="password" className="form-control" id="pass" placeholder="Enter password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordnhaplai">Nhap lai Password</label>
                            <input required 
                                    onChange={handleChange} type="password" className="form-control" id="passwordnhaplai" placeholder="Enter password"/>
                        </div>
                        <button type="submit" className="btn btn-primary button_form">Dang Ky</button>
                        <div className="text_form">
                            <div className="login">
                                <p>Ban da co tai khoan?</p>
                                <a href={ROUTERS.USER.LOGIN} className="register ">Dang nhap ngay</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default memo(Register)