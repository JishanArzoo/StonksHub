// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewSingleTicker(props) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${props.symbol}",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "en",
          "width": "100%",
          "largeChartUrl" : "http://localhost:5173/trade"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
     
    </div>
  );
}

export default memo(TradingViewSingleTicker);
