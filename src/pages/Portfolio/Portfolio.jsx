import React, {useState, useEffect} from 'react'
import style from "./Portfolio.module.css"
import axios from 'axios';
import PortfolioCard from '../../components/Portflio-Card/PortfolioCard';
import { Chip } from '@mui/material';
import { ArrowDownIcon, ArrowUpIcon, CurrencyDollarSimpleIcon } from '@phosphor-icons/react';
import SlotCounter from "react-slot-counter"

const Portfolio = () => {
        const [positionsList, setPositionsList] = useState()
        const [tradingDetails, setTradingDetails] = useState()
        const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
              let timeout;
           
            const fetchData = () => {
        
              Promise.allSettled([
            axios.get(`${apiUrl}/api/v1/position/open-positions`, {
              withCredentials: true
            }) ,
            axios.get(`${apiUrl}/api/v1/users/trading-details`, {
              withCredentials: true
            }) 
            ])
            .then(([res1, res2]) => {
                if(res1?.value?.data?.success == true){
                  setPositionsList(res1.value?.data?.data)
                } else{
                  console.log("Could not fetch the positions list!")
                }
                if(res2?.value?.data?.success == true){
                    setTradingDetails(res2.value?.data?.data)
                } else {
                    console.log("Could not fetch trading details and Long_Market_Value!")
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
            label={`Total Positions: ${positionsList? positionsList.length : 0}`}
            />
            
        <Chip
        sx={{
            padding: "2vw 5vw 2vw 5vw",
            borderRadius: "500px",
            fontSize: "2rem",
            fontFamily: "monospace",
            color: "white",
            background: tradingDetails?.long_market_value >= tradingDetails?.last_long_market_value ? "linear-gradient(90deg,rgba(42, 123, 155, 0.25) 0%, rgba(87, 199, 133, 0.25) 50%, rgba(101, 237, 83, 0.25) 100%)" : " linear-gradient(90deg,rgba(217, 59, 93, 0.4) 0%, rgba(253, 29, 29, 0.4) 50%, rgba(255, 0, 157, 0.4) 100%)"
        }}
        label={
                    <>
                    Worth: 
                    <CurrencyDollarSimpleIcon size={32} fill='white'/>
                    <SlotCounter value={tradingDetails? Number(tradingDetails?.long_market_value).toLocaleString("en-IN", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                    }): "0000"} /> 
                    <>
                   &nbsp;
                    {tradingDetails?.long_market_value >= tradingDetails?.last_long_market_value ? <ArrowUpIcon size={30} className={style.floatIcon}/> : <ArrowDownIcon size={30}  className={style.floatIcon} />}
                   
                    </>
                    
                    </>
           }
       
       
        />
        </div>
         <div className={style.positionsList}>
      {/* <OrderCard order={positionsList[0]} /> */}
      {positionsList?.map((item) => (
        <PortfolioCard position={item} key={item.symbol} />
      ))}
     
    </div>
    </div>
  )
}

export default Portfolio
