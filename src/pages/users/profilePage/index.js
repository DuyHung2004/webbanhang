import axios from "axios";
import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";
import { ROUTERS } from "utils/router";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "./style.scss";
import TokenChecker from "component/tokenCheck";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [fullname, setFullname] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [is_active, setIsActive] = useState();
    const [role, setRole] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("phonenumber", phonenumber);
        formData.append("address", address);
        formData.append("date_of_birth", date_of_birth);
        formData.append("role_id", role.id);
        formData.append("is_active", is_active);
        
        try {
            const response = await axios.put(`http://localhost:8080/identity/users/${user.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });
            console.log("user đã được edit:", response.data);
            navigate(ROUTERS.USER.HOME);
            toast.success("Chỉnh sửa thành công");
        } catch (error) {
            if (error.response) {
                console.error("Chi tiết lỗi: ", error.response.data);
                toast.error(error.response.data.message || "Chỉnh sửa không thành công");
            } else {
                toast.error("Chỉnh sửa không thành công");
            }
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/identity/users/myinfo`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            const userData = response.data.result;
            setUser(userData);
            setFullname(userData.fullname || '');
            setPhoneNumber(userData.phonenumber || '');
            setAddress(userData.address || '');
            setDateOfBirth(userData.date_of_birth || '');
            setRole(userData.role_id || '');
            setIsActive(userData.is_active);
        }).catch(error => {
            console.error("Lỗi khi lấy thông tin người dùng", error);
        });
    }, []);

    return (
        <>
        <TokenChecker />
        <div className="container">
            <div className="form_edit">
                <form onSubmit={handleSubmit} className="form_edit_user"> 
                    <div className='text_edit_user'>
                        <label>fullname:</label>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />
                    </div>

                    <div className='text_edit_user'>
                        <label>phonenumber:</label>
                        <input
                            type="text"
                            value={phonenumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            readOnly
                        />
                    </div>

                    <div className='text_edit_user'>
                        <label>date_of_birth:</label>
                        <input
                            type="date"
                            value={date_of_birth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>

                    <div className='text_edit_user'>
                        <label>Dia chi:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Lưu</button>
                </form> 
            </div>
        </div>
        </>
    );
}

export default memo(ProfilePage);
