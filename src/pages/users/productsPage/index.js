import { memo,useState, useEffect } from "react";
import "./style.scss";
import ProductsCard from '../../../component/productCard';
import { useParams } from "react-router-dom";
import axios from 'axios'; 
import TokenChecker from "component/tokenCheck";

const ProductsPage = ()=>{
    const sorts=[
        "Gia thap den cao",
        "Gia cao den thap",
        "Ban Chay Nhat"
    ]
        const { id } = useParams();  
        const [products, setProducts] = useState([]);
        const [currentPage, setCurrentPage] = useState(0);
        const [totalPages, setTotalPages] = useState(0);
        const itemsPerPage = 12;
      
        useEffect(() => {
          axios.get(`http://localhost:8080/identity/api/v1/products?categoryId=${id}&limit=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                console.log(response.data.listproduct)
                setTotalPages(response.data.totalPages);
                setProducts(response.data.listproduct )})
            .catch(error => console.error('Error fetching products:', error));
        }, [id, currentPage]);
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
    return (
    <>
    <TokenChecker />
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="sidebar">
                        <div className="sidebar_item">
                            <h2>
                                Tim kiem
                            </h2>
                            <input type="text" placeholder="Search..." />
                        </div>
                        <div className="sidebar_item">
                            <h2>Muc Gia</h2>
                            <div className="price_range_wrap">
                                <p>Tu: </p>
                                <input type="number" min="0"  />
                            </div>
                            <div className="price_range_wrap">
                                <p>Den </p>
                                <input type="number" min="0"  />
                            </div>
                        </div>
                        <div className="sidebar_item">
                            <h2>
                                Sap xep
                            </h2>
                            <div className="tags">
                            {
                                sorts.map((item,key)=>(
                                  <div className={`tag ${key === 0 ? "active" : ""}`} key={key}> 
                                    {item}
                                  </div>  
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                    {
    products.map(product => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={product.id}>
            <ProductsCard img={product.thumbnail} name={product.name} price={product.price} id={product.id} />
        </div>
    ))
}

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
                
            </div>
        </div>
    </>
    )
}

export default memo(ProductsPage);