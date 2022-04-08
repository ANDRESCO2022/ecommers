import React from 'react';
import '../styles/Loading.css'

const LoadingScreen = () => {
    return (
      <div className="loading__screen">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
};

export default LoadingScreen;