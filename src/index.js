import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Odontologos from './Odontologos';
import Pacientes from './Pacientes'
import Inicio from './Inicio'

ReactDOM.render(
  <React.StrictMode>
    {/* <Odontologos />
    <Pacientes></Pacientes> */}
    <Inicio/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

