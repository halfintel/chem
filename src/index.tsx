import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  HashRouter,
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
      <HashRouter>
        <Routes>
          <Route path='/' element={<Grid />} />
        </Routes>
      </HashRouter>
      <Modal />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
