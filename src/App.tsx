import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import FuncApi from './REST_Api/FuncApi';

function App() {
  return (
    <Box sx={{m:2}}>
      <FuncApi />
    </Box>
  );
}

export default App;
