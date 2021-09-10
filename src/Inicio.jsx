import React, { Fragment } from "react";
//import styles from './Inicio.sass'
import "./inicio.css"
import {BrowserRouter, Route, Switch, Link  } from "react-router-dom";
import Odontologos from "./Odontologos";
import Pacientes from "./Pacientes";

const Index = () => {
    return (
        <BrowserRouter>
            <div className="container">

                <button className="botonOdontologos">
                    <Link to="/odontologos">
                        Odontologos
                    </Link>
                </button>
                <button className="botonPacientes">
                    <Link to="/pacientes">
                        Pacientes
                    </Link></button>
            </div>
            <Switch>
                <Route path="/odontologos"><Odontologos /></Route>
                <Route path="/pacientes"><Pacientes /></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Index;