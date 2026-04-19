// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewTechAnalysis(props) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "colorTheme": "dark",
          "displayMode": "single",
          "isTransparent": true,
          "locale": "en",
          "interval": "1m",
          "disableInterval": false,
          "width": "100%",
          "height": "100%",
          "symbol": "${props.symbol}",
          "showIntervalTabs": true
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/technicals/" rel="noopener nofollow" target="_blank"><span className="blue-text">AAPL stock analysis</span></a><span className="trademark"> by TradingView</span></div> */}
    </div>
  );
}

export default TradingViewTechAnalysis;
