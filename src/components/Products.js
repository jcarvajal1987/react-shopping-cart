import React from 'react'
import formatCurrency from '../util';
import { motion, AnimatePresence } from "framer-motion";

export const Products = (props) => {
    let delay_index = 0;
    let delay_jump = 100;
    const products = props.products;   
    console.log(props.load);

    const container = {
        hidden: {opacity:0},
        show:{
            opacity:1,
            transition: {
                delay: 0,
                staggerChildren: 0.09
                
              }
        },
        exit:{
            opacity:1,
            transition: {
                delay: 0,
                staggerChildren: 0.09
                
              }
        }
    };
    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
        exit: { opacity: 0 },
      }
    

    return (
        <div className='grilla'>
            <AnimatePresence>

            
            <motion.ul variants={container} 
            initial="hidden"
            animate="show"
            exit="exit"
            key={new Date()} className='grilla-relativa products'>
                {products.map(product => {
                    
                    const delay2 = delay_index++*0.1;
                    console.log(delay2);
                    
                    return (
                        <motion.li
                        variants={item}
                        
                        //transition={{ delay: delay2}}
                        key={product._id}>
                        <div className='product'>
                            <a href={"#" + product._id}>
                                <img  src={product.image} alt={product.title}></img>
                                <p>
                                    {product.title}
                                </p>
                            </a>
                            <div className='product-price'>
                                <div>
                                    {formatCurrency(product.price)}
                                </div>
                                <button onClick={() => props.addToCart(product)} className='button primary'>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </motion.li>
                    )
                    })}
            </motion.ul>
            
            
            </AnimatePresence>
            
        </div>
    )
}



//import React, { Component } from 'react'

//export default class Products extends Component {
//    render() {
//        return (
//            <div>
//                <ul className='Products'>
//                    {this.props.products.map(product => (
//                        <li key={product._id}>
//                            <div className='product'>
//                                <a href={"#" + product._id}>
//                                    <img src={product.image} alt={product.title}></img>
//                                    <p>
//                                        {product.title}
//                                    </p>
//                                </a>
//                                <div className='product-price'>
//                                    <div>
//                                        {product.price}
//                                    </div>
//                                    <button className='button primary'>
//                                        Add To Cart
//                                    </button>
//                                </div>
//                            </div>
//                        </li>
//                    ))}
//                </ul>
//            </div>
//        )
//    }
//}
