import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';

import BasicAlerts from './modules/alert';
import NavBar from './modules/nav';
import DropDown from './modules/dropdown';

ReactDOM.createRoot(document.querySelector("#devalert")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BasicAlerts />
    </StyledEngineProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.querySelector("#navbar")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <NavBar />
    </StyledEngineProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.querySelector("#dropdown")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <DropDown />
    </StyledEngineProvider>
  </React.StrictMode>
);