import React from 'react';
import './InfoCard.css';
import logo from './logo.svg'; // Save the React logo as `react-logo.png` in the `src/components` folder or public folder.

function InfoCard({ info }) {
  return (
    <div className="info-card">
      <img src={logo} alt="React Logo" className="logo" />
      
      <h1>{info.title}</h1>
      <h2>{info.subtitle}</h2>
      <h1>{info.studentId}</h1>
      <h3>{info.name}</h3>
      <p>{info.college}</p>
    </div>
  );
}

export default InfoCard;
