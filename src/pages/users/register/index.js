import { memo, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTERS } from "utils/router";

const Register = () => {
    const [formData, setFormData] = useState({
        phonenumber: "",
        fullname: "",
        date_of_birth: "",
        address: "",
        pass: "",
    });
    const [passwordnhaplai, setPasswordnhaplai] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "passwordnhaplai") {
            setPasswordnhaplai(value);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    const validatePasswords = () => {
        return formData.pass === passwordnhaplai;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePasswords()) {
            alert("Mật khẩu và mật khẩu nhập lại không trùng nhau!");
            return;
        }

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
            alert("Đăng Ký Thành Công");
            navigate(ROUTERS.USER.LOGIN);
        } catch (error) {
            alert("Đăng Ký Không Thành Công");
        }
    };

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="login_form">
                    <h2>Đăng ký</h2>
                    <div className="login_icons">
                        <div className="login_icon">
                        <Link to="">
                            <FcGoogle />
                            <span>Google</span>
                        </Link>
                        </div>
                        <div className="login_icon">
                            <Link to="">
                            <FaFacebook />
                            <span>Facebook</span>
                            </Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="phonenumber">Số điện thoại</label>
                            <input required value={formData.phonenumber}
                                   onChange={handleChange} type="text" className="form-control" id="phonenumber" placeholder="Nhập số điện thoại"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullname">Họ và tên</label>
                            <input required value={formData.fullname}
                                   onChange={handleChange} type="text" className="form-control" id="fullname" placeholder="Nhập họ và tên"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_of_birth">Ngày sinh</label>
                            <input required value={formData.date_of_birth}
                                   onChange={handleChange} type="date" className="form-control" id="date_of_birth" placeholder="Nhập ngày sinh"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input required value={formData.address}
                                   onChange={handleChange} type="text" className="form-control" id="address" placeholder="Nhập địa chỉ"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Mật khẩu</label>
                            <input required value={formData.pass}
                                   onChange={handleChange} type="password" className="form-control" id="pass" placeholder="Nhập mật khẩu"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordnhaplai">Nhập lại Mật khẩu</label>
                            <input required value={passwordnhaplai}
                                   onChange={handleChange} type="password" className="form-control" id="passwordnhaplai" placeholder="Nhập lại mật khẩu"/>
                        </div>
                        <button type="submit" className="btn btn-primary button_form">Đăng Ký</button>
                        <div className="text_form">
                            <div className="login">
                                <p>Bạn đã có tài khoản?</p>
                                <a href={ROUTERS.USER.LOGIN} className="register">Đăng nhập ngay</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default memo(Register);
