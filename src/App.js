import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import ManageState from './ManageState';
import ManageDistrict from './ManageDistrict';
import ManageCountry from './ManageCountry';
import Navbar from './component/Navbar';
import Home from './Home';
import ManageEmployees from './ManageEmployees';


function App() {
  return (
    <BrowserRouter basename='/S-Soluution/'>
    <Navbar/>      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/state" element={<ManageState />} />
        <Route path="/district" element={<ManageDistrict />} />
        <Route path="/country" element={<ManageCountry />} />
        <Route path="/employee" element={<ManageEmployees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
