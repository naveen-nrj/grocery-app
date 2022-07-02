import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// State Management Components
import { StateProvider } from "core-application/services/utils/context/context";
import { initialState, RootReducer } from "root-reducer";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={RootReducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);


