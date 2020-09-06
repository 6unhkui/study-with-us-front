import React from 'react';
import { Carousel } from 'antd';


export default function Banner() {
    const contentStyle = {
        height: '22rem',
        color: '#fff',
        lineHeight: '22rem',
        textAlign: 'center',
        background: '#7D4CDB',
      };

    return (
 <Carousel effect="fade">
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
    );
}