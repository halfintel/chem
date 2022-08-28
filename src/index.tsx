import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate ,
} from "react-router-dom";
import Grid from "./modules/grid/Grid";
import Modal from "./modules/modal/Modal";





const container = document.getElementById('root')!;
const root = createRoot(container);
window.store = store;


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="grid" element={<Grid />} />
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
      </BrowserRouter>
      <Modal />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
