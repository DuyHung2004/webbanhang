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
import { generatePath } from 'react-router-dom';
const ListOrder = ()=>{
    const [orders,setOrders]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/identity/api/v1/orders/getallorder')
        .then((response)=>{
            setOrders(response.data.result)
        }).catch((error)=>{
            console.log(error);
            
        })
    },[])
    const navigate = useNavigate();
    const editorder=(id)=>{
        navigate(`${generatePath(ROUTERS.ADMIN.EDITORDER, { id })}`);
    }
    return(
        <>
        <div className="container">
            <div className="table_order">
                <table>
                    <thead>
                    <tr>
                        <th>tracking_number</th>
                        <th>user id</th>
                        <th>fullname</th>
                        <th>phonenumber</th>
                        <th>dia chi</th>
                        <th>note</th>
                        <th>status</th>
                        <th>total_money</th>
                        <th>payment_method</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length> 0 ?(
                                orders.map((orders,key )=>(
                                    <tr key={key} className={`order_row status-${orders.status}`}>
                                        <td>
                                            {orders.tracking_number}
                                        </td>
                                        <td>
                                            {orders.user_id}
                                        </td>
                                        <td>
                                            {orders.fullname}
                                        </td>
                                        <td>
                                            {orders.phone_number}
                                        </td>
                                        <td>
                                            {orders.address}
                                        </td>
                                        <td>
                                            {orders.note}
                                        </td>
                                        <td>
                                            {orders.status}
                                        </td>
                                        <td>
                                            {orders.total_money}
                                        </td>
                                        <td>
                                            {orders.payment_method}
                                        </td>
                                        <td>
                                            <button onClick={()=>editorder(orders.id)}>sua</button>
                                        </td>
                                    </tr>

                                ))
                            ) :
                            (
                                <tr>
                                    <td>Chua co don hang nao</td>
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
export default memo(ListOrder)