import React from "react";

const Apps = () => {
  return (
    <div className="apps-container">
      <h3 className="title">Explore Apps</h3>
      <div className="app-grid">
        <div className="app-card">
          <div className="app-icon" style={{background: '#ffe2e2', color: '#ff5722'}}>V</div>
          <h4>Varsity</h4>
          <p>Learn everything about trading and investment.</p>
          <button className="btn btn-blue">Open</button>
        </div>
        
        <div className="app-card">
          <div className="app-icon" style={{background: '#e0f2f1', color: '#009688'}}>C</div>
          <h4>Coin</h4>
          <p>Buy direct mutual funds for free.</p>
          <button className="btn btn-blue">Open</button>
        </div>
        
        <div className="app-card">
          <div className="app-icon" style={{background: '#e3f2fd', color: '#2196f3'}}>S</div>
          <h4>Sentinel</h4>
          <p>Create powerful market alerts on the cloud.</p>
          <button className="btn btn-blue">Open</button>
        </div>
        
        <div className="app-card">
          <div className="app-icon" style={{background: '#f3e5f5', color: '#9c27b0'}}>K</div>
          <h4>Kite Connect</h4>
          <p>Build powerful trading platforms with our HTTP/JSON APIs.</p>
          <button className="btn btn-blue">Open</button>
        </div>

        <div className="app-card">
          <div className="app-icon" style={{background: '#e8f5e9', color: '#4caf50'}}>St</div>
          <h4>Streak</h4>
          <p>Algo trading without coding.</p>
          <button className="btn btn-blue">Open</button>
        </div>

        <div className="app-card">
          <div className="app-icon" style={{background: '#fff3e0', color: '#ff9800'}}>Sm</div>
          <h4>Smallcase</h4>
          <p>Thematic investment baskets.</p>
          <button className="btn btn-blue">Open</button>
        </div>
      </div>
    </div>
  );
};

export default Apps;
