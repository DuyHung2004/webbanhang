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
const ListCategorys = ()=>{
    const [categorys,setcategorys]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/identity/api/v1/categories')
        .then((response)=>{
            setcategorys(response.data.result)
        }).catch((error)=>{
            console.log(error);
            
        })
    },[])
    const navigate = useNavigate();
    const forward = () => {
        navigate(ROUTERS.ADMIN.ADDCATEGORY);
    }
    const deleteCategory=(id)=>{
        axios.delete(`http://localhost:8080/identity/api/v1/categories/${id}`,{
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        })
       .then((response)=>{
         console.log(response)
            toast.success('Xoa danh muc thanh cong');
            setcategorys((prevCategorys)=> prevCategorys.filter((category) => category.id!== id));
 
       }).catch(error => {
         console.log(error)
            toast.error('Xoa danh muc khong thanh cong do co san pham co danh muc nay');
       })
    }
    return(
        <>
        <div className="container">
            <div className="table_category">
            <button type="button" className="button_add" onClick={()=>forward()}>Them</button>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            categorys.length> 0 ?(
                                categorys.map((category,key )=>(
                                    <tr key={key} className="category_row">
                                        <td>
                                            {category.id}
                                        </td>
                                        <td>
                                            {category.name}
                                        </td>
                                        <td>
                                            <button onClick={()=>deleteCategory(category.id)}>xoa</button>
                                        </td>
                                    </tr>

                                ))
                            ) :
                            (
                                <tr>
                                    <td>Chua co category nao</td>
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
export default memo(ListCategorys)