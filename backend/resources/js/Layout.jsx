// src/Layouts/AppLayout.jsx

import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Container, CssBaseline } from '@mui/material';

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Container maxWidth="xl" style={{ marginLeft: '100px', padding: '20px' }}>
        <Header />
        <div className="page-content">{children}</div>
      </Container>
    </div>
  );
};

export default AppLayout;