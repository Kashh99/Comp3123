import React from 'react';
import './App.css';
import InfoCard from './components/InfoCard';

function App() {
  const studentInfo = {
    title: "Welcome to Fullstack Development - I",
    subtitle: "React JS Programming Week09 Lab exercise",
    studentId: "101413749",
    name: "Kashyap Mavani",
    college: "George Brown College, Toronto",
  };

  return (
    <div className="App">
      <InfoCard info={studentInfo} />
    </div>
  );
}

export default App;
