import React, { useEffect, useState } from 'react'
import style from "./Trade.module.css"
import TradingViewTechAnalysis from '../../components/TradingViewWidgets/TradingViewTechAnalysis.jsx'
import { data, useLocation } from 'react-router-dom'
import TradingViewSymbolInfo from '../../components/TradingViewWidgets/TradingViewSymbolInfo.jsx';
import { Avatar, Chip, Grid, Stack, Snackbar, Alert, Slide, CircularProgress } from '@mui/material';
import TradingViewCompanyProfile from '../../components/TradingViewWidgets/TradingViewCompanyProfile.jsx';
import TradingViewChart from '../../components/TradingViewWidgets/TradingViewChart.jsx';
import { ArrowDownIcon, ArrowUpIcon, ChartPieSliceIcon, CurrencyDollarSimpleIcon, HashIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react';
import axios from 'axios';
import SlotCounter from "react-slot-counter"
import { Badge, Button } from 'react-bootstrap';

const Trade = () => {
    const [qty, setQty] = useState(1);
    const [holding, setHolding] = useState({qty: 0, market_value: 0});
    const [tradingDetails, setTradingDetails] = useState()
    const [tickerMarketData, setTickerMarketData] = useState()
    const [loading, setLoading] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState("info")
    const [alertMessage, setAlertMessage] = useState("")

    const apiUrl = import.meta.env.VITE_API_URL
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const fullSymbol = params.get("tvwidgetsymbol"); // NASDAQ:TSLA
    const ticker = fullSymbol?.split(":").pop();        // TSLA
    

    useEffect(() => {
         
        let timeout;

        const fetchData = () => {
            Promise.allSettled([
                axios.get(`${apiUrl}/api/v1/position/open-position/${ticker}`, {
                withCredentials: true 
                }),
                axios.get(`${apiUrl}/api/v1/users/trading-details`, {
                withCredentials: true
                }),
                 axios.get(`${apiUrl}/api/v1/market-data/latest-bar/${ticker}`, {
                withCredentials: true
                })
            ])
            .then(([res1, res2, res3]) => {
                // console.log(res1.value.data.success == true)
                //API 1
                if(res1?.value?.data?.success == true){
                     setHolding(res1.value?.data?.data)
                } else {
                     setHolding({qty: 0, market_value: 0})
                console.log(`0 Position in ${ticker}, Or some error occured. Make sure if you have any position in it! Please ignore the Red Errors in this console if you have 0 position in this symbol: ${ticker}`)
                }
                //API 2
                if (res2?.value?.data?.success == true){
                    setTradingDetails(res2.value?.data?.data)
                } else {
                    setTradingDetails(null)
                    console.log("Error Fetching in Trading Details!")
                }
                if (res3?.value?.data?.success == true){
                    setTickerMarketData(() => {
                        return Object.values(res3?.value?.data?.data?.bars)[0]
                    })
                } else {
                    setTickerMarketData(null)
                    console.log("Error Fetching in Latest Bar for this Ticker!")
                }
                
                
            })
            .finally(() => {
                timeout = setTimeout(fetchData,7000)
            })


            
        }
        fetchData();

        return () => clearTimeout(timeout)
       
    }, [])
    console.log(tickerMarketData)




    const increaseQty = () => {
    setQty((prev) => prev + 1);
    };

    // ➖ Decrease
    const decreaseQty = () => {
        if (qty > 1) setQty((prev) => prev - 1);
    };


    const handleTrade = async (side) => {
        setLoading(true)
        if(side == "sell" && qty > holding.qty){
            setAlertOpen(true);
            setAlertMessage(`Max sell allowed: ${holding.qty}`);
            setAlertType("error");
            setLoading(false)
            return;
        }
        if(side == "buy" && qty*tickerMarketData.c > tradingDetails.buying_power){
            setAlertOpen(true);
            setAlertMessage(`Max Buy allowed: ${Math.floor(Number(tradingDetails.buying_power)/Number(tickerMarketData.c))}, as you have buying power of only: $${tradingDetails.buying_power}`);
            setAlertType("error");
            setLoading(false)
            return;
        }
       
        

        await axios.post(`${apiUrl}/api/v1/position/create`,
            {
                symbol: `${ticker}`,
                qty: `${qty}`,
                side: side
            },
            { withCredentials: true }
        )
        .then((data) => {
            setAlertOpen(true)
            setAlertMessage(data.data?.message)
            setAlertType("success")
        })
        .catch((err) => {
            console.log("Catch triggered!")
            setAlertOpen(true)
            setAlertMessage(err.response?.data?.message)
            setAlertType("error")
        })
        setQty(1)
        setLoading(false)
    }
    
    
  return (
    <div className={style.Container}>
        <Snackbar 
                      open={alertOpen}
                      autoHideDuration={3500}
                      slots={{transition: Slide}}
                      onClose={() => setAlertOpen(false)}
                      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                      >
                        <Alert variant='filled' severity={alertType} onClose={() => setAlertOpen(false)}>
                          {alertMessage}
                        </Alert>
                    </Snackbar>
        <div className={style.symbolInfo}>
            <TradingViewSymbolInfo symbol={ticker} />
        </div>
        {/* <div className={style.subContainer}> */}
             <div className={style.companyInfo}>
            {/* <TradingViewCompanyProfile symbol={ticker} /> */}
            <TradingViewChart symbol={ticker} />
        </div>
        <div className={style.techInfo}>
                <TradingViewTechAnalysis symbol={ticker} />
        </div>
        <div className={style.placeOrder}>
            <Grid
            sx={{
                height: "100%"
            }}
            container spacing={2}>
                <Grid
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
                size={12}>
                    <ChartPieSliceIcon size={200} fill="white" weight='duotone' />
                    <Stack direction={'column'} spacing={2}>
                        <Chip
                    sx={{
                     fontSize: "2.2vw",
                     paddingTop: "40px",
                     paddingBottom: "40px",
                     borderRadius: "60px",
                     fontFamily: "monospace",
                    //  color: `${holding?.market_value > holding?.cost_basis ? "green" : "red"}`

                    }}
                    label={ <SlotCounter value={holding? Number(holding.market_value).toLocaleString("en-IN", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                    }): "0000"} /> }
                    icon={<CurrencyDollarSimpleIcon size={50} weight='light' fill={holding?.market_value > holding?.cost_basis ? "green" : "red"}/>}
                    
                    />
                    <Chip
                    sx={{
                     fontSize: "1.5vw",
                     paddingTop: "37px",
                     paddingBottom: "37px",
                     borderRadius: "60px",
                     fontFamily: "monospace"

                    }}
                    label={`${holding? holding.qty : "0"} Open Positions `}
                    icon={<HashIcon size={50} weight='duotone'/>}
                    
                    />

                    </Stack>
                                           
                </Grid>
                <Grid size={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}> 
                    <div className={style.stockOrder}>
                        <Button variant='danger' className={style.stockOrderCounterButton} onClick={decreaseQty}>
                            <MinusIcon size={30} weight='light' />
                        </Button>
                        <Chip
                        sx={{
                            fontSize: "3vw",
                            padding: "2.3vw",
                            paddingLeft: "0px",
                            paddingRight: "10px",
                            borderRadius: "200px"
                        }}
                        avatar={<Avatar sx={{padding: "25px"}}>{ticker}</Avatar>}
                        label={qty}
                        />
                        <Button variant='success' className={style.stockOrderCounterButton} onClick={increaseQty}>
                            <PlusIcon size={30} weight='light' />
                        </Button>
                    </div>
                    {loading? <div className={style.stockOrderButtonsLoading}>
                        <CircularProgress size={100} aria-label='loading...' />
                    </div> : <div className={style.stockOrderButtons}>
                        <Button onClick={() => handleTrade("buy")}  variant='success' className={style.orderButton}>
                        Buy
                    </Button>
                    <Button onClick={() => handleTrade("sell")} variant='danger' className={style.orderButton}>
                        Sell
                    </Button>
                    </div>}
                    
                    
                </Grid>
            </Grid>
        </div>
        {/* </div> */}
       
    
        
      
    </div>
  )
}

export default Trade
