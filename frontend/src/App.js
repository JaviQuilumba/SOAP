import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Inicio from "./Views/Inicio";
import SoapXML from "./Views/SOAP/SoapXML";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/button3" element={<SoapXML />} />
            </Routes>
        </Router>
    );
}

export default App;

