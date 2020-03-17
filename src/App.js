import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Sidebar from './components/common/Sidebar'
import Navbar from '../src/components/common/Navbar'
import Carditem from '../src/components/common/Carditem'
import Approvebutton from './components/common/butttons/Approvebutton'
import Denybutton from '../src/components/common/butttons/Denybutton'
function App() {
  return (
    <div>
      {/* <Navbar/>
      <Sidebar/> */}
    {/* <Carditem/> */}
    <Approvebutton/>
    <Denybutton/>
    </div>
  );
}

export default App;
