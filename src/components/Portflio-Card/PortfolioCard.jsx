import React, {useState} from 'react'
import style from "./PortfolioCard.module.css"
import TradingViewSingleTicker from '../TradingViewWidgets/TradingViewSingleTicker';
import { InfoIcon } from '@phosphor-icons/react';
import { Chip } from '@mui/material';

const PortfolioCard = (props) => {
    const {position} = props;
  return (
    <div className={style.card}>
          
            <TradingViewSingleTicker symbol={position.symbol} />
            <Chip
            sx={{
                padding: "1.5vw 2vw 1.5vw 2vw",
                fontSize: "0.9vw",
                color: 'whitesmoke',
                borderRadius: "200px",
             
            }}
            label={
                  <div className={style.cardContent}>
            <div className={style.cardContentItems}>
               P & L: <span style={{color: Number(position.unrealized_pl) > 0 ? "lightseagreen" :  "red"}}>
                ${Number(position.unrealized_pl).toLocaleString("en-IN", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                    })}
                </span>
            </div>
            <div className={style.cardContentItems}>
                Quantity: {position.qty}
            </div>
            <div className={style.cardContentItems}>
                Type: {position.side}
            </div>
            <div className={style.cardContentItems} >
                Worth: <span style={{fontSize: "0.75vw", fontWeight: "bolder"}}> ${Number(position.market_value).toLocaleString("en-IN", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                    })}</span>
            </div>
          </div>
            }
            icon={<InfoIcon size={20} weight="light" fill='white' />}
            />
        
         
        </div>
    
  )
}

export default PortfolioCard
