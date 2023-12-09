import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Setting from './Pages/Setting';

const App = () => {
return(
    <Router>
        <Routes>
            <Route path="/" element={<Home />} /><Route/>
            <Route path="/profile" element={<Profile />} /><Route/>
            <Route path="/setting" element={<Setting />} /><Route/>
        </Routes>
    </Router>
    )
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);