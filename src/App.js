//feature-1
import React, { useState } from 'react';
import { Cart } from './components/Cart';
import { Filter } from './components/Filter';
import { Products } from './components/Products';
import data from "./data.json";




// class App extends React.Component {
//   constructor(){
//     super();
//     this.state = { 
//       products: data.products,
//       size:"",
//       sort:"",
//     };
//   }
//   render() {
//     return (
//       <div className="grid-container">
//          <header className="App-header">
//            <a href="/">React Shopping Cart</a>
//          </header>
//          <main>
//            <div className='content'> 
//              <div className='main'>
//                <Products products= {this.state.products}></Products>
//              </div>
//              <div className='sidebar'>Cart Items</div>
//            </div>
//          </main>
//          <footer>
//            All right is reserved
//          </footer>
//        </div>
//      );
//   }
// }

const App = () => {

  const products = data.products;

  const [datos, setDatos] = useState(
    {
      products: products,
      cartItems: [],
      size: "",
      sort: "",
      load: true
    }
  );

  const removeFromCart = (product) => {
    const cartItems = datos.cartItems.slice();
    setDatos({
      ...datos,cartItems:cartItems.filter((x) => x._id !== product._id)
    });
    
  }

  const addToCart = (product) => {
    const cartItems = datos.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item =>{
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true
      }
      });
      if(!alreadyInCart){
        cartItems.push({...product, count:1})
      }
      setDatos({...datos,cartItems});
  }
  const sortProducts = (event) => {
    const sort = event.target.value;
    
      
    setDatos((datos) => ({
      ...datos,
      load:true,
      sort,
      products: datos.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "highest"
              ? a.price > b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
        ),
    }))
    
  }

  const  filterProducts = (event) => {

    const sort = datos.sort;
    
    if  (event.target.value === "") {
      setDatos({
        ...datos,
        size: event.target.value,
        products: products.slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "highest"
              ? a.price > b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
        )
      });
    } else {

      setDatos ({
        ...datos,
        size: event.target.value,
        products: products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0).slice()
          .sort((a, b) =>
            sort === "lowest"
              ? a.price < b.price
                ? 1
                : -1
              : sort === "highest"
                ? a.price > b.price
                  ? 1
                  : -1
                : a._id > b._id
                  ? 1
                  : -1
          )
      });
      
    }
  }
  

  return (
    <div className="grid-container">
      <header className="App-header">
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter count={products.length}
              //sort={datos.sort}
              //size={datos.size}
              sortProducts={sortProducts}
              filterProducts={filterProducts}
              products={datos.products} 
            ></Filter>
            <Products products={datos.products} load={datos.load} addToCart={addToCart}></Products>
          </div>
          <div className='sidebar'>
            <Cart cartItems={datos.cartItems} removeFromCart={removeFromCart} ></Cart>
          </div>
        </div>
      </main>
      <footer>
        All right is reserved
      </footer>
    </div>
  );
}

export default App;
