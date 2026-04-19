import React from 'react'
import style from "./OrderCard.module.css"
import { Card } from 'react-bootstrap'
import TradingViewSingleTicker from '../TradingViewWidgets/TradingViewSingleTicker'
import Orders from '../../pages/Orders/Orders'
import { Chip } from '@mui/material'
import { InfoIcon } from '@phosphor-icons/react'

const OrderCard = (props) => {
    const {order} = props
  return (
    <div className={style.card}>
      
        <TradingViewSingleTicker symbol={order.symbol} />
        <Chip
        sx={{
            padding: "1.5vw 1.5vw 1.5vw 1.5vw",
            fontSize: "0.92vw",
            color: 'whitesmoke',
            borderRadius: "200px"
        }}
        label={
              <div className={style.cardContent}>
        <div className={style.cardContentItems} >
            Date:
            <span style={{fontSize: "smaller"}}>
            {new Date(order?.created_at).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
            </span>
            
        </div>
        <div className={style.cardContentItems}>
            Quantity: {order.qty}
        </div>
        <div className={style.cardContentItems}>
            Type: {order.side}
        </div>
        <div className={style.cardContentItems} >
            Status: <span style={{color: order.status == "filled" ? "lightgreen" : "yellow", fontSize: "0.9vw"}}>{order.status}</span>
        </div>
      </div>
        }
        icon={<InfoIcon size={20} weight="light" fill='white' />}
        />
    
     
    </div>
  )
}

export default OrderCard
