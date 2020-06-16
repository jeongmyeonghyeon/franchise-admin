import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import App from "components/App";
import { StoreProvider } from "context/store";

const Root = () => {
  return (
    <Router>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  )
}

export default Root