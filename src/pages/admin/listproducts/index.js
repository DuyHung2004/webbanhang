import { memo,useState,useEffect } from "react";
import "./style.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link,generatePath  } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { formatter } from "utils/fomater";
const ListProducts = ()=>{
        const [id, useId]= useState(0)
        const [products, setProducts] = useState([]);
        const [currentPage, setCurrentPage] = useState(0);
        const [totalPages, setTotalPages] = useState(0);
        const itemsPerPage = 12;
        const navigate = useNavigate();
        const forward=()=>{
          navigate(ROUTERS.ADMIN.ADDPRODUCT);
        }
        useEffect(() => {
          axios.get(`http://localhost:8080/identity/api/v1/products?categoryId=${id}&limit=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                console.log(response.data.listproduct)
                setTotalPages(response.data.totalPages);
                setProducts(response.data.listproduct )})
            .catch(error => console.error('Error fetching products:', error));
        }, [id, currentPage]);
        function LimitedText(props) {
          const text = props?.text || ""; 
          const limitedText = text.length > 10 ? text.slice(0, 10) + "..." : text;
          return <p>{limitedText}</p>;
        }
        
        
        
          const handlePageChange = (page) => {
            setCurrentPage(page);
          };
          const getPageNumbers = () => {
            const pages = [];
            if(currentPage===1){
                pages.push(0);
            }
            else if (currentPage >= 2) {
              pages.push(currentPage - 2);
              pages.push(currentPage - 1);
            }
            pages.push(currentPage);
            if (currentPage===totalPages-2) {
                pages.push(currentPage + 1); 
            }
            else if(currentPage===totalPages-1) {
            }
            else if (currentPage < totalPages-2) {
              pages.push(currentPage + 1);
              pages.push(currentPage + 2);
            }         
            return pages;
          };
          const editProduct=(id)=>{
            navigate(`${generatePath(ROUTERS.ADMIN.EDITPRODUCT, { id })}`);
          }
          const deleteProduct=(id)=>{
            axios.delete(`http://localhost:8080/identity/api/v1/products/product/${id}`,{
              headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
              },
        
          })
             .then((response) => {
              console.log(response)
                setProducts((products)=> products.filter((product) => product.id!== id));
                toast.success('Xoa san pham thanh cong'); 
              })
             .catch((error) => {
                console.log(error);
              });
          }
          
    return(
        <>
        <div className="container">
            <div className="table_product">
          <button type="button" className="button_add" onClick={()=>forward()}>Them</button>
                <table>
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>category</th>
                        <th>description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            products.length> 0 ?(
                                products.map((product,key )=>(
                                    <tr key={key} className="product_row">
                                        <td>
                                            <img src={`http://localhost:8080/identity/api/v1/products/images/${product.thumbnail}`}  />
                                            {product.name}
                                        </td>
                                        <td>
                                            {formatter(product.price)}
                                        </td>
                                        <td>
                                            {product.categoryId.name}
                                        </td>
                                        <td>
                                            {LimitedText(product.description)}
                                        </td>
                                        <td>
                                            <button onClick={()=>editProduct(product.id)}>sua</button>
                                            <button onClick={()=>deleteProduct(product.id)}>xoa</button>
                                        </td>
                                    </tr>

                                ))
                            ) :
                            (
                                <tr>
                                    <td>Chua co product nao</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination">
              <button 
                className="page_previous" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                className={`page_button ${currentPage === page ? "active" : ""}`}
                
                  key={index}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button 
                className="page_next" 
                onClick={() => handlePageChange(currentPage+1)}
                disabled={currentPage === totalPages-1}
              >
                Next
              </button>
            </div>
        </div>
        </>
    )
}
export default memo(ListProducts)