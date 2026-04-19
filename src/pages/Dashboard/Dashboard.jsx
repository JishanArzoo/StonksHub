import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Spinner, Badge, Placeholder } from 'react-bootstrap'
import TradingViewNews from '../../components/TradingViewWidgets/TradingViewNews';
import style from "./Dashboard.module.css";
import TradingViewTechAnalysis from '../../components/TradingViewWidgets/TradingViewTechAnalysis';
import NavBar_pr from '../../components/NavBar/NavBar';
import TradingViewHeatmap from '../../components/TradingViewWidgets/TradingViewHeatmap';
import 'react-clock/dist/Clock.css';
import Clock from 'react-clock/src/Clock.js';
import { ArrowRightIcon, BankIcon, BriefcaseIcon, CakeIcon, CalendarDotsIcon,  ChartPieSliceIcon,  CurrencyDollarSimpleIcon, DotsNineIcon, EnvelopeIcon, HashIcon, InfoIcon, MoneyIcon,  UserIcon, WalletIcon } from '@phosphor-icons/react';
import { Alert, Divider, Slide, Snackbar, CircularProgress, Chip, Drawer, Menu, MenuItem, Stack, Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard =  () => {
    const [user, setUser] = useState();
    const [tradingDetails, setTradingDetails] = useState();
    const [time, setTime] = useState("");
    const [depositMessageOpen, setDepositMessageOpen] = useState(false)
    const [depositMessage, setDepositMessage] = useState("")
    const [depositMessageType, setDepositMessageType] = useState("success")
    const [loadingSpinnerWallet, setLoadingSpinnerWallet] =useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [lastLngMrktVShow, setLastLngMrktVShow] = useState(false)
    const [allOrdersCount, setAllOrdersCount] = useState()
    const [allpositionCount, setAllPositionCount] = useState()
    const apiUrl = import.meta.env.VITE_API_URL
     const redirect = import.meta.env.VITE_TV_REDIRECT;
    const navigate = useNavigate();
    
    useEffect(() => {
      let timeout;
       const interval = setInterval(() => setTime(new Date().toLocaleString("en-US", {
  timeZone: "America/New_York",
})), 1000);
   
    const fetchData = () => {

      Promise.allSettled([
    axios.get(`${apiUrl}/api/v1/users/get-user`, {
      withCredentials: true
    }),
    axios.get(`${apiUrl}/api/v1/users/trading-details`, {
      withCredentials: true
    }),
    axios.get(`${apiUrl}/api/v1/position/all-orders`, {
      withCredentials: true
    }),
    axios.get(`${apiUrl}/api/v1/position/open-positions`, {
      withCredentials: true
    })

      ])
      .then(([res1, res2, res3, res4]) => {
        if(res1?.value?.data?.success == true){
          setUser(res1.value?.data?.data)
        } else{
          console.log("Could not fetch the user!")
        }
        if(res2?.value?.data?.success == true){
          setTradingDetails(res2.value?.data?.data)
        } else{
          console.log("Could not fetch the trading details & Wallet Info!")
        }
         if(res3?.value?.data?.success == true){
          setAllOrdersCount(res3.value?.data?.data.length.toString())
        } else{
          console.log("Could not fetch the orders list!")
        }
        if(res4?.value?.data?.success == true){
          setAllPositionCount(res4.value?.data?.data.length.toString())
        } else{
          console.log("Could not fetch the holdings!")
        }
        
        
        
        
      })
      .finally(() => {
        timeout = setTimeout(fetchData, 10000)
      })


    }

    
   
    fetchData();
    // console.log(tradingDetails)
     return () => {
      clearTimeout(timeout)
      clearInterval(interval);
    };
  }, []);

  const walletDeposit = async (amount) => {
    setLoadingSpinnerWallet(true)
        const deposit = await axios.post(`${apiUrl}/api/v1/wallet/deposit`, {
      amount: amount
    }, {withCredentials: true})
    .then((res) => {
      setDepositMessageType("success");
      setDepositMessage(res.data.message);
      setDepositMessageOpen(true);
      setLoadingSpinnerWallet(false)
    }).catch((err) => {
        setDepositMessageType("error");
      setDepositMessage(err.response.data.message);
      setDepositMessageOpen(true);
      setLoadingSpinnerWallet(false)
    })
  }
  const toggleDrawer = (newOpen) => {
    setDrawerOpen(newOpen)
  }
        
    
  return (<div className={style.Container}>
          <Snackbar 
              open={depositMessageOpen}
              autoHideDuration={3500}
              slots={{transition: Slide}}
              onClose={() => setDepositMessageOpen(false)}
              anchorOrigin={{vertical: "bottom", horizontal: "center"}}
              >
                <Alert variant='filled' severity={depositMessageType} onClose={() => setDepositMessageOpen(false)}>
                  {depositMessage}
                </Alert>
            </Snackbar>
            {/* <Drawer sx={{
              width: "500px"
            }} open={drawerOpen} onClose={() => toggleDrawer(false)}>
              this is drawer
            </Drawer> */}
          <div className={style.personalInfo}>
            <div className={style.pInfoItem}>
              <UserIcon size={32}/>
              &nbsp;
              Name: {user?.identity?.given_name} {user?.identity?.family_name}
            </div>
            <div className={style.pInfoItem}>
              <CakeIcon size={32} />
              &nbsp;
              Date Of Birth: {user?.identity?.date_of_birth}
            </div>
             <div className={style.pInfoItem}>
              <EnvelopeIcon size={32} />
              &nbsp;
              Email: {user?.contact?.email_address}
            </div>
            <div className={style.pInfoItem}>
              <DotsNineIcon size={32} />
              &nbsp;
              Account No: {user?.account_number}
            </div>
            <div className={style.pInfoItem}>
              <CalendarDotsIcon size={32} />
              &nbsp;
              Created at: {new Date(user?.created_at).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
            </div>
            <div className={style.pInfoItem}>
              <BriefcaseIcon size={32} />
              &nbsp;
              Portfolio Value:&nbsp;&nbsp; <Badge  
              onMouseEnter={() => setLastLngMrktVShow(true)}
              onMouseOut={() => setLastLngMrktVShow(false)}
              pill 
              bg={tradingDetails?.long_market_value >= tradingDetails?.last_long_market_value ? "success" : "danger"}> ${tradingDetails?.long_market_value}</Badge>
              
            </div>
          </div>
          
          <div className={style.wallet}> 
            {/* <Clock value={time} /> */}
            
            <div className={style.walletItem1}>
                          <WalletIcon  size={70} style={{color: "whitesmoke"}}/>
                <Chip
                sx={{
                  color: 'whitesmoke',
                  fontSize: "2.2vw",
                  padding: "1.3vw",
                }}
                className={style.walletChip} 
                label={tradingDetails? <> {Number(tradingDetails.buying_power).toLocaleString()}&nbsp;
                <InfoIcon className={style.walletInfoIcon} size={22} />
                </> : <CircularProgress size={22} color='light' /> }
                icon={<CurrencyDollarSimpleIcon fill='white' size={30} />}  />
                
                    {/* ${tradingDetails? tradingDetails.cash : <CircularProgress size={22} color='light' />}
                </Chip> */}
               
            </div>
            {/* <hr style={{height: "1px", margin: "0px"}}/> */}
            <Divider style={{color: "whitesmoke"}} textAlign='left'>Add Money to wallet</Divider>
            
           <div className={style.walletItem2}>
            {loadingSpinnerWallet? <CircularProgress size={28} color='light' /> : <>
              <Badge pill bg='' className={style.walletAddBadge} onClick={() => walletDeposit("1000")}>
               <MoneyIcon size={27} /> &nbsp;+$1k
              </Badge>
              <Badge pill bg='' className={style.walletAddBadge} onClick={() => walletDeposit("5000")}>
               <MoneyIcon size={27} />  &nbsp;+$5k
              </Badge>
              <Badge pill bg='' className={style.walletAddBadge} onClick={() => walletDeposit("10000")}>
               <MoneyIcon size={27} />  &nbsp;+$10k
              </Badge>
            </>}
            
              
           </div>
          </div>
          
          <div className={style.heatMap} >
            <TradingViewHeatmap  />
          </div>
          <div className={style.tickerTape}>
            {/* <tv-ticker-tape symbols="NASDAQ:AAPL,NASDAQ:MSFT,NASDAQ:AMZN,NASDAQ:GOOGL,NASDAQ:TSLA,NASDAQ:NVDA,NASDAQ:META,NYSE:BRK.B,NYSE:JPM,NYSE:KO" direction="vertical" item-size="compact" symbol-url={redirect}></tv-ticker-tape> */}
               <TradingViewNews />
          </div>
          <div className={style.orders}>
            <Grid container spacing={2}>
              <Grid size={5}>
                <BankIcon size={65} weight="duotone" fill='white'/>
              </Grid>
              <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              size={7}>
                  <Badge pill bg='' className={style.ordersBadge} onClick={() => navigate("/orders")}>
                      View Orders <ArrowRightIcon size={20} />
                  </Badge>
              </Grid>
              {/* <Grid size={12}>
                <Divider textAlign='center' >
                      All Orders
                </Divider>
              </Grid> */}
              <Grid size={12}>
                  <Chip 
                sx={{
                  color: 'whitesmoke',
                  fontSize: "1.2vw",
                  padding: "0.8vw",
                }}
                color=''
                avatar={<Avatar>{allOrdersCount? <> {allOrdersCount}</> : <CircularProgress size={22} color='light' />}</Avatar>}
                className={style.walletChip} 
                // label={allOrdersCount? <> {Number(allOrdersCount).toLocaleString()}&nbsp;Orders</> : <CircularProgress size={22} color='light' /> }
                label="Total Orders"
                 />
              </Grid>
                
                
            </Grid>
            
           
          </div>
          <div className={style.positions}>
                      <Grid container spacing={2}>
              <Grid
             
              size={5}>
                <ChartPieSliceIcon size={65} weight="duotone" fill='white'/>
              </Grid>
              <Grid
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column"
              }}
              size={7}>
                 <Badge  
              onMouseEnter={() => setLastLngMrktVShow(true)}
              onMouseOut={() => setLastLngMrktVShow(false)}
              pill 
              bg={tradingDetails?.long_market_value >= tradingDetails?.last_long_market_value ? "success" : "danger"}> ${tradingDetails?.long_market_value}</Badge>
                  <Badge pill bg='' className={style.positionsBadge} onClick={() => navigate("/portfolio")}>
                      See Portfolio <ArrowRightIcon size={20} />
                  </Badge>
              </Grid>
              {/* <Grid size={12}>
                <Divider textAlign='center' >
                      All Orders
                </Divider>
              </Grid> */}
              <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              size={12}>
                  <Chip 
                sx={{
                  color: 'whitesmoke',
                  fontSize: "1.2vw",
                  padding: "0.8vw",
                }}
                color=''
                avatar={<Avatar>{allpositionCount? <> {Number(allpositionCount).toLocaleString()}</> : <CircularProgress size={22} color='light' />}</Avatar>}
                className={style.walletChip} 
                // label={allOrdersCount? <> {Number(allOrdersCount).toLocaleString()}&nbsp;Orders</> : <CircularProgress size={22} color='light' /> }
                label="Positions"
                />
              </Grid>
                
                
            </Grid>
          </div>


      
          
          {/* <TradingViewTechAnalysis symbol="AAPL" /> */}
        
   </div>
  )
}

export default Dashboard
