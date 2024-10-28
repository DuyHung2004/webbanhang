import { memo,useState  } from "react";
import { AiOutlineEye, AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { generatePath, Link } from "react-router-dom";
import "./style.scss";
import { ROUTERS } from "utils/router";
const Quantity=({hasAddtoCart = true, value=1 ,onAddToCart  })=>{
  const [quantity, setQuantity] = useState(value);
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    return (
      
          <div className="quantity_container">
            <div className="quantity">
              <span onClick={decreaseQuantity}>--</span>
              <input type="number" onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}  value={quantity} defaultValue={1}/>
              <span onClick={increaseQuantity}>+</span>
            </div>
            {
              hasAddtoCart && (
                <button type="submit" onClick={() => onAddToCart(quantity)} className=" add_to_cart">
                  <AiOutlineShoppingCart /> Add to Cart
                </button>
              )
            }
          </div>
        
    )
}
export default memo(Quantity)