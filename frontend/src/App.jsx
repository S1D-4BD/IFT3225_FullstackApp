import { useState,useEffect } from 'react';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import { Landing } from './pages/Landing';
import {Login} from './pages/Login';
import {SignIn} from './pages/SignIn';
import {Home} from './pages/Home';
import {UserEdit} from './pages/UserEdit';
import {ErrorPage} from './pages/ErrorPage';
import {CreateUser} from './pages/CreateUser';


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
          {/* LIBRE ACCESS */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          {/* IF LOGGED IN*/}
          <Route path="/home" element={<Home />} />
          <Route path="/edit/:id" element={<UserEdit />} />
          <Route path="/create" element={<CreateUser />} />
          {/* IF BAD ANYWAYS */}
          <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}



export default App
