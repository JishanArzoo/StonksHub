// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import style from "./TV.module.css";

function TradingViewWidget(props) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${props.symbol}",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "en",
          "width": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className={`tradingview-widget-container ${style.smbInfoWidgetContainer}`} ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      
    </div>
  );
}

export default memo(TradingViewWidget);
