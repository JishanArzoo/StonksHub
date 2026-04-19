// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import style from "./TV.module.css"

function TradingViewCompanyProfile(props) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${props.symbol}",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "en",
          "width": "100%",
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className={`tradingview-widget-container ${style.compInfoWidgetContainer}`} ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"></a></div> */}
    </div>
  );
}

export default memo(TradingViewCompanyProfile);
