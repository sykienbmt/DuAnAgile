import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './components/Css/App.css'
import './components/Css/Form.css'
import Navbar from './components/Home/Navbar'
import Footer from './components/Home/Footer'
import Url from './components/Router/Url'


function app() {
    return (
        <Router>
            <Navbar />
            <Url />
            <Footer />
        </Router>
    );
}

export default app;