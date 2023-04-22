import React from 'react'
import pic from "../assets/chocolate.png";
import { useState } from 'react';

const Home = () => {

  const itemName = "Ferrero Rocher"
  const itemPrice = 800
  const [quantity, setQuantity] = useState(1);
  const[finalAmount, setFinalAmount] = useState(itemPrice);

  const increment = () => {
    setQuantity(quantity+1);
    setFinalAmount(finalAmount+itemPrice);
  }

  const decrement = () => {
    if(quantity <=1){
      setQuantity(1);
      setFinalAmount(itemPrice);
    }
    if(quantity > 1){
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  }
    const checkout = () => {
      fetch("http://localhost:5000/create-checkout-session", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        mode:"cors",
        body: JSON.stringify({
          items: [
            {id:1, quantity: quantity, price: itemPrice, name: itemName}
          ]
        })
      })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({url})=>{
        window.location = url
      })
      .catch(e => {
        console.log(e.error)
      })
    }
  
  return (
    <div className='w-full mx-auto'>
      <div className='text-center font-raleway w-full max-w-5xl mx-auto my-6'>
        <div className='font-extrabold text-transparent text-6xl my-10 bg-clip-text
        bg-gradient-to-r from-yellow-400 to-yellow-800'>
            Chocolate Corner
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center
        mx-auto w-full my-16 border-2 bg-[#fcf6f6] border-slate-100 shadow-md py-4'>
            <div className='flex lg:justify-end justify-center items-center mx-auto
            my-24 w-full lg:w-6/12'>
                <img src={pic} alt=""/>
            </div>
           <div className='flex flex-col lg:w-6/12 w-full py-8'>
             <div className='text-4xl font-bold text-yellow-700'>
             {itemName}
             </div>
             <div className='text-3xl font-semibold my-6 text-slate-600'>
                price:&nbsp;&nbsp;₹{itemPrice}
             </div>

             <small className='mt-10 mb-3 font-semibold'>Add Quantity</small>
             <div className='flex text-slate-900 justify-center items-center mb-10'>
                <span onClick={decrement} className='select-none w-auto px-4
                py-2 text-5xl bg-red-100 cursor-pointer'>-</span>
                <span className='w-auto px-4 py-2 text-3xl font-semibold'>{quantity}</span>
                <span onClick={increment} className='select-none w-auto px-4 py-2 text-5xl bg-green-100 
                cursor-pointer'>+</span>
             </div>


             <div className='my-6 text-xl'>Amount to be paid:
             <span className='text-green-500 text-3xl font-bold pl-3'>₹{finalAmount}</span></div>
             <div className='my-6'>
              <button onClick={checkout} className='bg-green-400 text-white px-8 py-4 rounded-md text-2xl 
              font-semibold'>
                Checkout
              </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Home
