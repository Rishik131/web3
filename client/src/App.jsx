import { useState } from 'react';
import "./dist/output.css";
import Navbar from "./components/Navbar/Navbar";
import Welcome from './components/Welcome/Welcome';
import Transactions from './components/Transactions/Transactions';
import Services from './components/Services/Services';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>
  )
}

export default App;
