import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Sidebar from './components/common/Sidebar'
import Navbar from '../src/components/common/Navbar'
import Carditem from '../src/components/common/Carditem'
function App() {
  return (
    <div>
    <Navbar/>
    <Sidebar/>
    <Carditem/>
    </div>
  );
}

export default App;
