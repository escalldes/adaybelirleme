import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Not_found_page from './pages/Not_found_page';
import Header from './Components/Header';
import LogIn from './pages/LogIn';
import Applicant_login from './pages/applicant_login';
import ApplicantFirstLogin from './pages/ApplicantFirstLogin';
import JuryMenu from './pages/Jury_Menu';
import Deneme from './pages/Deneme';
import Applicant_home from './pages/Applicant_home';
import Admin_login from './pages/Admin_login';
import Admin_home from './pages/Admin_home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Not_found_page />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/applicant_login' element={<Applicant_login />} />
        <Route path='/applicant_first_login' element={<ApplicantFirstLogin />} />
        <Route path='/Jury_Menu' element={<JuryMenu />} />
        <Route path='/Deneme' element={<Deneme />} />
        <Route path='/Applicant_home' element={<Applicant_home />} />
        <Route path='/Admin_login' element={<Admin_login />} />
        <Route path='/Admin_home' element={<Admin_home />} />
      </Routes>
    </div>
  );
}

export default App;
