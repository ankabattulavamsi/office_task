import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import Api from './REST_Api/Api';

function App() {
  return (
    <Box sx={{m:2}}>
      <Api />
    </Box>
  );
}

export default App;
