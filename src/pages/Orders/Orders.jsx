import React, { useEffect, useState } from 'react'
import OrderCard from '../../components/Order-Card/OrderCard';
import axios from 'axios';
import style from "./Orders.module.css"
import { Chip } from '@mui/material';

const Orders = () => {
    const [ordersList, setOrdersList] = useState()

     const apiUrl = import.meta.env.VITE_API_URL

        useEffect(() => {
          let timeout;
       
        const fetchData = () => {
    
          Promise.allSettled([
        axios.get(`${apiUrl}/api/v1/position/all-orders`, {
          withCredentials: true
        }) 
        ])
        .then(([res1]) => {
            if(res1?.value?.data?.success == true){
              setOrdersList(res1.value?.data?.data)
              //  console.log(ordersList)
            } else{
              console.log("Could not fetch the orders list!")
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            timeout = setTimeout(fetchData, 10000)
          })
    
    
        }
    
        
       
        fetchData();
        // console.log(tradingDetails)
         return () => {
          clearTimeout(timeout)
        };
      }, []);
    // console.log(ordersList)
  return (
    <div className={style.container}>
      <div className={style.headingDiv}>
        <Chip 
         sx={{
                        padding: "2vw 5vw 2vw 5vw",
                    borderRadius: "500px",
                    fontSize: "2rem",
                    fontFamily: "monospace",
                    color: "white"
                    }}
          label={ordersList? `${ordersList.length} Recent Orders` : "0 Recent Orders!"}
        />
      </div>
         <div className={style.ordersList}>
      {/* <OrderCard order={ordersList[0]} /> */}
      {ordersList?.map((item) => (
        <OrderCard order={item} key={item.client_order_id} />
      ))}
    </div>
    </div>
   
  )
}

export default Orders
