
import products from "./products.json";
import Contador from "./Contador";

const Cart = function(){
    

  const addToCart = ()=>{

  }

  const removeFromCart = ()=>{

  }
  

  const deleteFromCart = ()=>{

  }

    
  return (
    <div>
    <h2>Carrito de Compras</h2>
    <h3>Productos</h3>
    <ul>
    { products.map((product)=>(
        <li key= {product.id}>{product.name} {product.price}
        <button> Delete</button>
        <button> + </button>
        <button> - </button>
        
        </li>
        
    ))} 
    <Contador/>
       
    </ul>
    </div>
    
    
  )
}

export default Cart;