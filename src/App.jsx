import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
