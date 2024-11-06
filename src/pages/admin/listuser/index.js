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
const ListUser = ()=>{
    const [users,setUsers]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/identity/users')
        .then((response)=>{
            setUsers(response.data.result)
        }).catch((error)=>{
            console.log(error);
            
        })
    },[])
    const navigate = useNavigate();
    const EditUser=(id)=>{
        return ()=>{
            navigate(ROUTERS.ADMIN.EDITUSER.replace(':id',id))
        }
    }
    const BanUser= async (id)=>{
        axios.put(`http://localhost:8080/identity/users/update/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        .then((response)=>{
            console.log(response)
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, is_active: user.is_active === 1 ? 0 : 1 } : user
                )
            );
            toast.success('chinh sua thanh cong');
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <>
        <div className="container">
            <div className="table_user">
                <table>
                    <thead>
                    <tr>
                        <th>fullname</th>
                        <th>phonenumber</th>
                        <th>ngay sinh</th>
                        <th>role</th>
                        <th>is_active</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.length> 0 ?(
                                users.map((user,key )=>(
                                    <tr key={key} className="user_row">
                                        <td>
                                            {user.fullname}
                                        </td>
                                        <td>
                                            {user.phonenumber}
                                        </td>
                                        <td>
                                            {user.date_of_birth}
                                        </td>
                                        <td>
                                            {user.role_id.name}
                                        </td>
                                        <td style={{ color: user.is_active === 1 ? 'red' : 'black' }}>
                                            {user.is_active===1 ? "khóa" : "khong khóa"}
                                        </td>

                                        <td>
                                            <button onClick={EditUser(user.id)}>sua</button>
                                            <button onClick={()=>BanUser(user.id)}>{user.is_active ? "mo khoa": "khoa"}</button>
                                        </td>
                                    </tr>

                                ))
                            ) :
                            (
                                <tr>
                                    <td>Chua co user nao</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default memo(ListUser)