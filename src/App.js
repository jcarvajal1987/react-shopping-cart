//feature-1
import React, { useState } from 'react';
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

function App() {

  const products = data.products;

  const [datos, setDatos] = useState(
    {
      products: products,
      size: "",
      sort: ""
    }
  )
  const sortProducts = (event) => {
    const sort = event.target.value;
    setDatos((datos) => ({
      ...datos,
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
        sort: datos.sort,
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
            <Products products={datos.products}></Products>
          </div>
          <div className='sidebar'>Cart Items</div>
        </div>
      </main>
      <footer>
        All right is reserved
      </footer>
    </div>
  );
}

export default App;
