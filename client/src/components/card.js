import React from 'react'
import "./about.css"
const card = () => {
    const amount=1000;
    const checkout=async(e)=>{
        try{
         console.log("i am i checkout")
        const {orders}= await fetch("/checkout",{
         
            method:"POST",
            headers:{
               "Content-Type": "application/json"},
             body:JSON.stringify({
                amount
             })
   
          });
          console.log(orders)
        const {key}= await fetch("/gateway",{
            method:"GET",
            headers:{
               "Content-Type": "application/json"},
           
   
          });
          var options = {
           key, // Enter the Key ID generated from the Dashboard
            "amount": orders.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Anirudh",
            "description": "Test Transaction",
            "image": "kjj", 
            "order_id": orders.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://localhost:3000/payment",
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        document.getElementById('rzp-button1').onclick = function(e){
            rzp1.open();
            e.preventDefault();
        }
       
       }catch(e){
        console.log(e);
       }}
  return (
   <>
    donate now enter your amount
    <button className="button" onClick={checkout}></button>
   </>
  )
}

export default card